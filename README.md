# Xenstay Homes — xenstayhomes.com

Owner-acquisition website for XenStays LLC. Plain HTML/CSS/JS, no build step,
no framework, no dependencies. Edit the file, push, Vercel deploys in ~30 seconds.

---

## Status

Phone, email and the lead endpoint are all live. Nothing is blocking deploy.

| | |
|---|---|
| Phone | (916) 915-3332 |
| Email | Byron@realtorphilosophy.com |
| Leads | Google Apps Script → `Leads` sheet (source: `apps-script/Code.gs`) |

### How the form works

It POSTs JSON to the Apps Script web app, which appends a row to the Leads sheet.
The client maps its field names onto the sheet's columns:

| Form field | Sheet column |
|---|---|
| `name` (split on first space) | First Name / Last Name |
| `email`, `phone` | Email, Phone |
| `property` | City |
| `property_type`, `situation` | Property Type, Situation |
| `message` + calculator estimate | Notes |
| — | Source |

Whatever the visitor configured in the revenue calculator (market, bedrooms,
nights, projected gross, projected saving) is appended to **Notes**, so that
context arrives with every lead.

Apps Script web apps don't send CORS headers, so the request uses `mode:'no-cors'`
and the response is opaque — a resolved promise means the request left the browser,
not that the row was written. **Check the sheet after any change to the form.**
If the network call fails outright, the handler falls back to opening a pre-filled
email so a lead is never silently dropped.

---

## Files

| File | URL | Purpose |
|---|---|---|
| `index.html` | xenstayhomes.com | The whole site — single page, all sections |
| `img/` | — | Optimised WebP + JPEG property photos (3 widths each) |
| `robots.txt` | /robots.txt | Crawler directives |
| `sitemap.xml` | /sitemap.xml | Submit this in Google Search Console |

Removed for now (recoverable from git):

```bash
git checkout dfb977d -- book.html wifi-card.html
```

---

## Images

`img/` is **generated**, not hand-maintained. Originals live in `images_xenstay/`.

The originals are phone screenshots of the Airbnb host dashboard — they include
Airbnb's UI chrome ("● Listed" pill, listing title, rounded card corners, scrollbar).
The build script auto-detects the photo region inside each screenshot, crops the
chrome away, normalises to 4:3, and emits WebP at 480/800/1200px plus a JPEG fallback.

To regenerate after adding a photo to `images_xenstay/`:

```bash
npm i sharp && node build.mjs
```

> **Worth doing properly:** cropped screenshots are a big improvement over the raw
> ones, but they're still compressed twice and capped at ~1100px of real detail.
> Real photography — or at minimum the full-resolution originals pulled from your
> Airbnb listings — would lift the site considerably.

---

## Caching

`vercel.json` serves everything in `img/` with:

```
Cache-Control: public, max-age=31536000, immutable
```

A returning visitor re-downloads no images at all — the second page view is
essentially just the HTML.

> ### ⚠️ Replacing a photo requires a new filename
>
> `immutable` tells browsers never to revalidate for a year. These filenames are
> **not** content-hashed, so if you regenerate `skyline-800.webp` with a different
> photo, anyone who has already visited keeps seeing the **old** image for up to
> twelve months. There is no way to purge their browser cache.
>
> When you swap a photo, rename it — `skyline-2-800.webp`, or just `skyline-800-v2.webp`
> — and update the `src`/`srcset`. Adding a new property is unaffected; this only
> applies to replacing an existing file.
>
> A Vercel redeploy does *not* fix this. The cache lives in the visitor's browser.

`robots.txt` and `sitemap.xml` cache for an hour so crawler-facing changes
propagate quickly. HTML is left on Vercel's default (revalidate every request),
so content edits go live immediately.

### Not yet done

`images_xenstay/` (~3.6 MB of source screenshots) still deploys but is never
served — only `img/` is referenced. Adding it to `.vercelignore` would trim every
deploy. Left alone for now because `origin/main`'s page still references it.

---

## ⚠️ WiFi passwords — never put them in this repo

**Do not store real WiFi credentials in any file here.** Every file in this repo is served
to the public as-is. Anything in the HTML or JavaScript can be read by any visitor via
"View Source" — there is no way to hide a password in a static site. A previous version of
`book.html` had the network name and password for all 16 properties sitting in plain
JavaScript on a public page with no login in front of it.

