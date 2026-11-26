/* Page views for The National Ledger. Each function returns the HTML for one
   hash route: KPI strip, charts, fact table and a plain-language explainer. */

import { headline, indexCards, population, economy, employment, prices, trade, health, education, sourceAgencies } from './data.js';
import { lineChart, multiLineChart, barChart, hBarChart, groupedBarChart, donutChart, legend } from './charts.js';
import { kpiGrid, chartCard, factTable, notesBlock, pageHead, callout } from './components.js';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- Overview ---------- */
export function overviewView() {
  return `
  ${pageHead('United States · National statistics', 'The country in seven numbers', 'Headline indicators for the United States — then seven sections to explore: population, economy, jobs, prices, trade, health and education.')}
  ${chartCard({
    title: 'Nominal GDP, 2000–2024',
    svg: lineChart({
      labels: economy.gdp.labels, values: economy.gdp.values, color: '#1f3a5f', area: true,
      lastLabel: '$29.2T', labelEvery: 4, valueFmt: (v) => '$' + v + 'T', height: 256,
    }),
    source: economy.gdp.source, year: economy.gdp.year,
    foot: 'U.S. gross domestic product has nearly tripled in nominal terms since 2000.',
  })}
  ${kpiGrid(headline)}
  <h2>Explore the sections <span class="h2-note">each opens with a chart and a fact sheet</span></h2>
  <div class="index-grid">${indexCards
    .map((c) => `<a class="index-card" href="#${c.path}"><div class="i-title">${esc(c.title)} →</div><div class="i-stat">${esc(c.stat)}</div><div class="i-desc">${esc(c.desc)}</div></a>`)
    .join('')}</div>
  <h2>How to read this site <span class="h2-note">sources and conventions</span></h2>
  <div class="card"><div class="prose">
    <p>Every figure on this site comes from a named public release — the Census Bureau, BEA, BLS, the Federal Reserve, CDC, NCES, Treasury and others — and is labelled <strong>in place</strong> with its source and year, e.g. <span class="src">BLS · 2025</span>. Figures are the latest annual or recent-month readings at compilation; “≈” marks a rounded value.</p>
    <p>Nothing here is fetched live. All data lives in this site’s own files and every chart is drawn by its own SVG code — the page works fully offline.</p>
    <p><strong>Sources used:</strong> ${sourceAgencies.map(esc).join(' · ')}</p>
  </div></div>`;
}

/* ---------- Population ---------- */
export function populationView() {
  const d = population;
  return `
  ${pageHead('Section 1 · Demographics', 'Population', d.lede)}
  ${kpiGrid(d.facts)}
  ${chartCard({
    title: 'Resident population since 1960',
    svg: lineChart({
      labels: d.history.labels, values: d.history.values, color: '#1f3a5f', area: true,
      lastLabel: '340.1M', valueFmt: (v) => v + 'M', ymin: 150,
    }),
    source: d.history.source, year: d.history.year,
    foot: 'The U.S. added about 160 million residents in six decades.',
  })}
  <h2>Where people live <span class="h2-note">largest states and cities</span></h2>
  <div class="grid-2">
    ${chartCard({
      title: 'Ten largest states',
      svg: hBarChart({ rows: d.states, color: '#2e5d8a', valueFmt: (v) => v + 'M', labelWidth: 120 }),
      source: d.statesSrc.source, year: d.statesSrc.year, foot: 'The top four states hold a third of the country.',
    })}
    ${chartCard({
      title: 'Largest cities',
      svg: hBarChart({ rows: d.cities, color: '#a63a2f', valueFmt: (v) => v + 'M', labelWidth: 120 }),
      source: d.citiesSrc.source, year: d.citiesSrc.year, foot: 'New York City alone holds about 2.5% of the nation.',
    })}
  </div>
  <h2>Age structure and composition <span class="h2-note">who the 340 million are</span></h2>
  <div class="grid-2">
    ${chartCard({
      title: 'Share of population by age band',
      svg: hBarChart({ rows: d.ages, valueFmt: (v) => v + '%', labelWidth: 120 }),
      source: d.agesSrc.source, year: d.agesSrc.year, foot: 'Nearly one resident in five is now 65 or older.',
    })}
    ${chartCard({
      title: 'Race and Hispanic origin',
      svg: `<div style="max-width:300px;margin:0 auto">${donutChart(d.composition, { centerTop: '340M', centerBottom: 'residents' })}</div>`,
      legendHtml: legend(d.composition.map((p) => ({ ...p, display: p.value + '%' }))),
      source: d.compositionSrc.source, year: d.compositionSrc.year,
      foot: 'Hispanic origin is counted across races per Census convention.',
    })}
  </div>
  ${notesBlock(d.notes)}`;
}

