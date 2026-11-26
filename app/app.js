/* The National Ledger — router, nav and live controls.
   Hash routes: #/ (overview) and one route per section in data.js NAV.
   window.__shotReady is false while a page renders and true once on screen,
   so a screenshot script knows when to capture. */

import { NAV, employment, prices } from './data.js';
import { lineChart } from './charts.js';
import { overviewView, populationView, economyView, employmentView, pricesView, tradeView, healthView, educationView, missingView } from './views.js';

const app = document.getElementById('app');
const nav = document.getElementById('nav');

nav.innerHTML = NAV.map(
  (n, i) => `<a href="#${n.path}" data-path="${n.path}">${i === 0 ? '' : '<span class="dot">◆</span>'}${n.name}</a>`,
).join('');

const ROUTES = {
  '/': ['The National Ledger — United States in figures', overviewView],
  '/population': ['Population', populationView],
  '/economy': ['Economy', economyView],
  '/employment': ['Employment', employmentView],
  '/prices': ['Prices', pricesView],
  '/trade': ['Trade', tradeView],
  '/health': ['Health', healthView],
  '/education': ['Education', educationView],
};

/* Live chart toggles: swap the SVG inside a chart card. */
const TOGGLE_CHARTS = {
  jobs: {
    u3: () =>
      lineChart({
        labels: employment.unemployment.labels, values: employment.unemployment.values,
        color: '#a63a2f', lastLabel: '4.0%', valueFmt: (v) => v + '%',
      }),
    lfp: () =>
      lineChart({
        labels: employment.participation.labels, values: employment.participation.values,
        color: '#2e5d8a', lastLabel: '62.5%', valueFmt: (v) => v + '%', ymin: 55,
      }),
  },
  cpi: {
    headline: () =>
      lineChart({
        labels: prices.cpi.labels, values: prices.cpi.values, color: '#a63a2f', area: true,
        lastLabel: '2.9%', valueFmt: (v) => v + '%', baseline: 2,
      }),
    core: () =>
      lineChart({
        labels: prices.core.labels, values: prices.core.values, color: '#b98a2f', area: true,
        lastLabel: '3.3%', valueFmt: (v) => v + '%', baseline: 2,
      }),
  },
};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-toggle]');
  if (!btn) return;
  const group = btn.dataset.toggle;
  const wrap = document.getElementById('chart-' + group);
  const draw = TOGGLE_CHARTS[group]?.[btn.dataset.key];
  if (!wrap || !draw) return;
  wrap.innerHTML = draw();
  btn.parentElement.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
});

function render() {
  window.__shotReady = false;
  const path = (location.hash.replace(/^#/, '') || '/').replace(/\/$/, '') || '/';
  const route = ROUTES[path];
  document.title = route ? `${route[0]} | The National Ledger` : 'Not found | The National Ledger';
  app.innerHTML = route ? route[1]() : missingView(path);
  nav.querySelectorAll('a').forEach((a) => {
    if (a.dataset.path === path) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
