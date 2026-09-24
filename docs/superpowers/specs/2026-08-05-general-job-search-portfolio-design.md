# General Job-Search Portfolio Design

## Goal

Make the portfolio communicate both puzzle-mobile product experience and broad technical leadership within the first screenful, while preserving the existing retro game-developer visual identity.

## Scope

- Reposition the hero copy around Unity mobile, puzzle, and lead-development experience.
- Promote a balanced group of four featured projects: two live puzzle titles and two leadership/technical-depth titles.
- Make Live and Featured products the first portfolio view; retain delisted products in a separate, clearly labelled filter.
- Standardize selected project metadata using only verifiable role, platform, link, and outcome data already present in the portfolio.
- Update experience and skill copy to foreground production ownership, prototyping, mobile optimization, Firebase, and puzzle work without removing the wider Idle, server, and Android background.

## Non-goals

- No full visual redesign, new CMS, back-end, or new portfolio projects.
- No invented retention, CPI, revenue, performance, or team-size figures.
- No modification to external deployment or publishing settings.

## Information Architecture

1. **Hero:** `Senior Unity Mobile & Puzzle Game Developer | Lead Developer`; summary uses defensible experience wording and shipped-product proof.
2. **Featured projects:** Merge Drop Master and JigMaster as puzzle proof; My Pool Club and Brave Miner as leadership/3D optimization proof. Each card exposes role, genre, verified link, and the available outcome.
3. **Release timeline:** initial filter shows `LIVE` plus `FEATURED`; a dedicated `ARCHIVED` filter replaces the negative `REMOVED` presentation. The underlying data remains intact.
4. **Experience and skills:** reorder or revise existing copy only; retain complete career timeline.

## Data and Component Changes

- `src/data/portfolio.json` remains the single source of portfolio content. It gains explicit featured ordering and presentation-friendly status labels where needed.
- `src/components/Hero.jsx` renders the revised positioning and concise proof-oriented summary.
- `src/components/Projects.jsx` renders the chosen featured case studies in the defined order.
- `src/components/ProductTimeline.jsx` defaults to the hiring-friendly product set and exposes `LIVE`, `FEATURED`, and `ARCHIVED` filters.
- The existing component structure, typography, animation, and modal behavior remain unchanged.

## Quality Rules

- Claims about releases, installs, roles, and platforms must correspond to the supplied data.
- The product count and experience wording must not contradict visible portfolio entries.
- Live puzzle evidence must appear before the full release history.
- The app must still lint and build successfully.

## Verification

- Add focused automated coverage for the product-filter and featured-selection behavior if the repository test stack supports it; otherwise use a production build plus browser-based responsive checks at desktop and mobile widths.
- Verify each featured card has the intended order and links, the archive filter exposes former `REMOVED` products, and the default timeline does not lead with archived products.