/* ---------- Economy ---------- */
export function economyView() {
  const d = economy;
  return `
  ${pageHead('Section 2 · Output', 'Economy', d.lede)}
  ${kpiGrid(d.facts)}
  ${chartCard({
    title: d.gdp.title,
    svg: lineChart({
      labels: d.gdp.labels, values: d.gdp.values, color: '#1f3a5f', area: true,
      lastLabel: '$29.2T', labelEvery: 4, valueFmt: (v) => '$' + v + 'T',
    }),
    source: d.gdp.source, year: d.gdp.year,
    foot: 'The 2020 dip and the 2021–22 nominal jump (growth plus inflation) are both visible.',
  })}
  <div class="grid-2">
    ${chartCard({
      title: 'Real GDP growth',
      svg: barChart({
        labels: d.growth.labels, values: d.growth.values, color: '#2e5d8a',
        valueFmt: (v) => v + '%', labelEvery: 1,
      }),
      source: d.growth.source, year: d.growth.year, foot: 'Inflation-adjusted annual change; the 2020 contraction shows as −2.2%.',
    })}
    ${chartCard({
      title: 'What $1 of GDP buys',
      svg: hBarChart({
        rows: d.spendingShares.map((s) => ({ label: s.label, value: s.value, color: s.color })),
        valueFmt: (v) => v + '%', labelWidth: 160,
      }),
      source: d.spendingSrc.source, year: d.spendingSrc.year, foot: 'Expenditure shares of GDP; net exports subtract ≈3 points.',
    })}
  </div>
  <h2>Money and the state <span class="h2-note">debt, saving, defense</span></h2>
  ${factTable(d.fiscal)}
  ${notesBlock(d.notes)}`;
}

/* ---------- Employment ---------- */
export function employmentView() {
  const d = employment;
  return `
  ${pageHead('Section 3 · Jobs', 'Employment', d.lede)}
  ${kpiGrid(d.facts)}
  ${chartCard({
    title: 'Unemployment and participation',
    toggle: { id: 'jobs', options: [
      { key: 'u3', label: 'Unemployment rate', active: true },
      { key: 'lfp', label: 'Labor-force participation', active: false },
    ]},
    svg: lineChart({
      labels: d.unemployment.labels, values: d.unemployment.values, color: '#a63a2f',
      lastLabel: '4.0%', valueFmt: (v) => v + '%',
    }),
    source: d.unemployment.source, year: d.unemployment.year,
    foot: 'Annual averages; switch to participation to see the labor-force share.',
  })}
  <h2>Who employs America <span class="h2-note">payrolls by sector</span></h2>
  ${chartCard({
    title: 'Nonfarm jobs by major sector',
    svg: hBarChart({ rows: d.sectors, color: '#1f3a5f', valueFmt: (v) => v + 'M', labelWidth: 218 }),
    source: d.sectorsSrc.source, year: d.sectorsSrc.year,
    foot: '≈ monthly payroll employment; sectors shown cover most of the ~159M total.',
  })}
  ${notesBlock(d.notes)}`;
}

/* ---------- Prices ---------- */
export function pricesView() {
  const d = prices;
  return `
  ${pageHead('Section 4 · The price level', 'Prices', d.lede)}
  ${kpiGrid(d.facts)}
  ${chartCard({
    title: 'Inflation since 2015',
    toggle: { id: 'cpi', options: [
      { key: 'headline', label: 'All items (CPI)', active: true },
      { key: 'core', label: 'Core (ex food & energy)', active: false },
    ]},
    svg: lineChart({
      labels: d.cpi.labels, values: d.cpi.values, color: '#a63a2f', area: true,
      lastLabel: '2.9%', valueFmt: (v) => v + '%', baseline: 2,
    }),
    source: d.cpi.source, year: d.cpi.year,
    foot: 'Annual-average 12-month change in the Consumer Price Index.',
  })}
  <h2>Where prices bit hardest <span class="h2-note">cumulative change since 2020</span></h2>
  ${chartCard({
    title: 'Price change by category, Feb 2020 → 2025',
    svg: hBarChart({ rows: d.priceLevels, valueFmt: (v) => '+' + v + '%', labelWidth: 170 }),
    source: d.priceLevelsSrc.source, year: d.priceLevelsSrc.year,
    foot: '≈ cumulative CPI component increases; categories ordered by size.',
  })}
  ${callout('A basket that cost <strong>$100 in early 2020 costs about $125 in 2025</strong> — inflation’s cumulative legacy even after the rate cooled. <span class="src">BLS · 2025</span>')}
  ${notesBlock(d.notes)}`;
}

