# The National Ledger — United States in figures

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/huahua1220/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/huahua1220/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An independent almanac of U.S. national statistics that runs entirely from static files: eight sections (overview, population, economy, employment, prices, trade, health, education) on hash routes, every figure labelled with its source and year, and every chart drawn by hand as SVG in the site's own code — no chart library, no framework, no network requests.

## Run it

The site is the `app/` directory — serve it with any static file server:

```sh
node serve.ts            # serves app/ at http://localhost:8080
```

or `npx serve app/`, `python3 -m http.server -d app`, etc. Open `app/index.html` in a desktop browser or on a phone; it works fully offline.

`main.ts` (Node 22+) hands the entry in: it copies `app/` and `screenshots/` to `/output` (`MAKEFUN_OUTPUT_DIR` locally) and writes `dossier.json` via `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Layout

- `app/index.html` — shell: masthead, section nav, footer
- `app/data.js` — every figure and series, each with source + year
- `app/charts.js` — hand-rolled SVG charts (line, bar, horizontal bar, grouped, donut)
- `app/components.js` — KPI cards, fact tables, chart cards, notes
- `app/views.js` — the eight section pages
- `app/app.js` — hash router and live chart toggles
- `app/styles.css` — the almanac design system, responsive to phone width
- `screenshots/` — four real browser renders (desktop overview, two section pages, phone)
- `main.ts` — Node 22 entrypoint; `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
