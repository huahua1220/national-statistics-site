/* Reusable page components for The National Ledger: KPI cards, fact tables,
   chart cards (with optional working series toggle), notes and source chips. */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const srcChip = (source, year) => `<span class="src">${esc(source)} · ${esc(year)}</span>`;

/* A KPI stat card. fact: {label, value, unit?, sub?, source, year, tone?} */
export function kpiCard(f) {
  const unit = f.unit ? `<small> ${esc(f.unit)}</small>` : '';
  const sub = f.sub ? `<div class="k-sub">${esc(f.sub)}</div>` : '';
  return `<div class="kpi ${f.tone ?? ''}">
    <div class="k-label">${esc(f.label)}</div>
    <div class="k-value">${esc(f.value)}${unit}</div>
    ${sub}
    <div class="k-sub">${srcChip(f.source, f.year)}</div>
  </div>`;
}

export function kpiGrid(facts) {
  return `<div class="kpi-grid">${facts.map(kpiCard).join('')}</div>`;
}

/* Chart card: title + note + svg + source footer.
   opts: {title, note, svg, source, year, foot, toggle: {id, options:[{key,label,active}]}} */
export function chartCard(opts) {
  const seg = opts.toggle
    ? `<span class="seg" role="group" aria-label="Series">` +
      opts.toggle.options
        .map((o) => `<button type="button" data-toggle="${esc(opts.toggle.id)}" data-key="${esc(o.key)}" aria-pressed="${o.active ? 'true' : 'false'}">${esc(o.label)}</button>`)
        .join('') +
      `</span>`
    : '';
  return `<section class="card">
    <div class="card-head"><h3>${esc(opts.title)}</h3>${seg}${opts.note ? `<span class="card-note">${esc(opts.note)}</span>` : ''}</div>
    <div class="chart-wrap" ${opts.toggle ? `id="chart-${esc(opts.toggle.id)}"` : ''}>${opts.svg}</div>
    ${opts.legendHtml ?? ''}
    <div class="chart-foot"><span>${opts.foot ? esc(opts.foot) : ''}</span><span>${srcChip(opts.source, opts.year)}</span></div>
  </section>`;
}

/* Fact table: rows of {label, value, sub?, source, year} */
export function factTable(facts, heading = 'Indicator') {
  return `<div class="tbl-wrap"><table class="tbl">
    <thead><tr><th>${esc(heading)}</th><th class="num">Latest</th><th>Source</th></tr></thead>
    <tbody>${facts
      .map(
        (f) => `<tr><td>${esc(f.label)}${f.sub ? `<span class="row-note">${esc(f.sub)}</span>` : ''}</td>
        <td class="num"><strong>${esc(f.value)}</strong>${f.unit ? ' ' + esc(f.unit) : ''}</td>
        <td>${srcChip(f.source, f.year)}</td></tr>`,
      )
      .join('')}</tbody></table></div>`;
}

/* Bullet “reading the numbers” notes */
export function notesBlock(notes) {
  return `<div class="card"><div class="card-head"><h3>Reading the numbers</h3></div>
    <div class="prose"><ul>${notes.map((n) => `<li>${n}</li>`).join('')}</ul></div></section></div>`;
}

/* Page header block */
export function pageHead(kicker, title, lede) {
  return `<p class="kicker">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lede">${esc(lede)}</p>`;
}

export function callout(html) {
  return `<div class="callout">${html}</div>`;
}
