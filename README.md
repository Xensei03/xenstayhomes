# Xenstay Homes — xenstayhomes.com

Property management and direct booking website for XenStays LLC.

---

## Files in this repo

| File | URL | Purpose |
|---|---|---|
| `index.html` | xenstayhomes.com | Main owner-acquisition website |
| `book.html` | xenstayhomes.com/book | Guest direct booking + WiFi password lookup |
| `wifi-card.html` | xenstayhomes.com/wifi-card | Printable in-unit WiFi cards |

---

## How to update the site

### ⚠️ WiFi passwords — never put them in this repo

**Do not store real WiFi credentials in any file here.** Every file in this repo is served
to the public as-is. Anything in the HTML or JavaScript can be read by any visitor via
"View Source" — there is no way to hide a password in a static site. A previous version of
`book.html` had the network name and password for all 16 properties sitting in plain
JavaScript on a public page with no login in front of it.

Send WiFi details to guests through the booking platform's messaging (Airbnb/VRBO), or
write them by hand on the printed cards from `archive/wifi-card.html`.

If a self-serve lookup is worth building later, it needs a real backend that verifies the
guest has an active booking and returns only that one property's credentials.

### Update property listings
- To add or edit a listing on the main site → edit `index.html`
- Plain HTML/CSS/JS — no framework needed

### Update contact info
- Search for `xenstayhomes.com` in `index.html` to find the contact section
- Replace with your real email and phone number

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
7. In `index.html`, find `const LEAD_ENDPOINT = 'PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';` near the bottom of the file and replace the placeholder with that URL.
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

Hosted on **Vercel** (free tier) — auto-deploys on every push to this repo.

Domain **xenstayhomes.com** is registered on **Namecheap** and pointed to Vercel nameservers.

Live URL: https://xenstayhomes.com

---

## Tech stack

| Tool | Purpose | Cost |
|---|---|---|
| Vercel | Hosting + auto-deploy | Free |
| Namecheap | Domain registrar | ~$12/yr |
| Stripe | Guest payments (book.html) | 2.9% + 30¢/transaction |
| Safely / Superhog | Per-stay guest insurance | Guest-paid |
| GitHub | Code storage + version control | Free |

---

## Properties managed

### Short-term rentals (16 listings)
- Skyline Serenity Retreat — Auburn, CA
- Punta Mita Surfers Paradise — Punta Negra, Mexico
- Beautiful 4BR/3BA Downtown Home — West Sacramento, CA
- Relax & Unwind in Rancho | Near Folsom — Rancho Cordova, CA
- Lake Natoma Retreat — Orangevale, CA
- Xen House 3BR/2BA — Sacramento, CA
- Rancho Heaven 4BD — Rancho Cordova, CA
- The Club House — West Sacramento, CA
- Charming 3BR West Sac Retreat — West Sacramento, CA
- Hotel-Style Studio — Sacramento, CA
- Cozy Buttes 3BR — Yuba City, CA
- 3BR/2BA Remodeled — Downtown & Airport, Sacramento, CA
- Modern 4BR — West Roseville, CA
- The Nest @ Skyline — Auburn, CA
- Spacious Hilltop 3BR — Auburn, CA
- Updated Lake Natoma & River Trails — Sacramento, CA

### Long-term rentals (8 properties · 12 leases)
- 207 D St Duplex — Roseville, CA ($4,300/mo)
- 9127 Tuolumne Dr Duplex — Sacramento, CA ($5,000/mo)
- 757 Almond St Duplex — Yuba City, CA ($3,850/mo)
- 761 Almond St Duplex — Yuba City, CA ($3,900/mo)
- 8185 Greenhills Way — Granite Bay, CA ($3,100/mo)
- 9680 Lake Natoma Dr — Orangevale, CA ($2,200/mo)
- 5522 Tripp Way — Rocklin, CA ($3,400/mo)
- 115 Rambling Dr — Folsom, CA ($3,150/mo)

---

## Fee structure

| Type | Fee |
|---|---|
| STR co-hosting | 10% of monthly gross bookings |
| LTR management | 6% of monthly gross rent |
| LTR (Tuolumne only) | 10% of monthly gross rent |
| Lease signing bonus | $1,000 per new lease signed |
| Direct booking | 20% total (10% mgmt + 10% direct fee) |

---

## Contact

XenStays LLC · xenstayhomes.com