/* ---------- Trade ---------- */
export function tradeView() {
  const d = trade;
  return `
  ${pageHead('Section 5 · Borders', 'Trade', d.lede)}
  ${kpiGrid(d.facts)}
  ${chartCard({
    title: 'Exports vs imports, goods and services',
    svg: groupedBarChart({
      labels: d.flows.labels,
      series: [
        { name: 'Exports', values: d.flows.exports, color: '#1f3a5f' },
        { name: 'Imports', values: d.flows.imports, color: '#a63a2f' },
      ],
      valueFmt: (v) => '$' + v + 'T',
    }),
    source: d.flows.source, year: d.flows.year,
    foot: 'The gap between the bars is the deficit.',
  })}
  <div class="grid-2">
    ${chartCard({
      title: 'Trade deficit, $ billions',
      svg: barChart({
        labels: d.flows.labels, values: d.flows.deficit, color: '#a63a2f',
        valueFmt: (v) => '$' + v + 'B', labelEvery: 1,
      }),
      source: d.flows.source, year: d.flows.year, foot: 'Deficit narrowed in 2023, widened again in 2024.',
    })}
    ${chartCard({
      title: 'Top goods-trading partners',
      svg: hBarChart({
        rows: d.partners.map((p) => ({ label: p.label, value: p.value })),
        valueFmt: (v) => '$' + v + 'B', color: '#2e5d8a', labelWidth: 120,
      }),
      source: d.partnersSrc.source, year: d.partnersSrc.year, foot: 'Two-way goods trade; Mexico is now the largest partner.',
    })}
  </div>
  ${notesBlock(d.notes)}`;
}

/* ---------- Health ---------- */
export function healthView() {
  const d = health;
  return `
  ${pageHead('Section 6 · Well-being', 'Health', d.lede)}
  ${kpiGrid(d.facts)}
  <div class="grid-2">
    ${chartCard({
      title: 'Life expectancy at birth',
      svg: hBarChart({ rows: d.lifeBySex, valueFmt: (v) => v + ' yrs', labelWidth: 110 }),
      source: d.lifeSrc.source, year: d.lifeSrc.year,
      foot: 'A five-plus-year gap between women and men.',
    })}
    ${chartCard({
      title: 'Health spending, $ trillions',
      svg: barChart({
        labels: d.spendingSeries.labels, values: d.spendingSeries.values,
        color: '#3f7d5a', valueFmt: (v) => '$' + v + 'T', labelEvery: 1,
      }),
      source: d.spendingSeries.source, year: d.spendingSeries.year, foot: 'National health expenditure; ≈17.6% of GDP in 2023.',
    })}
  </div>
  <h2>Leading causes of death <span class="h2-note">thousands per year</span></h2>
  ${chartCard({
    title: 'Deaths by cause',
    svg: hBarChart({ rows: d.causes, color: '#a63a2f', valueFmt: (v) => v + 'k', labelWidth: 190 }),
    source: d.causesSrc.source, year: d.causesSrc.year,
    foot: 'Heart disease and cancer remain far ahead of every other cause.',
  })}
  ${notesBlock(d.notes)}`;
}

/* ---------- Education ---------- */
export function educationView() {
  const d = education;
  return `
  ${pageHead('Section 7 · Learning', 'Education', d.lede)}
  ${kpiGrid(d.facts)}
  <div class="grid-2">
    ${chartCard({
      title: 'Highest attainment, adults 25+',
      svg: hBarChart({ rows: d.attainment, valueFmt: (v) => v + '%', labelWidth: 178 }),
      source: d.attainmentSrc.source, year: d.attainmentSrc.year,
      foot: '≈ shares; “some college” includes associate degrees.',
    })}
    ${chartCard({
      title: 'PISA scores: U.S. vs OECD average',
      svg: groupedBarChart({
        labels: d.pisa.labels,
        series: [
          { name: 'United States', values: d.pisa.us, color: '#1f3a5f' },
          { name: 'OECD average', values: d.pisa.oecd, color: '#b98a2f' },
        ],
        valueFmt: (v) => String(v), labelEvery: 1,
      }),
      source: d.pisa.source, year: d.pisa.year,
      foot: 'Mean scores of 15-year-olds; U.S. leads in reading & science, trails in math.',
    })}
  </div>
  ${notesBlock(d.notes)}`;
}

/* ---------- 404 ---------- */
export function missingView(path) {
  return `
  ${pageHead('Not found', 'No such page', `Nothing lives at ${esc(path)} — pick a section below.`)}
  <div class="index-grid">${indexCards
    .map((c) => `<a class="index-card" href="#${c.path}"><div class="i-title">${esc(c.title)} →</div><div class="i-desc">${esc(c.desc)}</div></a>`)
    .join('')}</div>`;
}
