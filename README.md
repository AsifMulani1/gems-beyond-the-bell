# GEMS Beyond the Bell, landing page preview

A design preview of the **Beyond the Bell** page for the central GEMS Education
India site. It is a mockup for review, not a GEMS property and not production
code.

**Live:** https://asifmulani1.github.io/gems-beyond-the-bell/

## Going live on gemseducationindia.com

The page is served as its own Cloudflare Worker on the route
`gemseducationindia.com/beyond-the-bell*`, which is the same pattern the eleven
campus sites use. Cloudflare matches the most specific route, so this wins over
the main site's `/*` and the brand site is never touched.

```sh
python3 build.py --live                              # writes dist/
npx wrangler deploy --config worker/wrangler.toml    # Gemsk12website@gmail.com
```

Then add the route in the Cloudflare dashboard, or fill in the zone and
uncomment the routes block in `worker/wrangler.toml`.

**Before it is useful**, paste the Web3Forms access key into `ENQUIRY_KEY` at the
top of `src/data.js`. It needs its **own** key for admissiondesk@gemsedu.in, not
a campus one: every campus key already in use is bound to that campus's form, so
reusing one would file Beyond the Bell enquiries from every campus under a single
campus. While the key is empty the form shows the campaign phone numbers rather
than pretending to send, which is the campus sites' own fallback.

The page carries no favicon of its own in production, so the browser falls back
to the origin's `/favicon.ico` and it shares the site's icon like every other
page. The review build keeps a bell mark so it is findable among open tabs.

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
## Held back from the page, on purpose

The page shows parents only what GEMS has confirmed. These gaps are real and
still need answering, but they are recorded here rather than printed on a page a
parent reads.

- **Two of the seven categories are missing**: Creativity & Design and
  Future-Focused Opportunities have no activity against them in any campus list.
  `liveCategories()` in `src/data.js` filters out any category with nothing in
  it, so each one reappears by itself the day a school lists something for it.
  Note this is a deliberate departure from the approved website copy, which
  describes all seven.
- **Two campuses are withheld**: GEMS Millennium Kochi and Raipur both have live
  websites and appear in no GEMS document, neither running nor coming soon. They
  sit in the `UNCONFIRMED` list in `src/data.js`, which nothing renders. A parent
  searching Raipur therefore gets the "no campus matches yet" card, which invites
  them to register interest. Move them into `SCHOOLS` with the right state as
  soon as GEMS says which group they belong in.
- **Activity names are inconsistent at source**: Soccer at Gurgaon against
  Football everywhere else, and both Basket Ball and Basketball. The finder
  papers over this with `ALIASES`; GEMS should fix it in the data.
- **Kochi reads as 6 activities here, not 8**: the Bower School of
  Entrepreneurship is one brand and is always written in full, so it is a single
  entry carrying three strands (financial literacy, entrepreneurship, artificial
  intelligence) rather than three activities with the brand name repeated. GEMS
  counted the strands separately to reach eight. It is the only activity with
  more than one category, which is what keeps Innovation & Technology on the
  page: nothing else in the network sits there.
- **Still unanswered by any document**: grades and ages, days and timings, fees,
  and the registration route and deadlines. Those are campus-page content, and
  the campus pages cannot ship without them.
- **Category assignment is a reading, not GEMS's**: the modules document gives no
  category per activity, so `cat` in `src/data.js` is an editorial call. Chess
  under Life Skills is the one most worth a second opinion.
