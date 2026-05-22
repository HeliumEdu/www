#!/usr/bin/env bash
# Composes src/assets/img/og-default.png from the framed laptop screenshot.
#
# The laptop is scaled to fill the 1200-wide OG canvas, anchored at the top,
# with the bottom bleeding off the 630px-tall canvas. This produces an
# "immersive" social card where the planner content dominates the frame
# and the platform-rendered title/description handle the branding text.
#
# Re-run after updating frame-laptop.png:
#   npm run build-og-image
#
# Requires: ImageMagick 7+  (brew install imagemagick)

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Source — the framed laptop screenshot. Replace this PNG to update the OG card.
LAPTOP="$ROOT/src/assets/img/screenshots/frames/frame-laptop.png"

# Output — Astro processes this and emits a fingerprinted /_astro/og-default.<hash>.png at build.
OUT="$ROOT/src/assets/img/og-default.png"

mkdir -p "$(dirname "$OUT")"

# OG card dimensions (Twitter/LinkedIn/Slack/iMessage all expect 1200x630).
WIDTH=1200
HEIGHT=630

# Brand blue (Helium app primary seed color, 0xff418eb9). Only visible where
# the laptop frame has transparent rounded corners.
BG_COLOR="#418eb9"

# Laptop is scaled to fill the canvas width. Top edge anchored at y=0,
# bottom bleeds off the canvas (overflow is automatically cropped by the
# canvas bounds).
LAPTOP_WIDTH=$WIDTH
LAPTOP_TOP=0

command -v convert >/dev/null || {
  echo "Error: ImageMagick not found. Install with: brew install imagemagick (macOS) or apt-get install imagemagick (Linux)" >&2
  exit 1
}
[[ -f "$LAPTOP" ]] || {
  echo "Error: laptop frame not found at $LAPTOP" >&2
  exit 1
}

# Downscale in linear-light (RGB) with Lanczos2 for sharper UI text/edges,
# then a light unsharp mask to crisp up details lost in the ~1.88x downscale.
convert -size "${WIDTH}x${HEIGHT}" "xc:${BG_COLOR}" \
  \( "$LAPTOP" -colorspace RGB -filter Lanczos2 -resize "${LAPTOP_WIDTH}x" -colorspace sRGB \
     -unsharp 0x0.5+0.6+0.01 \) \
  -gravity north -geometry "+0+${LAPTOP_TOP}" -composite \
  -depth 8 -type TrueColor -strip \
  "$OUT"

echo "Wrote $OUT (${WIDTH}x${HEIGHT})"
