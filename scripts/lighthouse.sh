#!/usr/bin/env bash
# Lighthouse (mobile preset) for a list of paths against a running server.
# Usage: OUT=<dir> scripts/lighthouse.sh / /contact ...
set -uo pipefail
export MSYS_NO_PATHCONV=1
BASE=${BASE:-http://localhost:3123}
OUT=${OUT:?set OUT to an output directory}
export CHROME_PATH=${CHROME_PATH:-"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"}
for p in "$@"; do
  n=$(echo "$p" | tr '/' '_')
  npx --yes lighthouse@12 "$BASE$p" --quiet --chrome-flags="--headless=new --user-data-dir=$OUT/prof" \
    --only-categories=performance,accessibility,best-practices,seo --output=json --output-path="$OUT/lh$n.json" >/dev/null 2>&1
  node -e "
const r=require(process.argv[1]); const a=r.audits
const s=Object.values(r.categories).map(c=>c.title.split(' ')[0].slice(0,4)+' '+Math.round(c.score*100)).join(' | ')
console.log(process.argv[2].padEnd(46), s, '| LCP', a['largest-contentful-paint'].displayValue, '| TBT', a['total-blocking-time'].displayValue, '| CLS', a['cumulative-layout-shift'].displayValue)
" "$OUT/lh$n.json" "$p"
done
