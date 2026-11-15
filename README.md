# Rather Honey — premium honey storefront

A complete, production-shaped e-commerce website for **Rather Honey**, the family honey
business from Gamroo, Bandipora in Kashmir. Built with **Next.js 14 (App Router, JavaScript)**,
no UI framework and no CSS-in-JS runtime — just React Server Components, a small client-side
component layer and hand-authored CSS.

> Design language: oversized editorial typography, warm honey palette, kinetic marquee,
> asymmetric product grid, sticky scroll storytelling and a working commerce backend.
> Structure is inspired by [hotbite.framer.website](https://hotbite.framer.website/);
> content, products, prices and contact details come from
> [ratherhoney.odoo.com](https://ratherhoney.odoo.com/).

---

## 1. Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Node 18.17+ is required (Next.js 14).

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` and `RH_SESSION_SECRET`
before deploying.

---

## 2. What is implemented

### Marketing site
| Section | Where |
| --- | --- |
| Rotating announcement bar | `components/AnnouncementBar.jsx` |
| Sticky nav, cart count, mobile sheet, search | `components/Navbar.jsx`, `SearchModal.jsx` |
| Full-height hero with parallax jar + rotating seal | `components/home/Hero.jsx` |
| Infinite brand marquee (pauses on hover) | `components/home/Marquee.jsx` |
| Featured collection with quick view | `components/home/FeaturedCollection.jsx`, `ProductCard.jsx`, `QuickView.jsx` |
| Editorial “more than honey” story | `components/home/Story.jsx` |
| Scroll-driven 4-stage process | `components/home/Process.jsx` |
| “Why Rather Honey” values | `components/home/Values.jsx` |
| Data-driven promo banner | `components/home/PromoBanner.jsx` + `data/promotions.json` |
| Verified-only reviews block | `components/home/Reviews.jsx` + `data/reviews.json` |
| Instagram-style gallery | `components/home/Gallery.jsx` |
| Newsletter (working, deduped) | `components/home/Newsletter.jsx` + `app/api/newsletter` |
| Footer with contact, socials, policies | `components/Footer.jsx` |
| Our story / Our process / Contact / Policies | `app/our-story`, `app/our-process`, `app/contact`, `app/policies/[slug]` |

### Commerce
* `/shop` — category filters (All / Raw Honey / Shilajit), live search, sorting, deep-linkable
  `?category=` & `?q=` URLs, empty and loading states.
* `/shop/[slug]` — image gallery with thumbnails, variant (weight) selection with live price,
  quantity stepper, add to bag, buy now, shipping/returns accordion, related products.
* `/cart` — quantity controls, remove, coupon field, subtotal, delivery, total.
* `/checkout` — contact, Indian shipping address, delivery notes, payment method, validation,
  server-side re-pricing, order creation.
* `/order/[id]` — order confirmation with items, totals, address and timeline.
* `/account` — register / sign in (scrypt-hashed passwords, signed HttpOnly cookie) and
  `/account/orders`, `/account/orders/[id]` order history.
* Cart persists in `localStorage`; slide-over bag with free-delivery progress and toast feedback.

### Technical
* **SEO** — per-page metadata, canonical URLs, Open Graph/Twitter cards, `sitemap.xml`,
  `robots.txt`, JSON-LD for `Organization`, `WebSite`, `Product` (with per-variant offers and
  verified `aggregateRating`) and `BreadcrumbList`.
* **Performance** — static rendering for all marketing and product pages, `next/image` AVIF/WebP
  with responsive `sizes`, self-hosted variable fonts, zero client-side libraries, CSS-only motion.
* **Accessibility** — skip link, landmarks, labelled controls, focus-visible rings, keyboard
  closable dialogs, `aria-live` feedback, `prefers-reduced-motion` disables every animation,
  `noscript` fallback so scroll reveals never hide content.
* **Security** — prices and totals are recomputed on the server from the catalogue, sessions are
  HMAC-signed, passwords use `scrypt`, the runtime store serialises writes atomically.

---

## 3. Editing the store (no redesign required)

| What | File |
| --- | --- |
| Products, prices, weights, images, badges, ratings | `lib/products.js` |
| Brand, contact details, shipping rules, announcements | `data/site.json` |
| Promo banner + coupon codes | `data/promotions.json` |
| Reviews (only verified entries) | `data/reviews.json` |
| Policies | `lib/policies.js` |
| Colours, type scale, spacing | `app/css/base.css` (tokens at the top) |

**Adding a honey variety:** append an object to `lib/products.js`. Shop grid, product page,
search, cart, checkout, sitemap and schema.org markup all read from that file.

**Publishing a coupon:** add an entry to `coupons` in `data/promotions.json` —
```json
{ "code": "HARVEST10", "type": "percent", "value": 10, "minSubtotal": 999,
  "enabled": true, "label": "Harvest offer" }
```
The cart, checkout and `/api/coupon` validate it; nothing is hardcoded in the UI.

**Turning the promo banner off:** set `banner.enabled` to `false` — the section disappears.

---

## 4. Payments

Online payments are intentionally **not faked**. The checkout offers cash on delivery, and the
"Pay online" option is disabled with an honest explanation until a gateway is connected.

To integrate Razorpay:

1. Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in the environment.
2. In `lib/orders.js`, when `paymentMethod === 'online'`, create a Razorpay order with the
   server-computed `totals.total`, return its `id`, and verify the signature returned by the
   client before marking `paymentStatus: 'paid'`.
3. Load Razorpay Checkout in `components/checkout/CheckoutForm.jsx` for the `online` branch and
   open it with that order id.

The storefront already: hides/disables the gateway option when keys are absent, refuses
`paymentMethod: "online"` server-side without keys, and stores payment status on every order.

---

## 5. Data storage

`lib/store.js` is a tiny JSON document store writing to `data/.runtime/` (git-ignored):
`users.json`, `orders.json`, `newsletter.json`, `messages.json`. Writes are atomic
(temp file + rename) and serialised per process.

For production, swap the functions in `lib/store.js` for your database (Postgres, MongoDB, KV).
The interface used by the routes is just async functions — no route handler needs to change.

> Serverless note: most serverless filesystems are ephemeral. Use a persistent volume or a real
> database before taking live orders.

---

## 6. Content provenance (important)

All product names, sizes, prices, ratings and contact details are taken from the live
Rather Honey store. Nothing about certifications, lab testing, health benefits or farming
practices has been invented. Two things to confirm before launch:

1. **Weights vs. prices.** The live shop lists Kiker Honey at ₹899 and Soli Honey at ₹699 on the
   grid, while their product pages show ₹599 and ₹349 with a 1 kg option. This build uses
   **500 g / 1 kg** variants at **₹599 / ₹899** (Kiker) and **₹349 / ₹699** (Soli) — every number
   exists on the store, just normalised. Adjust `lib/products.js` if the intended prices differ.
2. **Shilajit net weight.** The product description says 15 g, while the jar label in the photo
   reads 20 g. This build uses 15 g from the description.

Reviews: the only verified review data available is the store's rating summary
(5.0 from 2 ratings on Kiker Honey, 5.0 from 1 rating on Soli Honey). No customer names or
quotes are invented — the reviews section shows the real aggregate and invites customers to
contribute. Add real testimonials to `data/reviews.json` and they render automatically.

Stock photography: product and team images are the real Rather Honey images. Lifestyle,
beekeeping and pouring imagery is AI-generated for this design and should be replaced with the
brand's own photography before launch (`public/img/`).
