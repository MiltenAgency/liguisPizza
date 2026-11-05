# Recording-based revision

> Historical reference analysis: the current pizza customization is documented in [PIZZA_THEME.md](PIZZA_THEME.md). Its colors, menu, copy, and removal of promotional buttons supersede the earlier details below.

Reference: the user-supplied `screenrecording-2026-10-22_22-20-04.mp4`, 1880 × 950 pixels, 60 fps, approximately 129 seconds. Frames and detailed crops were examined across the full recording, including Home, About, Contact, Menu, product content, the dropdown, and 404. Source HTML and the existing downloaded public assets supplied the images, fonts, copy, and desktop typography presets.

## Visual changes

- Oversized hero, floating chocolate croissant, lavender stamp, blue flower, angled pink ribbon, white organic backdrop, and scroll cue.
- Three-position category rotation with an active thumbnail caption and flower-shaped controls.
- Full-width pastel product rows, overlapping product cutouts, and nine initial menu cards before Load More.
- Crafted section, oversized scroll-filled statement and statistics, quality panels, and drinks artwork on the left.
- Testimonial photo movement, colored decorative badges, portrait card, and four-image gallery.
- Contact CTA with a rectangular portrait, overlapping Treats/Taste cards, rotating badges, postage stamp, contact arrow, and giant Baked with Love ticker.
- About gallery/ribbon, three-column statistics, colored team cards, sticky story column, and centered FAQ panels.
- Contact illustration, blue form panel, portrait, map card, and decorated 404 screen.
- Two-column Essentials hover menu, inset lavender footer, and fixed template links.

## Motion implementation

| Effect | Implementation |
| --- | --- |
| Text ribbons / large closing ticker | Repeating CSS translation |
| Hero | Entrance, gentle sway, and scroll-driven rotation |
| Decorative badges | CSS rotation |
| Category spotlight | Three rotating positions and changing caption every 4.2 seconds; arrow controls |
| Product rows | Continuous native scroll with repeated groups and boundary rebasing |
| Carousel interaction | Hover/focus pause, explicit pause/resume, arrows, and touch scrolling |
| Heading/card entrances | IntersectionObserver plus translate, opacity, blur, and clipping transitions |
| Why Choose Us text | Scroll-position-driven color fill |
| Testimonial photo | Scroll-position-driven horizontal movement |
| Story column | Desktop sticky positioning |
| Buttons and imagery | Rolling labels and hover transforms |

`prefers-reduced-motion` disables continuous movement and entrances and shows all content immediately. The recording shows desktop behavior; phone/tablet layouts are responsive adaptations, not independently recorded mobile equivalents. Exact frame timing, Framer spring parameters, and every intermediate scroll position cannot be recovered from a screen recording. This is a close handcrafted reconstruction rather than the original Framer project.

Local forms retain visible validation and explicit demo outcomes. Sending messages, subscribing users, payments, and live CMS synchronization still require backend services. See the README for setup and backend boundaries.