Send WiFi details to guests through the booking platform's messaging (Airbnb/VRBO), or
write them by hand on the printed cards from `archive/wifi-card.html`.

If a self-serve lookup is worth building later, it needs a real backend that verifies the
guest has an active booking and returns only that one property's credentials.

---

## Editing the site

Everything is in `index.html`, in labelled sections:

```
NAV · HERO · TRUST STRIP · THE MATH (calculator) · WHY/OBJECTIONS
HOW IT WORKS · SERVICES · PORTFOLIO · RESULTS · MARKETS+MAP
TESTIMONIALS · FAQ · LEAD FORM · FOOTER · STRUCTURED DATA
```

The CSS at the top is a design system: tokens (colour, type scale, spacing, radii,
shadows, motion) → primitives (`.btn`, `.card`, `.badge`) → components → sections.
Change a token once and it propagates everywhere. Every colour pair is verified
to WCAG AA contrast; if you change a colour, re-check it.

### Adding a portfolio property

Copy any `<article class="pcard">` block and change the image name, city, title
and metric. Set `data-type="str"` or `data-type="ltr"` so the filter picks it up,
then update the counts in the filter buttons.

### Changing the calculator's numbers

In the `<script>`, `BED_MULT` scales by bedroom count. The per-market nightly rates
are the `value` attributes on `#c-market` options — these are **3-bedroom-equivalent
medians derived from your own portfolio ADRs**, not headline rates. If you change one,
keep it 3BR-equivalent or the bedroom multiplier will double-count.

---

## Lead capture setup (Google Sheets, free)

The "Get Free Analysis" form on `index.html` submits to a Google Apps Script Web App, which appends each lead as a row in a Google Sheet you own. No paid service involved.

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet. Name it "Xenstay Leads".
2. In the sheet, go to **Extensions → Apps Script**.
3. Delete the default code and paste in the contents of [`apps-script/Code.gs`](apps-script/Code.gs).
4. Click **Deploy → New deployment**.
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, authorize the script when prompted (it's your own script, so this is safe).
6. Copy the **Web app URL** it gives you (ends in `/exec`).
7. In `index.html`, replace the URL in the lead form's `action` attribute
   (search for `script.google.com`) with that URL.
8. Save, push to the repo, and Vercel will redeploy. Submit a test entry on the live site and confirm a row appears in the "Leads" tab of the sheet.

If you ever change the script's code, you must create a **new deployment version** (Deploy → Manage deployments → Edit → New version) for changes to take effect — just saving the script isn't enough.

---

## Analytics setup (Vercel Web Analytics, free)

`index.html` already includes the tracking script (`/_vercel/insights/script.js`). To start seeing data:

1. In the Vercel dashboard, open this project.
2. Go to the **Analytics** tab and click **Enable**.
3. Free on the Hobby plan up to 2,500 tracked events/month.

---

## Deployment

Vercel (free), auto-deploys on push. Domain on Namecheap → Vercel nameservers.

After deploying, submit `sitemap.xml` in
[Google Search Console](https://search.google.com/search-console) and validate the
structured data with the [Rich Results Test](https://search.google.com/test/rich-results).

---

## Portfolio (source of truth for site copy)

**Short-term — 16 listings.** Auburn (Skyline Serenity $432 ADR, The Nest, Hilltop),
Punta Mita MX, West Sacramento (Beautiful 4BR $281, Charming 3BR $263, Club House $186),
Sacramento (Xen House $272, Hotel Studio, 3BR Remodeled), Rancho Cordova
(Rancho Heaven $237, Relax & Unwind $192), Orangevale (Lake Natoma $191),
Yuba City, Fair Oaks, West Roseville.

**Long-term — 8 properties / 12 leases.** Roseville $4,300/mo · Sacramento $5,000/mo ·
Yuba City 2× duplex $7,750/mo · Granite Bay $3,100/mo · Orangevale $2,200/mo ·
Rocklin $3,400/mo · Folsom $3,150/mo.

**Totals:** 28 units · $341,705 annual gross STR · 4.9★ average.

| Fee | Rate |
|---|---|
| STR co-hosting | 10% of gross bookings |
| LTR management | 6% of gross rent |
| Lease signing bonus | $1,000 per new lease (paid to owner) |

---

## Contact

XenStays LLC · Sacramento, California · xenstayhomes.com
