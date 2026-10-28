#!/usr/bin/env bash
# Visual QA: full-height screenshots of a page at several widths, split into
# readable tiles. Usage: scripts/shoot.sh <path> <name> [widths...]
# Requires a running server at $BASE (default http://localhost:3123).
set -euo pipefail
BASE=${BASE:-http://localhost:3123}
OUT=${OUT:?set OUT to an output directory}
CHROME=${CHROME:-"/c/Program Files/Google/Chrome/Application/chrome.exe"}
path=$1; name=$2; shift 2
widths=${*:-"360 768 1280 1920"}
for w in $widths; do
  "$CHROME" --headless=new --user-data-dir="$OUT/chrome-prof" --disable-gpu --hide-scrollbars \
    --virtual-time-budget=6000 --window-size="$w,${H:-14000}" --screenshot="$OUT/$name-$w.png" "$BASE$path" >/dev/null 2>&1
  python -c "
import sys
from PIL import Image, ImageChops
p=sys.argv[1]; im=Image.open(p).convert('RGB')
# trim trailing empty space below the footer
bg=Image.new('RGB', im.size, im.getpixel((im.width-1, im.height-1)))
bb=ImageChops.difference(im,bg).getbbox()
if bb: im=im.crop((0,0,im.width,bb[3]))
tile=int(im.width*1.6); n=0
for y in range(0, im.height, tile):
    t=im.crop((0,y,im.width,min(y+tile,im.height)))
    if t.width>1000: t=t.resize((1000,int(t.height*1000/t.width)))
    t.save(p.replace('.png',f'-{n}.png')); n+=1
print(p, im.size, n, 'tiles')
" "$OUT/$name-$w.png"
done
