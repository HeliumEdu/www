#!/usr/bin/env bash
# Builds src/assets/img/og-default.png from the framed-laptop screenshot.
#
#   npm run build-og-image
#
# frame-laptop.png is captured and framed by `make screenshots` in frontend
# (bin/grab-screenshots-web.py), which runs this script when the frame changes.
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

echo "Building OG card -> $OUT"

if ! command -v magick >/dev/null; then
  echo "ImageMagick not found; installing via brew ..."
  command -v brew >/dev/null || { echo "[FAIL] Homebrew not installed" >&2; exit 1; }
  brew install imagemagick
fi
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
