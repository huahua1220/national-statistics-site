# STATUS — national-statistics-site

## What was built

**The National Ledger — United States in figures**: a static national statistics almanac for the U.S., original "ledger/almanac" design (warm paper, ink navy, flag-red accent, Georgia serif display + system sans). All client-side, zero network.

- 8 hash-route sections, every one linked in nav and cross-linked from overview index cards: `#/` Overview, `#/population`, `#/economy`, `#/employment`, `#/prices`, `#/trade`, `#/health`, `#/education`, plus a 404 view.
- Each page: headline KPI cards, ≥1 hand-rolled SVG chart (line / area / bar / horizontal bar / grouped bar / donut — all in `charts.js`, no library), a fact table or notes, and a plain-language explainer. Working segmented-toggle controls on Employment (unemployment vs participation) and Prices (headline vs core CPI).
- Every figure carries source + year inline (`.src` chips: Census Bureau, BEA, BLS, Federal Reserve, CDC/NCHS, CMS, NCES, Treasury, CBO, OECD, SIPRI…).
- Responsive: 6-col KPI → 2-col on phone; nav becomes a horizontal scroll strip; verified at 390px.

## Files

- `app/` 7 files, 65,593 B raw / ~20.3 KB gzip first load: index.html, styles.css, data.js, charts.js, components.js, views.js, app.js
- `main.ts` — starter logic unchanged (extra comment lines only)
- `vendor/makefun-frontend.ts` — kit copy, unchanged
- `screenshots/` — 4 real Chromium renders
- `shots.json`, `LICENSE` (MIT), `README.md` (3 live make.fun badges)

## Screenshots (all real renders)

| file | view | size | dims |
|---|---|---|---|
| 1-overview.png (cover) | `#/` desktop | 80,843 B | 1280×800 |
| 2-population.png | `#/population` desktop scrolled | 56,941 B | 1280×800 |
| 3-prices.png | `#/prices` desktop scrolled | 61,637 B | 1280×800 |
| 4-phone.png | `#/` phone | 80,386 B | 390×844 |

All ≤256 KiB, long side ≤1280, short side ≥360. ✓

## Verification

- `node serve.ts` + headless Chrome/Chromium + agent-browser: all 8 routes render, no console errors, toggle controls verified switching series at DOM level.
- `MAKEFUN_OUTPUT_DIR=out node main.ts` → `out/dossier.json` built: **first load 7 files, 20,269 B gzip**; later-by-import 0; URLs in source: **0**.
- `grep -rE 'https?://' app/` → none (favicon is a data: URI with percent-encoded xmlns).
- app/ = 7 files (≤993), 65.6 KB (≤16 MiB), index.html 2.7 KB (≤1 MiB). ✓
- Horizontal overflow check at 390 px viewport: `scrollWidth == clientWidth`, only the intentionally scrollable nav row exceeds.

## Not submitted

Supervisor runs bundle --redact → check → submit. Repo must be public on github.com/huahua1220 with About homepage + topics set (done via gh).

DONE
