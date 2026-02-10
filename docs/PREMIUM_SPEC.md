# Addict AI Technology — PREMIUM++ Spec

## Design Tokens (global CSS variables)

### Surfaces
- `--surface-0`: `#0B0E13`
- `--surface-1`: `#0F1420`
- `--surface-2`: `#151922`
- `--surface-3`: `#1B2130`

### Accents
- `--flame`: `#FF5A1F` (B2C)
- `--ember`: `#E63946` (alert/emphasis)
- `--metal`: `#415A77` (B2B)

### Text
- `--text-1`: `#E7E9EE`
- `--text-2`: `#B6BDC9`
- `--text-3`: `#8B94A6`

### Strokes
- `--stroke-1`: `rgba(255,255,255,0.08)`
- `--stroke-2`: `rgba(255,255,255,0.14)`

### Glass
- `--glass`: `rgba(11,14,19,0.60)`

### Effects
- `--shadow-1`: dark premium shadow
- `--shadow-2`: deeper shadow for hero/cards
- `--glow-flame`: subtle flame glow
- `--glow-metal`: subtle metal glow
- `--highlight`: subtle vertical highlight for cards

## Motion Rules
- Engine: GSAP + ScrollTrigger
- Allowed properties: `transform`, `opacity`, `filter`
- Prefers-reduced-motion: shorten or disable timelines, no scroll triggers
- Hero signature:
  - Left panel: `x:-16`, fade
  - Right panel: `x:+16`, fade
  - Pivot logo: `scale 0.98 -> 1`
  - CTA: stagger 80–120ms
  - Hover/focus: glow intensify + CTA emphasis
- Scroll reveals: `y:18`, fade, staggered
- Hover micro-interactions: cards lift 4px, buttons lift 2px, sheen effect

## Component Rules
- Navbar: sticky, glass, blur, hairline border, smooth scroll transition
- Buttons: flame/metal/outline/ghost, sheen on hover
- Cards: surface + stroke + shadow + highlight overlay; hover = stroke-2 + glow
- Tables: sticky header, zebra rows, skeleton loading
- Forms: flame focus (B2C), metal focus (B2B), inline errors (ember)

## Definition of Done
- No flat sections: every section/card has relief
- Cinematic background + noise on all pages
- Motion system complete + reduced motion support
- Content fully seeded in Strapi (no placeholders)
- SEO: meta + OG + JSON-LD + sitemap dynamic
