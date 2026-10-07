#!/usr/bin/env python3
"""Wrap src/page.html into a standalone index.html for GitHub Pages.

src/page.html is the same source published to the Claude artifact, which supplies
its own <head>. Hosting it anywhere else means providing that head ourselves, so
the two stay byte-identical below the fold and only the wrapper differs.

The split assumes the source opens with <title>, a font <link> and one <style>
block, which is how the page is written. Everything after that first </style>
is body.
"""

import io
import pathlib
import shutil
import sys

ROOT = pathlib.Path(__file__).parent
SITE = "https://asifmulani1.github.io/gems-beyond-the-bell"

HEAD_EXTRA = f"""<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<!-- A client preview, not a GEMS property. Keep it out of search results so it
     cannot compete with gemseducationindia.com or be found by parents. -->
<meta name="robots" content="noindex, nofollow">
<meta name="description" content="GEMS Beyond the Bell, the after-school programme across GEMS India. Design preview.">
<meta property="og:type" content="website">
<meta property="og:title" content="GEMS Beyond the Bell">
<meta property="og:description" content="Sports, performing arts, creativity, innovation, technology, life skills and entrepreneurship, beyond the regular school day.">
<meta property="og:image" content="{SITE}/img/swim-lane.jpg">
<meta property="og:url" content="{SITE}/">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%23102c53'/%3E%3Cpath d='M12 5a5 5 0 0 1 5 5c0 3.4 1.2 4.7 2 5.5H5c.8-.8 2-2.1 2-5.5a5 5 0 0 1 5-5Z' fill='none' stroke='%23fcd727' stroke-width='1.6' stroke-linejoin='round'/%3E%3Cpath d='M10.3 18a1.8 1.8 0 0 0 3.4 0' fill='none' stroke='%23fcd727' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E">
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


def build() -> int:
    source = ROOT / "src" / "page.html"
    raw = io.open(source, encoding="utf-8").read()

    marker = "</style>"
    if marker not in raw:
        print("src/page.html has no <style> block; cannot split head from body")
        return 1

    cut = raw.index(marker) + len(marker)
    head, body = raw[:cut], raw[cut:]

    page = (
        "<!doctype html>\n<html lang=\"en\">\n<head>\n"
        + HEAD_EXTRA
        + "\n"
        + head.strip()
        + "\n</head>\n<body>\n"
        + body.strip()
        + "\n</body>\n</html>\n"
    )

    out = ROOT / "index.html"
    io.open(out, "w", encoding="utf-8").write(page)

    # The page loads its content from data.js next to index.html.
    shutil.copyfile(ROOT / "src" / "data.js", ROOT / "data.js")

    if "—" in page:
        print("warning: an em dash slipped into the build")

    print(f"wrote {out.relative_to(ROOT)} ({len(page):,} bytes)")
    return 0


if __name__ == "__main__":
    sys.exit(build())
