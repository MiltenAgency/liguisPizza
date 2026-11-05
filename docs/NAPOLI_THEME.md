# Luigi’s Pizza — current customization

Updated 23 October 2026, incorporating the supplied green Jeff’s Pizza logo as visual inspiration.

The site uses an original green line-art pizza maker tossing dough, a mustache and tilted cap, with a Luigi’s Pizza wordmark and Napoli / Pizza & Burgers descriptor. The mascot is editable vector artwork in `public/assets/pizza/napoli-chef.svg`; the favicon uses the same drawing. The reference business name was not carried over.

The page canvas is white. Tomato red, basil green, Napoli blue and gold provide accents. Oval labels, circular badges, arch-shaped food panels, and rounded cards replace the main organic shapes. The footer now spans the viewport, with an Italian tricolor border. Groovy Waves headings, Konja logo lettering, and DM Sans body text/numbers load entirely from local files; source URLs and licenses are included.

All beverage menu records, category controls, copy, and drink/milk illustrations were removed from the live frontend. Five burger records now occupy their places, with their own product and order-enquiry links. Four pizzas and two sides remain. Former beverage product URLs display the custom 404; older bakery aliases for the six pizza/side records remain supported.

The original interaction system is retained: animated ribbons, hero motion, rotating categories, continuous carousels with pause controls, scroll reveals and text fill, FAQ, responsive navigation, query filters, and reduced-motion preferences.

## New image assets

Generated with the **built-in imagegen tool**, with transparent backgrounds:

- `public/assets/pizza/classic-burger.png`
- `public/assets/pizza/chicken-burger.png`
- `public/assets/pizza/napoli-burger.png`
- `public/assets/pizza/spicy-chicken.png`
- `public/assets/pizza/house-cheeseburger.png`

The complete final prompts and generation mode are in [BURGER_GENERATION.json](BURGER_GENERATION.json). These are illustrative menu photographs. All five burger products now have distinct images. The latest three images and their exact prompts are recorded in [NEW_BURGER_IMAGES.json](NEW_BURGER_IMAGES.json). Existing pizza and garlic-bread images remain local.

The chef, pepper, oval badge, Vesuvius roundel, and arch panels are native SVG files under `public/assets/pizza/`. Theme styling is in `src/napoli-theme.css`; fonts are declared in `src/napoli-fonts.css`.

## Running and backend limitations

See [README.md](../README.md) for installation, localhost commands, and packaging. No backend was added: contact/newsletter submissions remain explicit local demos, and orders only prefill an enquiry. Actual ordering, payments, message delivery, subscriptions, inventory, and CMS updates require connected services. Business details and menu data are examples.

## Supplied typography update

The user requested the name **Luigi’s Pizza** and supplied Groovy Waves Demo and Konja font archives. Header/footer wordmarks, accessible link labels, page titles, contact text, mascot SVG titles, and the placeholder email now use the new name. The project directory and ZIP filename remain unchanged for existing local workflows.

Both font archives contain a “Free for Personal Use” notice, retained under `docs/licenses/`. The fonts are hosted locally as the original OTF files. Their demo digit glyphs contain license text; CSS excludes those code points and uses DM Sans for numeric content. The original fonts have not been modified. [USER_FONT_SOURCES.json](USER_FONT_SOURCES.json) records archive names, saved paths, and SHA-256 hashes.

## Team page removal

The Team route, desktop/mobile navigation entries, footer link, About-page crew section, and unused React team components/data have been removed. Visiting `/team` or `/team/` now displays the custom 404. Historical source-analysis documents describe the original reference site.
