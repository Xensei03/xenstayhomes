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

### Update WiFi passwords
1. Open `book.html`
2. Find the `wifiData` object (search for `const wifiData`)
3. Replace the `net` and `pw` values for each property with the real network name and password
4. Save the file and re-upload to this repo
5. Vercel will automatically redeploy within 30 seconds

### Update property listings
- To add or edit a listing on the main site → edit `index.html`
- To add or edit a listing on the booking page → edit `book.html`
- Both files use plain HTML/CSS/JS — no framework needed

### Update contact info
- Search for `xenstayhomes.com` in `index.html` to find the contact section
- Replace with your real email and phone number

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
