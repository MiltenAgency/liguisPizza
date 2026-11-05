# Source website analysis

> Historical reference analysis: the current pizza customization is documented in [PIZZA_THEME.md](PIZZA_THEME.md). Its colors, menu, copy, and removal of promotional buttons supersede the earlier details below.

Reference: [Baristi](https://baristi.framer.website/). Inspected 22 October 2026 through its public sitemap, rendered HTML, CSS, imagery, and a Chromium browser. This is a handcrafted React recreation of the observed frontend, not a recovered Framer editor project or a claim of pixel-perfect equivalence.

## Scope of inspection

All 17 sitemap routes were visited. The homepage was also inspected at 1600 px and 390 px; page templates were inspected at 1440 and 1600 px. Desktop full-page reference captures, mobile top-of-page captures, computed heading styles, image references, links, fields, and product copy were recorded locally during development. Category query URLs and FAQ controls were exercised. No contact or newsletter submission was sent to the original site.

The source's public `robots.txt` allowed crawling (`User-agent: *`, `Allow: /`) and identified [its sitemap](https://baristi.framer.website/sitemap.xml). This establishes the observed crawl rules, not the legal license of the assets. Only publicly exposed imagery and font files were bundled; no authentication, paywall, or access restriction was bypassed.

## Page inventory

| Path | Observed structure and interactions |
| --- | --- |
| `/` | Shared header; oversized two-line hero; floating croissant; angled “Fresh Joy” ribbon; category showcase; “Our Goodies” carousel; bakery introduction; statistics and quality panels; drinks showcase and carousel; testimonials; gallery; contact CTA; newsletter footer. |
| `/about` | Oversized title; four image cards; moving ribbon; bakery statistics; team preview; three milestone story entries; five FAQ entries; footer. |
| `/team` | Pastry hero; moving ribbon; six portrait cards with names, roles, and social links; contact CTA; footer. |
| `/contact` | Large title; cheesecake cutout; contact details; first/last name, email, phone, subject, and message fields; location map image; FAQ; footer. |
| `/menu` | Composite food hero; category images; All/Drinks/Pastries/Cakes selectors; initial nine products (confirmed in the recording); Load More; CTA; footer. Category selection is reflected in `?category=...`. |
| `/menu/:slug` | Product cutout on a pastel panel; review count; name; short description; preparation-time and ingredient chips; USD price; Order Now; a long-form article; testimonials; related products; footer. |
| `/404` | “404” illustration with a doughnut, an unavailable-page message, and Back to Home. |

Product slugs: `berry-bliss`, `choco-ring`, `iced-mocha`, `blueberry-muffin`, `velvet-mocha`, `choco-nap`, `berry-bubble`, `strawberry-tart`, `citrus-glow`, `strawberry-cake`, `strawberry-bliss`.

The source categories are unusual but reproduced as observed: Cakes includes Berry Bliss, Choco Ring, Blueberry Muffin, and Strawberry Cake; Pastries includes Berry Bliss, Choco Nap, and Strawberry Tart; Drinks includes five drinks. Berry Bliss appears in two categories. The local data stores a categories array to preserve this overlap.

## Design system

| Element | Observed values / treatment |
| --- | --- |
| Main text | Chocolate brown `#552d24` |
| Page background | Warm cream `#f9f1dd` |
| Hero/background panels | White with oversized organic shapes and curved transitions |
| Accent colors | Pink `#ff95c3`, lavender `#c9caf8`, blue `#b9dbfd`, lime `#d6de67`, yellow `#f9e47c`, orange `#f6700f` |
| Headlines | Boldonse, uppercase, close tracking, exaggerated scale |
| Body | Manrope, usually 16–20 px |
| Desktop content width | Approximately 1440 px, centered with generous margins |
| Cards | Rounded corners, pastel backgrounds, large cutout imagery extending above the card |
| Buttons | Lime or white pills, uppercase label, right arrow, rolling text on hover |
| Decorations | Four-point stars, flower badges, wavy labels, postage-stamp frames, tilted mini cards |
| Responsive source breakpoints | Wide desktop at 1500 px; tablet from 810 to below 1500 px; mobile below 810 px |

The reference has a very large tablet range. The recreation retains the same visual language while using intermediate layout rules at 1199, 809, and 540 px to keep typical laptop and phone widths usable. This is an intentional responsive adaptation rather than a copy of Framer's generated layout classes.

## Motion and interactions

Observed visual motion includes continuously translating text strips, floating/rotating imagery and badges, spring-like entrances, button label rolls, image hover transforms, and animated layout changes. Some source content relies on scroll-triggered positioning and overlapping elements; screenshots therefore vary with scroll position and timing.

The recording-based revision uses CSS keyframes for continuous ribbons, floating hero imagery, and spinning badges; transitions for category rotation and button/image hover; an IntersectionObserver for heading and card entrances; and a requestAnimationFrame scroll listener for text fill and testimonial photo movement. Product rows use three repeated groups with scroll-position rebasing, autoplay, hover/focus pause, explicit pause controls, previous/next arrows, and touch scrolling. Exact Framer spring physics and time synchronization remain approximations.

The category stage rotates three cutouts around a centered active item and changes the thumbnail caption. Its selected caption opens the appropriate menu category. About uses a sticky story heading beside milestone cards. The white organic backgrounds, tilted ribbons, colored badges, overlapping CTA cards, and inset lavender footer follow the supplied recording. Mobile layouts adapt the desktop composition.

The recording clearly reveals the Essentials hover menu: two columns containing Home, About, Contact, Menu (CMS), Menu Details (CMS), Team, and 404. The recreation supports hover, click, keyboard, outside-click dismissal, and Escape; mobile navigation uses a labelled toggle.

FAQ controls were inspected before and after activation. The local accordion exposes `aria-expanded`, keyboard activation, and one expanded answer at a time. Animated movement and transitions are disabled when the user requests reduced motion.

## Assets and provenance

113 public resources were downloaded from the reference's Framer CDN and Google Fonts: raster imagery, SVG decorations/icons, and two WOFF2 fonts. They are served from `public/assets/`. The complete source URL, local filename, byte count, and SHA-256 digest for each are in [ASSET_SOURCES.json](ASSET_SOURCES.json). Original source filenames are retained to make provenance traceable. Font license notices are included under `licenses/`.

The application does not load the source Framer JavaScript, analytics, or hosted forms. The fixed template links and visual Made in Framer credit are recreated as local markup matching the recording; their external destinations open only when clicked. React rendering, navigation, styling, carousel logic, and forms are implemented locally. Publicly downloaded HTML was used as reference material, not embedded as opaque page markup.

The downloaded reference images include some labels that do not match their product names—for example, “Iced Mocha” is illustrated with a green drink. These images and names were retained to match the reference.

## Backend boundaries

| Capability | Publicly observable behavior | Local implementation / missing dependency |
| --- | --- | --- |
| Product ordering | Product Order Now links point to `/contact`; header Order Now points to `/menu`. | Preserved. Local product links add a `product` query parameter and jump to the contact form, pre-filling the subject. No purchase is made. |
| Contact form | Hosted form UI is present; the service configuration and delivery destination are not exposed as a reusable local backend. | Browser validation and explicit demo feedback only. Requires an owned API/email service, spam controls, server-side validation, and delivery configuration for real messages. |
| Newsletter | Email input and submit control. | Explicit demo feedback only; no subscription or storage. Requires a mailing-list service/API and subscription workflow. |
| Payments, stock, shipping | No working cart or payment flow was observed. | Not invented. Adding commerce requires services for order/payment state, inventory, fulfilment, and applicable totals. |
| Product content | Public CMS-rendered snapshot. | Local JSON records; no live Framer CMS access or admin editor. |
| Reviews/stats | Static review counts, testimonials, and bakery statistics. | Static content; no review submission or independent verification of these claims. |
| Location map | Public raster map image. | Bundled image plus an explicit OpenStreetMap link to London. No live maps API, directions service, or verified street address. |
| Social destinations | Generic Facebook, X, LinkedIn, and YouTube URLs. | Preserved as external links; no fabricated business accounts. |

## Content quirks and deliberate changes

- Four source FAQ questions and answers concern solar energy. They are retained in `src/faqs.json` for fidelity and should be replaced if this becomes a real bakery site.
- Source copy has a misspelled “Conatct” footer link. The recreation labels it “Contact.”
- The recorded footer claims “Powered by Webflow” despite the Framer-hosted reference. That visual credit is retained for fidelity; the local implementation is React/Vite.
- Promotional “Get It For Free,” template/customization links, and the visual Made in Framer badge are included as shown in the recording. On narrow screens, the fixed widget condenses to the free-template link.
- The contact form retains the example placeholder email `jane@framer.com`; no messages are sent to that address.
- Form success messages explicitly explain that nothing was sent. Form values are not stored in localStorage, cookies, or a database.
- Layouts and timings are approximations. This deliverable is not the original editable Framer project, a functional backend clone, or a licensed transfer of third-party design assets.
