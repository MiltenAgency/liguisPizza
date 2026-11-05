> Historical pizza-theme iteration. [NAPOLI_THEME.md](NAPOLI_THEME.md) describes the current logo, fonts, white background, burger menu, and full-width footer.

# Pizza theme — 23 October 2026

The current site is **Baristi Pizza**, a pizza-kitchen customization of the recording-based reconstruction. The shared layout and animation behavior remain, while the food imagery, menu, copy, palette, and branding treatment have changed.

## Changes

- Palette: tomato `#b93222`, cream `#fff3df`, basil `#405837`, gold `#f4c75c`, peach `#efb090`, and sage `#d9dfb5`.
- Transparent pepperoni, Margherita, garden-pizza, and garlic-bread artwork replaces bakery cutouts across heroes, categories, products, and decorative cards.
- Pizzas / Sides / Drinks filters; 11 sample menu records with updated detail copy and order-enquiry links.
- Pizza copy on all main pages, relevant FAQs, new title/favicon, and a pizza illustration in the 404.
- All four requested promotional buttons and their component/styles were removed. No promotional widget is rendered on any route.
- Updated footer branding and a placeholder contact address, with source-design credits retained in the documentation.
- Original product routes continue as aliases to avoid breaking local bookmarks.
- Ribbons, hero movement, category transitions, autoplay/pause controls, scroll text fill, testimonial motion, hover behavior, responsive navigation, and reduced-motion support are retained.

## Artwork and photography

Generated with the **built-in image_gen tool**, preserving transparent backgrounds:

- `public/assets/pizza/pepperoni.png`
- `public/assets/pizza/margherita.png`
- `public/assets/pizza/garden.png`
- `public/assets/pizza/garlic-bread.png`

The exact prompt set is recorded in [PIZZA_GENERATION.json](PIZZA_GENERATION.json). These are illustrative menu images; Margherita/Cheese Pizza share artwork, as do the two garlic-bread options.

Four local kitchen/food photographs were downloaded from public Unsplash image links. Their originating pages, image URLs, and hashes are in [PIZZA_PHOTO_SOURCES.json](PIZZA_PHOTO_SOURCES.json). Photographers: Ari Kurniawan (oven), Revolve Pizza Oven (table), Markus Spiske (pizza service), and Zoshua Colah (topped pizza). Their source pages identify the images as available under the [Unsplash License](https://unsplash.com/license).

New simple decorative SVGs and the favicon are code-native assets. Existing SVG decorations were recolored into separate files, retaining the originals.

## Local behavior

There is no backend change: forms provide honest demo results, product buttons open contact enquiries, and no purchase or email is sent. Prices, recipes, timing, people, reviews, statistics, and contact/location information are sample content. The README explains how to run and customize the site.

`SITE_ANALYSIS.md` and `VIDEO_MATCH.md` describe the earlier source/recording reconstruction; this document supersedes their bakery colors, copy, menu, and promotional-widget details.
