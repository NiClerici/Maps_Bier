# Product

## Register

product

## Users

On-the-go locals and visitors in Aarau, Switzerland, almost always on a phone. They're out (or about to head out) and want to answer one question fast: "which bar near me has the beer I want, on draft or in a bottle, and what does it cost?" Interface language is German. Mobile-first is the priority; desktop is secondary.

## Product Purpose

A single-screen map of Aarau bars showing which beers each one serves, whether on draft (Fass) or bottle (Flasche), the price in CHF, and which non-alcoholic options exist. Users filter by a specific beer and/or by availability mode and the map markers update instantly. Success is a user finding a bar serving the beer they want in seconds, without scrolling, sign-up, or reading. Beer/price data is hand-maintained example data, not a live feed.

## Brand Personality

Bold and characterful. The map should feel like a confident local guide with a point of view, not a neutral utility. Voice is direct, German, a little playful (the 🍺 is part of it). Emotional goal: quick delight and "oh nice, this is exactly what I needed." Character lives in color, type, and the markers/popups — never at the expense of speed or legibility on a phone.

## Anti-references

- **Generic SaaS dashboard**: no cream/sand body background, no repeated icon+heading+text card grids, no gradient accents, no hero-metric template. This is a tool with personality, not a startup landing page.
- **Corporate brewery marketing**: no glossy stock photography, no dark moody hero, no badge walls, no brand-sponsored gloss. The opinion is the maker's, not a beer label's.

## Design Principles

1. **One screen, one question.** Everything needed to answer "where's my beer?" is visible without scrolling. The map is the product; chrome stays minimal.
2. **Instant feedback.** Every filter interaction updates markers immediately. No spinners, no waiting, no reload.
3. **Character in the details.** Personality is carried by the markers, popups, color, and type — not by adding chrome. The map stays readable first.
4. **Phone-first, thumb-friendly.** Designed for one-handed use outdoors: large touch targets, high contrast in daylight, no precision required.
5. **Degrade honestly.** When the map or tiles can't load (offline, firewall, blocker), say so plainly in German instead of showing a blank screen.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Daylight-readable contrast (used outdoors on phones). Touch targets ≥44×44px. Keyboard-operable filters with visible focus. Don't encode meaning by color alone — draft/bottle/non-alcoholic already pair color with text labels and icons, which should be preserved. Respect `prefers-reduced-motion` for any added motion.
