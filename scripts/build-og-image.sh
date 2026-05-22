#!/usr/bin/env bash
# Builds src/assets/img/og-default.png from a framed-laptop screenshot.
#
#   npm run build-og-image                     -- interactive
#   npm run build-og-image -- <path-to-png>    -- install <path> then rebuild
#   npm run build-og-image -- --rebuild        -- rebuild from existing source
#   npm run build-og-image -- --help           -- print this header
#
# Capture: https://app.heliumedu.com  (1440x840 viewport, DPR 2)
# Frame:   https://browserframe.com   (Chrome Mac Light preset)
#
# Requires: ImageMagick 7+  (brew install imagemagick)

set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LAPTOP="$REPO/src/assets/img/screenshots/frames/frame-laptop.png"
OUT="$REPO/src/assets/img/og-default.png"

WIDTH=1200
HEIGHT=630
BG_COLOR="#418eb9"            # brand seed
LAPTOP_TOP=0
TARGET_ASPECT=1.54
ASPECT_TOLERANCE=0.05

# Default filenames in ~/Downloads. Chrome's DevTools "Capture screenshot"
# writes the raw capture as <hostname>_.png; browserframe.com writes the
# wrapped output as frame_chrome_mac_light.png. The script consumes the
# wrapped one.
DEFAULT_RAW_CAPTURE="$HOME/Downloads/app.heliumedu.com_.png"
DEFAULT_WRAPPED_FRAME="$HOME/Downloads/frame_chrome_mac_light.png"

print_help() {
  sed -n '2,/^$/p' "$0" | sed 's/^# \{0,1\}//'
}

print_workflow() {
  cat <<'EOF'

============================================================
  Recapture frame-laptop.png
============================================================

  Capture:  https://app.heliumedu.com  (Planner, Month view)
            Viewport 1440 x 840, DPR 2
  Frame:    https://browserframe.com   (Chrome Mac Light)
  Save:     ~/Downloads/

  Target wrapped aspect: ~1.54 (StackedHero balance). Viewport width
  controls content density; height tunes aspect. Treat the first
  re-capture as calibration and iterate if the wrapped aspect drifts.

EOF
}

# Compute aspect ratio of an image, warn if outside tolerance.
check_aspect() {
  local file=$1
  local w h aspect
  w=$(magick identify -format "%w" "$file")
  h=$(magick identify -format "%h" "$file")
  aspect=$(awk "BEGIN { printf \"%.3f\", $w / $h }")
  echo "  size:   ${w}x${h}"
  echo "  aspect: $aspect  (target ~${TARGET_ASPECT})"

  local drift
  drift=$(awk "BEGIN { d = $aspect - $TARGET_ASPECT; if (d < 0) d = -d; printf \"%.3f\", d }")
  local over_tol
  over_tol=$(awk "BEGIN { print ($drift > $ASPECT_TOLERANCE) ? 1 : 0 }")
  if [[ "$over_tol" == "1" ]]; then
    echo "  [WARN] aspect drift $drift exceeds +/-${ASPECT_TOLERANCE}."
    echo "         StackedHero may need w-[64%] retuning, or recapture at a"
    echo "         different viewport height to nudge the aspect closer."
    if [[ -t 0 ]]; then
      read -r -p "  Continue anyway? [y/N] " ans
      [[ "$ans" =~ ^[Yy]$ ]] || { echo "  Aborted."; exit 1; }
    fi
  fi
}

install_source() {
  local src=$1
  # Expand leading ~ to $HOME.
  src="${src/#\~/$HOME}"
  [[ -f "$src" ]] || { echo "[FAIL] $src not found" >&2; exit 1; }
  echo ""
  echo "Inspecting $src ..."
  check_aspect "$src"
  cp -f "$src" "$LAPTOP"
  echo "  [OK] installed -> $LAPTOP"
}

prompt_for_source() {
  print_workflow

  local raw_status frame_status
  [[ -f "$DEFAULT_RAW_CAPTURE" ]] && raw_status="[+]" || raw_status="[-]"
  [[ -f "$DEFAULT_WRAPPED_FRAME" ]] && frame_status="[+]" || frame_status="[-]"

  echo "  Defaults in ~/Downloads:"
  echo "    $raw_status   $(basename "$DEFAULT_RAW_CAPTURE")     (raw Chrome capture)"
  echo "    $frame_status   $(basename "$DEFAULT_WRAPPED_FRAME")  (browserframe.com output)"
  echo ""
  echo "  [y] install ~/Downloads/$(basename "$DEFAULT_WRAPPED_FRAME") and rebuild"
  echo "  [n] enter a custom path"
  echo "  [s] skip; rebuild from existing $LAPTOP"
  read -r -p "  Choice [y/n/s]: " choice

  case "$choice" in
    y|Y|yes|Yes)
      install_source "$DEFAULT_WRAPPED_FRAME"
      ;;
    n|N|no|No)
      read -r -p "  Path to framed laptop PNG: " NEW_FRAME
      install_source "$NEW_FRAME"
      ;;
    s|S|skip|Skip|'')
      echo "  (skipping; will rebuild from existing source)"
      ;;
    *)
      echo "  [FAIL] invalid choice; aborting" >&2
      exit 1
      ;;
  esac
}

build_og_card() {
  echo ""
  echo "============================================================"
  echo "  Building OG card -> $OUT"
  echo "============================================================"

  command -v magick >/dev/null || {
    echo "[FAIL] ImageMagick not found. Install with: brew install imagemagick" >&2
    exit 1
  }
  [[ -f "$LAPTOP" ]] || { echo "[FAIL] $LAPTOP not found" >&2; exit 1; }

  mkdir -p "$(dirname "$OUT")"

  # Downscale in linear-light (RGB) with Lanczos2 for sharper UI text/edges,
  # then a light unsharp mask to crisp up details lost in the downscale.
  magick -size "${WIDTH}x${HEIGHT}" "xc:${BG_COLOR}" \
    \( "$LAPTOP" -colorspace RGB -filter Lanczos2 -resize "${WIDTH}x" -colorspace sRGB \
       -unsharp 0x0.5+0.6+0.01 \) \
    -gravity north -geometry "+0+${LAPTOP_TOP}" -composite \
    -depth 8 -type TrueColor -strip \
    "$OUT"

  echo "  [OK] wrote $OUT (${WIDTH}x${HEIGHT})"
}

# Mode dispatch
case "${1:-}" in
  --help|-h)
    print_help
    exit 0
    ;;
  --rebuild)
    : # fall through to build only
    ;;
  '')
    if [[ -t 0 ]]; then
      prompt_for_source
    fi
    ;;
  *)
    install_source "$1"
    ;;
esac

build_og_card
