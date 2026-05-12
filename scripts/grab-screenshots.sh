#!/usr/bin/env bash
# Walks through every Helium marketing screenshot, captures it directly from
# the running iOS Simulator or Android Emulator, frames it with fastlane
# frameit, and drops the framed PNG into
#   ~/Developer/helium/projects/www/public/img/screenshots/framed/
#
# Run one device group at a time (boot/launch only the relevant sim/emulator),
# then sign in to Helium and navigate. The script prompts at every step.
#
# Requires:
#   - xcrun simctl (Xcode CLT)   for iOS capture
#   - adb (Android Platform Tools) for Android capture
#   - fastlane frameit            for device framing

set -uo pipefail

REPO="$HOME/Developer/helium/projects/www"
DEST="$REPO/public/img/screenshots/framed"
WORKDIR=$(mktemp -d)

mkdir -p "$DEST"
trap 'rm -rf "$WORKDIR"' EXIT

# ─── shot lists per device ───────────────────────────────────────────────
PHONE_SHOTS=(month-view grades todos edit-assignment agenda edit-note notebook create-account)
TABLET_SHOTS=(month-view grades todos edit-note notebook week-view classes)

# ─── capture helpers ─────────────────────────────────────────────────────
capture_ios() {
  local out="$1"
  if ! command -v xcrun >/dev/null; then
    echo "  ✗ xcrun not found; install Xcode Command Line Tools." >&2
    return 1
  fi
  if ! xcrun simctl list devices booted | grep -q "Booted"; then
    echo "  ✗ No iOS Simulator booted." >&2
    return 1
  fi
  xcrun simctl io booted screenshot "$out" >/dev/null 2>&1
}

capture_android() {
  local out="$1"
  if ! command -v adb >/dev/null; then
    echo "  ✗ adb not found; install Android Platform Tools." >&2
    return 1
  fi
  local devices
  devices=$(adb devices | tail -n +2 | awk '$2=="device"{print $1}')
  if [[ -z "$devices" ]]; then
    echo "  ✗ No Android emulator/device connected." >&2
    return 1
  fi
  local count
  count=$(echo "$devices" | wc -l | tr -d ' ')
  if [[ "$count" -gt 1 ]]; then
    echo "  ✗ Multiple Android devices connected; only run one emulator." >&2
    return 1
  fi
  adb exec-out screencap -p > "$out"
}

# ─── framing ─────────────────────────────────────────────────────────────
# frameit operates on every .png in cwd, producing <name>_framed.png.
frame_and_move() {
  local raw="$1"     # raw png in $WORKDIR
  local slug="$2"    # e.g. month-view_iphone
  local framed="${slug}_framed.png"

  (
    cd "$WORKDIR"
    fastlane frameit >/tmp/frameit.log 2>&1
  ) || true

  if [[ -f "$WORKDIR/$framed" ]]; then
    mv "$WORKDIR/$framed" "$DEST/$framed"
    rm -f "$raw"
    echo "  ✓ $DEST/$framed"
  else
    mv "$raw" "$DEST/${slug}.png"
    echo "  ⚠ no frame for these dimensions; saved raw → $DEST/${slug}.png"
  fi
}

# ─── per-screenshot loop ─────────────────────────────────────────────────
prompt_and_capture() {
  local capture_fn="$1"
  local device_slug="$2"
  local shot="$3"

  local slug="${shot}_${device_slug}"
  local raw="$WORKDIR/${slug}.png"

  echo ""
  read -r -p "  → Navigate to '${shot}'. Press Enter to capture, 's' to skip, 'q' to quit: " reply
  case "$reply" in
    q|Q) echo "Quitting."; exit 0 ;;
    s|S) echo "  ↷ skipped"; return 0 ;;
  esac

  if ! $capture_fn "$raw"; then
    echo "  Capture failed; skipping $slug"
    return 0
  fi
  echo "  📸 captured $(basename "$raw")"
  frame_and_move "$raw" "$slug" || true
}

run_device() {
  local label="$1"
  local slug="$2"
  local capture_fn="$3"
  shift 3
  local shots=("$@")

  echo ""
  echo "════════════════════════════════════════════════════════════"
  echo "  $label  (${#shots[@]} screenshots)"
  echo "════════════════════════════════════════════════════════════"
  read -r -p "Boot the $label sim/emulator, launch Helium, sign in, then press Enter (or 'skip' to skip this device): " reply
  if [[ "$reply" == "skip" ]]; then
    echo "Skipping $label."
    return 0
  fi

  for shot in "${shots[@]}"; do
    prompt_and_capture "$capture_fn" "$slug" "$shot"
  done
}

# ─── go ──────────────────────────────────────────────────────────────────
echo "Target: $DEST"
echo "Workdir: $WORKDIR (cleaned on exit)"

run_device "iPhone 15 Pro"       "iphone"        capture_ios     "${PHONE_SHOTS[@]}"
run_device "iPad Air 13\" M4"    "ipad"          capture_ios     "${TABLET_SHOTS[@]}"
run_device "Pixel 5"             "pixel-phone"   capture_android "${PHONE_SHOTS[@]}"

echo ""
echo "════════════════════════════════════════════════════════════"
echo "Capture done. Files in $DEST:"
ls -1 "$DEST/" 2>/dev/null || echo "  (none yet)"

echo ""
echo "════════════════════════════════════════════════════════════"
echo "Scaling iPhone and iPad shots to App Store dimensions..."
echo "════════════════════════════════════════════════════════════"
"$(dirname "${BASH_SOURCE[0]}")/scale-for-appstore.sh"
