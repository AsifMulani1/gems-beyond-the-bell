# GEMS Beyond the Bell, landing page preview

A design preview of the **Beyond the Bell** page for the central GEMS Education
India site. It is a mockup for review, not a GEMS property and not production
code.

**Live:** https://asifmulani1.github.io/gems-beyond-the-bell/

## Running it

```sh
python3 build.py        # writes index.html from src/page.html
open index.html
```

`src/page.html` is the real source and is also what gets published to the Claude
artifact used during review. It carries no `<head>` of its own, because that
environment supplies one. `build.py` wraps it for ordinary hosting and adds the
charset, viewport, social preview tags and a `noindex` rule.

Edit `src/page.html`, run `build.py`, commit both.

## What is in it

One page, no backend, no build step beyond the wrapper. The school finder is
plain JavaScript over an array at the bottom of `src/page.html`: it shows the
three running campuses grouped at rest, and switches to a flat ranked list when
someone types a city or an activity.

## Things to know before this goes anywhere near production

- **`noindex` is deliberate.** GEMS is running an SEO programme on
  gemseducationindia.com. A preview copy of a GEMS page ranking anywhere would
  compete with the real one, so the build tags it out of search.
- **Photography is unverified.** The images come from the campus website repo.
  Some are confirmed GEMS campuses, some are not attributed. GEMS has asked that
  photos from one campus must not be used to represent another, so the set needs
  confirming before launch. The three open campus cards deliberately carry their
  activity names rather than a photo for that reason.
- **The content has known gaps**, flagged on the page itself in the amber notes:
  two of the seven categories have no activities, two campuses have no confirmed
  status, and activity names are inconsistent at source, for example Soccer at
  Gurgaon against Football everywhere else. The finder works around the last one
  with an alias list; GEMS should fix it in the data.
