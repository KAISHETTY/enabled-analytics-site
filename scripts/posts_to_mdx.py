"""Convert extracted Wix blog post text into MDX files.

Usage: python -I scripts/posts_to_mdx.py <text_dir> <common_lines_file> <out_dir>
"""
import json
import os
import re
import sys

text_dir, common_file, out_dir = sys.argv[1:4]
os.makedirs(out_dir, exist_ok=True)
common = set(open(common_file, encoding="utf8").read().splitlines())

META = {
    "choosing-between-salesforce-managed-services-vs-in-house-teams": ("2022-03-07", "managed-services-vs-in-house.jpg", "Managed Services"),
    "salesforce-for-retail-drive-customer-experience-loyalty": ("2022-02-21", "salesforce-for-retail.jpg", "Industries"),
    "try-salesforce-for-customer-retention": ("2022-02-21", "customer-retention.jpg", "Customer Success"),
    "7-reasons-to-choose-salesforce-marketing-cloud": ("2022-02-21", "marketing-cloud-7-reasons.jpg", "Marketing Cloud"),
}
STOP = re.compile(r"^(H2: Related Posts|H4: Quick Links|H2: Recent Posts|P: Recent Posts|H2: Significantly accelerate)")


def esc(s):
    return s.replace("{", "\\{").replace("}", "\\}").replace("<", "&lt;")


for slug, (date, cover, cat) in META.items():
    lines = open(os.path.join(text_dir, f"post_{slug}.txt"), encoding="utf8").read().splitlines()
    title, body, started = None, [], False
    for ln in lines:
        if ln.startswith("H1:") and not started:
            title, started = ln[4:].strip(), True
            continue
        if not started:
            continue
        if STOP.match(ln):
            break
        if ln in common or ln.startswith(("IMG:", "A:")):
            continue
        tag, _, txt = ln.partition(": ")
        txt = txt.strip().replace("​", "")
        if not txt:
            continue
        if tag in ("H2", "H3"):
            body.append(f"## {esc(txt)}")
        elif tag in ("H4", "H5", "H6"):
            body.append(f"### {esc(txt)}")
        elif tag == "LI":
            body.append(f"- {esc(txt)}")
        else:
            body.append(esc(txt))
    # collapse: blank line between blocks except consecutive list items
    out = []
    for i, b in enumerate(body):
        if i and not (b.startswith("- ") and body[i - 1].startswith("- ")):
            out.append("")
        out.append(b)
    first_p = next((b for b in body if not b.startswith(("#", "-"))), "")
    excerpt = first_p if len(first_p) <= 200 else first_p[:200].rsplit(" ", 1)[0] + "…"
    fm = {
        "title": title,
        "date": date,
        "author": "Enabled Analytics",
        "category": cat,
        "cover": f"/images/blog/{cover}",
        "excerpt": excerpt,
        "source": f"https://www.enabledanalytics.com/post/{slug}",
    }
    head = "export const meta = " + json.dumps(fm, ensure_ascii=False, indent=2) + "\n\n"
    open(os.path.join(out_dir, f"{slug}.mdx"), "w", encoding="utf8").write(head + "\n".join(out) + "\n")
    print(slug, len(body), "blocks")
