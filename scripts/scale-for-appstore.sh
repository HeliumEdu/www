#!/usr/bin/env bash
# Letterbox-pads framed device screenshots to App Store Connect's
# accepted dimensions, preserving the device-frame proportions.
#
# Override background color (e.g. brand blue):
#   BG_COLOR='#418eb9' ./scripts/scale-for-appstore.sh
#
# Sources:
#   public/img/screenshots/framed/*_iphone_framed.png
#   public/img/screenshots/framed/*_ipad_framed.png
#
# Outputs:
#   /tmp/appstore/iphone/   1320 × 2868  (6.9" display class)
#   /tmp/appstore/ipad/     2064 × 2752  (13" iPad)
#
# Requires: ImageMagick 7+ (magick) or ImageMagick 6 (convert).

set -uo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$REPO/public/img/screenshots/framed"
OUT_IPHONE="/tmp/appstore/iphone"
OUT_IPAD="/tmp/appstore/ipad"
BG_COLOR="${BG_COLOR:-white}"

mkdir -p "$OUT_IPHONE" "$OUT_IPAD"

if command -v magick >/dev/null; then
  IM=(magick)
elif command -v convert >/dev/null; then
  IM=(convert)
else
  echo "Error: ImageMagick not found. brew install imagemagick" >&2
  exit 1
fi

letterbox() {
  local in="$1" out="$2" w="$3" h="$4"
  "${IM[@]}" "$in" \
    -resize "${w}x${h}" \
    -gravity center \
    -background "$BG_COLOR" \
    -extent "${w}x${h}" \
    "$out"
}

echo "Background: $BG_COLOR"
echo ""
echo "iPhone → 1320 × 2868 (App Store 6.9\")"
count=0
for f in "$SRC"/*_iphone_framed.png; do
  [[ -f "$f" ]] || continue
  out="$OUT_IPHONE/$(basename "$f")"
  letterbox "$f" "$out" 1320 2868
  echo "  ✓ $(basename "$out")"
  ((count++))
done
echo "  ($count files)"

echo ""
echo "iPad → 2064 × 2752 (App Store 13\")"
count=0
for f in "$SRC"/*_ipad_framed.png; do
  [[ -f "$f" ]] || continue
  out="$OUT_IPAD/$(basename "$f")"
  letterbox "$f" "$out" 2064 2752
  echo "  ✓ $(basename "$out")"
  ((count++))
done
echo "  ($count files)"

echo ""
echo "Done."
echo "  iPhone: $OUT_IPHONE"
echo "  iPad:   $OUT_IPAD"
