# Luigi’s Pizza — Napoli Pizza & Burgers

A responsive pizza-kitchen website built with React and Vite. It keeps the layout and animation system developed from the Baristi reference and the supplied recording, with a new pizza theme, menu, artwork, and palette. The four fixed template/Framer promotional buttons have been removed from the application.

## Run locally

Install Node.js **22.12 or newer**. From the extracted `baristi-local` folder:

```bash
npm ci
npm run dev
```

Open **http://localhost:5173**. If that port is occupied, Vite prints the next available port. Stop your server with `Ctrl+C`.

Internet is required to install dependencies. After installation, all application assets, fonts, images, and menu data load locally. External social and map destinations only open when clicked.

## Production build

```bash
npm run build
npm run preview
```

Open **http://localhost:4173**. A static host serving `dist/` must fall back to `index.html` for direct page URLs. Opening the source HTML with `file://` is not supported.

## Napoli theme

- White background with tomato red, basil green, Napoli blue, and gold accents.
- Original green line-art pizza-maker logo inspired by the supplied reference.
- Locally hosted Groovy Waves headings, Konja logo lettering, and DM Sans body text/numbers, new arch/oval shapes, and a full-width footer.
- New transparent pizza and garlic-bread artwork, plus local pizza-kitchen photography.
- Home, About, Contact, Menu, product pages, and a pizza-themed 404.
- Eleven sample products: four pizzas, two sides, and five burgers.
- Category rotation, continuous product carousels, ribbons, rotating badges, scroll reveals, text fill, and testimonial movement.
- Menu filters, Load More, hover/mobile navigation, keyboard controls, FAQ, and order-enquiry subject prefilling.
- No Get It For Free, See More Templates, Customization Service, or Made in Framer widget.

The `baristi-local` folder name is retained so existing local commands keep working. Old product URLs such as `/menu/berry-bliss` remain aliases for the corresponding pizza-theme product.

## Pages and content

Main pages: `/`, `/about`, `/contact`, `/menu`, `/404`. The former `/team` page has been removed and now shows the custom 404.

Product routes: `/menu/margherita`, `/menu/pepperoni`, `/menu/garden-pizza`, `/menu/cheese-pizza`, `/menu/garlic-bread`, `/menu/cheesy-garlic-bread`, `/menu/classic-burger`, `/menu/crispy-chicken`, `/menu/napoli-burger`, `/menu/spicy-chicken`, `/menu/house-cheeseburger`.

Menu query links use `?category=pizzas`, `?category=sides`, or `?category=burgers`.

Edit products in `src/products.json`, FAQs in `src/faqs.json`, components/copy in `src/main.jsx`, and the current identity styling in `src/napoli-theme.css` and `src/napoli-fonts.css` (which override the earlier `src/pizza-theme.css`). Shared responsive styling is in `src/styles.css` and `src/video-match.css`; scroll motion is in `src/motion.js`.

## Backend boundaries

Contact and newsletter forms validate input and explicitly report a **local demo result**. They do not send messages, subscribe anyone, or store data. Order buttons open an enquiry; there is no cart, checkout, payment, delivery tracking, or inventory system. Real operations require your own services and configuration.

The menu, prices, preparation times, statistics, testimonials, phone number, and location are sample content. `hello@luigispizza.example` is an intentional placeholder. Replace these with your business information before publishing. The local map is an image with an external map link. Product content is local JSON, without Framer CMS synchronization.

## Checks

```bash
npx playwright install chromium  # if no compatible Chromium is available
npm test
```

Tests use `/usr/bin/chromium` when available, otherwise Playwright Chromium. A custom executable can be supplied with `CHROMIUM_PATH`. Tests cover routes, promo removal, categories, history, navigation, forms, carousel motion, reduced motion, local image loading, and layouts from 320 to 1880 pixels.

See [verification](docs/VERIFICATION.md) and the [Napoli theme notes](docs/NAPOLI_THEME.md).

## Supplied fonts

The Groovy Waves Demo and Konja OTF files supplied by the user are included under `public/assets/fonts/`. Their bundled notices state **Free for Personal Use**; those notices are retained in `docs/licenses/`. These demo files display license text in place of number glyphs, so display-font unicode ranges exclude digits and numeric content uses DM Sans. See [font provenance](docs/USER_FONT_SOURCES.json).

## Images and credits

New cutout artwork was generated with the built-in image generation tool. Burger paths and exact prompts are in [BURGER_GENERATION.json](docs/BURGER_GENERATION.json); the new logo and decorative SVGs are native vector artwork. Final paths and exact prompts are in [PIZZA_GENERATION.json](docs/PIZZA_GENERATION.json). Pizza photography sources and hashes are in [PIZZA_PHOTO_SOURCES.json](docs/PIZZA_PHOTO_SOURCES.json).

Earlier open-source font sources are in [NAPOLI_FONT_SOURCES.json](docs/NAPOLI_FONT_SOURCES.json), with their OFL licenses in `docs/FONT_LICENSE_*.txt`. Original reference assets and fonts are retained, with provenance in [ASSET_SOURCES.json](docs/ASSET_SOURCES.json) and font licenses under `docs/licenses/`. Recolored SVG decorations are separate copies under `public/assets/pizza/decor/`. The original visual design is attributable to RedDevs and the respective asset owners; this local customization does not transfer rights to the original third-party assets.

## ZIP

The updated `baristi-local.zip` is beside the project folder. Regenerate it with Python 3:

```bash
npm run package
```

The ZIP includes source, lockfile, local assets, tests, screenshots, and documentation. It excludes `node_modules`, build output, research captures, and test output. A SHA-256 checksum is written alongside it.
