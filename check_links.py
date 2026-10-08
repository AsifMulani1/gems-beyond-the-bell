#!/usr/bin/env python3
"""Walk every link on the built page against the live site.

The nav and footer point at routes this project does not own, so a rename or a
guess on the other side goes unnoticed until someone clicks it. Deploying a
header with a dead link in it is how /we-are-gems reached production.

    python3 build.py --live && python3 check_links.py
"""

import io
import pathlib
import re
import sys
import urllib.error
import urllib.request

SITE = "https://gemseducationindia.com"
PAGE = pathlib.Path(__file__).parent / "dist" / "beyond-the-bell" / "index.html"


def status(url: str) -> int:
    req = urllib.request.Request(url, method="GET", headers={"User-Agent": "link-check"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception:
        return 0


def main() -> int:
    if not PAGE.exists():
        print("no build found; run python3 build.py --live first")
        return 1

    html = io.open(PAGE, encoding="utf-8").read()
    links = sorted(set(re.findall(r'href="(/[^"#?]*)"', html)))
    bad = []

    for path in links:
        code = status(SITE + path)          # follows redirects, so a 301 to the
        if code != 200:                      # slash form counts as reachable
            bad.append((code, path))
        print(f"  {code}  {path}")

    print()
    if bad:
        print(f"{len(bad)} link(s) do not resolve:")
        for code, path in bad:
            print(f"  {code}  {path}")
        return 1
    print(f"all {len(links)} internal links resolve")
    return 0


if __name__ == "__main__":
    sys.exit(main())
