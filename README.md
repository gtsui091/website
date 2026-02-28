# Gordon Tsui — Portfolio

A single-page personal portfolio built as a React component (`portfolio.jsx`). It displays work experience in a minimal, dark editorial aesthetic with animated canvas backgrounds and hover-driven interactions.

## What it is

A single `portfolio.jsx` file — no router, no additional pages. Drop it into any React project as the root component.

## Design & aesthetic

- Dark background (`#0c0c0c`) that transitions to a per-company tinted bg on hover
- Typography: **Cormorant Garamond** (serif, italic) for company names, **DM Mono** for all metadata
- Custom cursor (dot that scales up on hover, blend mode: difference)
- Film grain overlay via SVG filter
- Entrance animations (fade up, staggered per row)

## Data structure

Experience entries live in the `experiences` array at the top of the file. Each entry has:

```js
{
  id: number,
  num: "01",              // display index
  title: "Company Name",  // big italic heading
  tags: ["Role", "..."],  // small caps metadata
  year: "2021–Present",
  desc: "Hover description shown on the right",
  accent: "#C8FF00",      // per-company accent color
  bg: "#0a1a00",          // per-company background tint
  visual: "terrain",      // canvas animation: "terrain" | "dots" | "fluid"
  subitems: [             // optional — expands on hover
    { label: "Feature", detail: "Short description" },
  ],
}
```

## Current experience entries

| # | Company | Role | Years |
|---|---------|------|-------|
| 01 | FORM | Web Team Lead / Full Stack | 2021–Present |
| 02 | Sea Around Us | Full Stack Developer | 2015–2020 |
| 03 | Backcountry Wok | Co-Founder | 2017–2019 |

### FORM sub-items (expand on hover)
- **Streaks** — push notification system, hackathon → A/B production
- **Web-Driven UI** — framework to decouple web from mobile release cycles
- **Infrastructure** — AWS OpsWorks zero-downtime migration + Intel-to-Arm
- **Subscriptions** — Prepaid, Try Before You Buy, variable trial architectures

### Sea Around Us sub-items
- **Spatial Data** — PostGIS integration for global fisheries dataset
- **Pipeline** — production data pipeline rebuild during tech stack transition
- **Manila Workshop** — 3-week training at Q-Quatics, Philippines
- **Research** — 6 co-authored peer-reviewed journal articles

### Backcountry Wok sub-items
- **Product** — instant Asian camping meals in compostable packaging
- **Mission** — addressed gap in Asian outdoor foods + plastic waste
- **Press** — featured in Edible Ottawa, March 2019

## Key interactions

- **Hover a row** → title shifts right, accent color activates, description fades in on the right, sub-items slide down beneath the row, background canvas animation fades in
- **Leave row** → everything reverses smoothly
- Each company has a unique canvas visual (`terrain` = sine wave lines, `dots` = rippling dot grid, `fluid` = radial gradient blobs)

## To do / known placeholders

- [ ] Wire up "About", "Contact" nav links
- [ ] Add real URLs to GitHub, LinkedIn, Email footer links
- [ ] Add more companies / reorder as needed
- [ ] Consider adding a 4th canvas visual type (`wave` or `pulse` are already coded in the original template if needed)

## Dependencies

- React (hooks: `useState`, `useEffect`, `useRef`)
- Google Fonts via `@import` in the style block: `DM Mono`, `Cormorant Garamond`
- No other dependencies
