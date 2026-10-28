"""Extract readable text blocks and images from downloaded Wix pages.

Usage: python -I scripts/extract.py <pages_dir> <out_dir>
Writes one <name>.txt per page with tagged lines (H1/H2/P/LI/A/IMG).
"""
import html
import os
import re
import sys

src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)

BLOCK = re.compile(
    r'<(h[1-6]|p|li|a|img|span)\b([^>]*)>(.*?)(?=</\1>|<(?:h[1-6]|p|li)\b)|<img\b([^>]*)>',
    re.S | re.I,
)


def clean(s):
    s = re.sub(r"<[^>]+>", " ", s)
    return " ".join(html.unescape(s).split())


for name in sorted(os.listdir(src)):
    if not name.endswith(".html"):
        continue
    t = open(os.path.join(src, name), encoding="utf8", errors="ignore").read()
    t = re.sub(r"<(script|style|svg|noscript)\b[^>]*>.*?</\1>", "", t, flags=re.S | re.I)
    m = re.search(r"<main\b.*", t, flags=re.S | re.I)
    body = t[t.find("<body") :] if "<body" in t else t
    lines, seen = [], set()
    for tag, attrs, inner in re.findall(r"<(h[1-6]|p|li|a)\b([^>]*)>(.*?)</\1>", body, flags=re.S | re.I):
        txt = clean(inner)
        if not txt:
            continue
        extra = ""
        if tag.lower() == "a":
            h = re.search(r'href="([^"]+)"', attrs)
            extra = f"  -> {h.group(1)}" if h else ""
        key = (tag.lower(), txt, extra)
        if key in seen:
            continue
        seen.add(key)
        lines.append(f"{tag.upper()}: {txt}{extra}")
    for attrs in re.findall(r"<img\b([^>]*)>", body, flags=re.I):
        s = re.search(r'src="([^"]+)"', attrs)
        a = re.search(r'alt="([^"]*)"', attrs)
        if s:
            lines.append(f"IMG: {s.group(1)} | alt={a.group(1) if a else ''}")
    open(os.path.join(out, name[:-5] + ".txt"), "w", encoding="utf8").write("\n".join(lines))
    print(name, len(lines))
