#!/usr/bin/env python3
"""Build the Beyond the Bell page.

`src/page.html` is the page itself and carries no head and no site chrome.
`src/chrome.html` is the gemseducationindia.com header and footer, rebuilt
self-contained. This script joins them.

Two targets, from one source, so what is reviewed is what ships:

  python3 build.py            index.html, the preview. Identical to production
                              except that it is tagged noindex, because a second
                              copy of a GEMS page must never compete with the
                              real one in search.

  python3 build.py --live     dist/, the production build for the Cloudflare
                              Worker that serves gemseducationindia.com/beyond-the-bell.
                              Indexable, canonical set, no preview wrapper.
"""

import io
import pathlib
import re
import shutil
import sys

ROOT = pathlib.Path(__file__).parent
PREVIEW = "https://asifmulani1.github.io/gems-beyond-the-bell"
LIVE = "https://gemseducationindia.com/beyond-the-bell"

FAVICON = (
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'"
    "%3E%3Crect width='24' height='24' rx='5' fill='%23102c53'/%3E%3Cpath d='M12 5a5 5 0"
    " 0 1 5 5c0 3.4 1.2 4.7 2 5.5H5c.8-.8 2-2.1 2-5.5a5 5 0 0 1 5-5Z' fill='none'"
    " stroke='%23fcd727' stroke-width='1.6' stroke-linejoin='round'/%3E%3Cpath d='M10.3"
    " 18a1.8 1.8 0 0 0 3.4 0' fill='none' stroke='%23fcd727' stroke-width='1.6'"
    " stroke-linecap='round'/%3E%3C/svg%3E"
)


def head(site: str, indexable: bool) -> str:
    robots = (
        '<meta name="robots" content="index, follow">'
        if indexable
        else "<!-- A review copy. GEMS is running an SEO programme on this content;\n"
        "     a second copy of the page must not compete with the real one. -->\n"
        '<meta name="robots" content="noindex, nofollow">'
    )
    return f"""<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
{robots}
<link rel="canonical" href="{site}/">
<meta name="description" content="GEMS Beyond the Bell is the GEMS after-school programme: sports, performing arts, creativity, innovation, technology, life skills and entrepreneurship, beyond the regular school day.">
<meta property="og:type" content="website">
<meta property="og:title" content="GEMS Beyond the Bell">
<meta property="og:description" content="Their hour. Their space. Their story. One programme across GEMS India, curated school by school.">
<meta property="og:image" content="{site}/img/swim-lane.jpg">
<meta property="og:url" content="{site}/">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="{FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap">
<style>
  :root {{
    color-scheme: light;
    padding-top: env(safe-area-inset-top, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }}
  body {{ margin: 0; }}
  img {{ max-width: 100%; }}
  [hidden] {{ display: none !important; }}
</style>"""


def part(chrome: str, tag: str) -> str:
    m = re.search(rf"<{tag}[\s>].*?</{tag}>", chrome, re.S)
    if not m:
        raise SystemExit(f"src/chrome.html has no <{tag}>")
    return m.group(0)


def build(live: bool) -> int:
    page = io.open(ROOT / "src" / "page.html", encoding="utf-8").read()
    chrome = io.open(ROOT / "src" / "chrome.html", encoding="utf-8").read()

    for token in ("<!--SITE_CSS-->", "<!--SITE_HEADER-->", "<!--SITE_FOOTER-->"):
        if token not in page:
            raise SystemExit(f"src/page.html is missing {token}")

    page = page.replace("<!--SITE_CSS-->", part(chrome, "style"))
    page = page.replace("<!--SITE_HEADER-->", part(chrome, "header"))
    page = page.replace("<!--SITE_FOOTER-->", part(chrome, "footer"))

    # The page's own <title> and font link belong in the head, the rest in body.
    cut = page.index("</style>", page.index("<style>\n  :root {")) + len("</style>")
    top, body = page[:cut], page[cut:]

    site = LIVE if live else PREVIEW
    doc = (
        '<!doctype html>\n<html lang="en">\n<head>\n'
        + head(site, indexable=live)
        + "\n"
        + top.strip()
        + "\n</head>\n<body>\n"
        + body.strip()
        + "\n</body>\n</html>\n"
    )

    out = ROOT / "dist" if live else ROOT
    if live:
        shutil.rmtree(out, ignore_errors=True)
        (out / "img").mkdir(parents=True)
        for f in sorted((ROOT / "img").glob("*")):
            shutil.copyfile(f, out / "img" / f.name)

    io.open(out / "index.html", "w", encoding="utf-8").write(doc)
    shutil.copyfile(ROOT / "src" / "data.js", out / "data.js")

    if "—" in doc:
        print("warning: an em dash slipped into the build")
    for leftover in re.findall(r"<!--[A-Z_]+-->", doc):
        print(f"warning: unresolved {leftover}")

    where = out.relative_to(ROOT) if live else pathlib.Path(".")
    print(f"built {where}/index.html  ({len(doc):,} bytes)  canonical {site}/")
    return 0


if __name__ == "__main__":
    sys.exit(build(live="--live" in sys.argv))
