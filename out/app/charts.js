/* Hand-rolled SVG charts for The National Ledger. No chart library: each function
   returns an inline <svg> string with axes, gridlines and labels drawn from the data.
   Charts are responsive via viewBox (width 100%). */

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* Nice round step for axis ticks. */
function tickStep(range, target) {
  const rough = range / target;
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  for (const m of [1, 2, 2.5, 5, 10]) if (rough <= m * pow) return m * pow;
  return 10 * pow;
}

function fmtTick(v) {
  const a = Math.abs(v);
  if (a >= 1000) return v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (a >= 100) return v.toLocaleString('en-US', { maximumFractionDigits: 1 }).replace(/\.0$/, '');
  if (a >= 10) return v.toLocaleString('en-US', { maximumFractionDigits: 1 }).replace(/\.0$/, '');
  return v.toLocaleString('en-US', { maximumFractionDigits: 1 }).replace(/\.0$/, '');
}

/* Line/area chart.
   opts: { labels:[x], values:[y], unit:'%', color, area:true, ymin, ymax,
           labelEvery:n, valueFmt:(v)=>str, lastLabel:str, baseline:0 } */
export function lineChart(opts) {
  const {
    labels, values, unit = '', color = '#1f3a5f', area = false,
    labelEvery = Math.ceil(labels.length / 6), valueFmt = fmtTick,
    lastLabel = null, baseline = null, ymin = null, ymax = null, height = 300,
  } = opts;
  const W = 760, H = height, L = 52, R = lastLabel ? 66 : 18, T = 16, B = 34;
  const pw = W - L - R, ph = H - T - B;
  let lo = ymin !== null ? ymin : Math.min(...values);
  let hi = ymax !== null ? ymax : Math.max(...values);
  if (baseline !== null) { lo = Math.min(lo, baseline); hi = Math.max(hi, baseline); }
  const pad = (hi - lo) * 0.08 || 1;
  lo -= pad; hi += pad;
  const step = tickStep(hi - lo, 5);
  lo = Math.floor(lo / step) * step;
  hi = Math.ceil(hi / step) * step;
  const X = (i) => L + (labels.length === 1 ? pw / 2 : (i / (labels.length - 1)) * pw);
  const Y = (v) => T + ph - ((v - lo) / (hi - lo)) * ph;

  let g = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  // gridlines + y labels
  for (let v = lo; v <= hi + step / 2; v += step) {
    const y = Y(v).toFixed(1);
    g += `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="#e3dcc8" stroke-width="1"/>`;
    g += `<text class="ax" x="${L - 7}" y="${(+y + 4).toFixed(1)}" text-anchor="end">${esc(valueFmt(v))}</text>`;
  }
  // zero baseline emphasis
  if (lo < 0 && hi > 0) {
    const y = Y(0).toFixed(1);
    g += `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="#8a97a8" stroke-width="1.4"/>`;
  }
  // x labels
  labels.forEach((lab, i) => {
    if (i % labelEvery !== 0 && i !== labels.length - 1) return;
    g += `<text class="ax" x="${X(i).toFixed(1)}" y="${H - 12}" text-anchor="middle">${esc(lab)}</text>`;
  });
  // series path
  const pts = values.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
  if (area) {
    g += `<path d="M${L},${Y(lo).toFixed(1)} L${pts.join(' L')} L${X(values.length - 1).toFixed(1)},${Y(lo).toFixed(1)} Z" fill="${color}" opacity="0.10"/>`;
  }
  g += `<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`;
  values.forEach((v, i) => {
    if (i === 0 || i === values.length - 1 || v === Math.min(...values) || v === Math.max(...values))
      g += `<circle cx="${X(i).toFixed(1)}" cy="${Y(v).toFixed(1)}" r="3.4" fill="${color}"/>`;
  });
  // last value callout
  const lx = X(values.length - 1), ly = Y(values[values.length - 1]);
  if (lastLabel) {
    g += `<text class="axv" x="${lx + 8}" y="${ly + 4}" text-anchor="start">${esc(lastLabel)}</text>`;
  }
  g += `</svg>`;
  return g;
}

/* Two-series line chart (e.g. CPI vs core). */
export function multiLineChart(opts) {
  const {
    labels, series, // [{name, values, color}]
    labelEvery = Math.ceil(labels.length / 6), valueFmt = fmtTick, baseline = null, height = 300,
  } = opts;
  const W = 760, H = height, L = 52, R = 18, T = 30, B = 34;
  const pw = W - L - R, ph = H - T - B;
  const all = series.flatMap((s) => s.values);
  let lo = Math.min(...all), hi = Math.max(...all);
  if (baseline !== null) { lo = Math.min(lo, baseline); hi = Math.max(hi, baseline); }
  const pad = (hi - lo) * 0.08 || 1;
  const step = tickStep(hi - lo + pad, 5);
  lo = Math.floor((lo - pad) / step) * step;
  hi = Math.ceil((hi + pad) / step) * step;
  const X = (i) => L + (i / (labels.length - 1)) * pw;
  const Y = (v) => T + ph - ((v - lo) / (hi - lo)) * ph;

  let g = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  for (let v = lo; v <= hi + step / 2; v += step) {
    const y = Y(v).toFixed(1);
    g += `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="#e3dcc8" stroke-width="1"/>`;
    g += `<text class="ax" x="${L - 7}" y="${(+y + 4).toFixed(1)}" text-anchor="end">${esc(valueFmt(v))}</text>`;
  }
  if (lo < 0 && hi > 0) {
    const y = Y(0).toFixed(1);
    g += `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="#8a97a8" stroke-width="1.4"/>`;
  }
  labels.forEach((lab, i) => {
    if (i % labelEvery !== 0 && i !== labels.length - 1) return;
    g += `<text class="ax" x="${X(i).toFixed(1)}" y="${H - 12}" text-anchor="middle">${esc(lab)}</text>`;
  });
  // legend
  series.forEach((s, i) => {
    const x = L + i * 170;
    g += `<rect x="${x}" y="8" width="12" height="4" rx="2" fill="${s.color}"/>`;
    g += `<text class="ax" x="${x + 18}" y="14">${esc(s.name)}</text>`;
  });
  series.forEach((s) => {
    const pts = s.values.map((v, i) => `${X(i).toFixed(1)},${Y(v).toFixed(1)}`);
    g += `<polyline points="${pts.join(' ')}" fill="none" stroke="${s.color}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`;
    const li = s.values.length - 1;
    g += `<circle cx="${X(li).toFixed(1)}" cy="${Y(s.values[li]).toFixed(1)}" r="3.6" fill="${s.color}"/>`;
    if (s.lastLabel) g += `<text class="axv" x="${X(li) + 7}" y="${Y(s.values[li]) + 4}" text-anchor="start">${esc(s.lastLabel)}</text>`;
  });
  g += `</svg>`;
  return g;
}

/* Vertical bar chart. bars:[{label, value, color?}] or labels+values.
   opts: { labels, values, valueFmt, color, labelEvery, showValues:true, baseline:0, highlight:index } */
export function barChart(opts) {
  const {
    labels, values, valueFmt = fmtTick, color = '#1f3a5f',
    labelEvery = Math.ceil(labels.length / 8), showValues = true,
    highlight = -1, height = 300, rotateLabels = false,
  } = opts;
  const W = 760, H = height, L = 50, R = 14, T = 24, B = rotateLabels ? 66 : 34;
  const pw = W - L - R, ph = H - T - B;
  let lo = Math.min(0, ...values), hi = Math.max(0, ...values);
  const pad = (hi - lo) * 0.1 || 1;
  const step = tickStep(hi - lo + pad, 5);
  lo = Math.floor(lo / step) * step;
  hi = Math.ceil((hi + pad) / step) * step;
  const n = values.length;
  const slot = pw / n, bw = Math.min(slot * 0.66, 46);
  const X = (i) => L + i * slot + (slot - bw) / 2;
  const Y = (v) => T + ph - ((v - lo) / (hi - lo)) * ph;

  let g = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  for (let v = lo; v <= hi + step / 2; v += step) {
    const y = Y(v).toFixed(1);
    g += `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="${v === 0 ? '#8a97a8' : '#e3dcc8'}" stroke-width="${v === 0 ? 1.4 : 1}"/>`;
    g += `<text class="ax" x="${L - 7}" y="${(+y + 4).toFixed(1)}" text-anchor="end">${esc(valueFmt(v))}</text>`;
  }
  values.forEach((v, i) => {
    const c = opts.colors?.[i] ?? (i === highlight ? '#a63a2f' : color);
    const x = X(i).toFixed(1), y0 = Y(Math.max(0, v)), y1 = Y(Math.min(0, v));
    const h = Math.max(1.5, y1 - y0);
    g += `<rect x="${x}" y="${y0.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${c}"/>`;
    if (showValues) {
      const vy = v >= 0 ? y0 - 5 : y1 + 13;
      g += `<text class="axv" x="${(X(i) + bw / 2).toFixed(1)}" y="${vy.toFixed(1)}" text-anchor="middle" font-size="11">${esc(valueFmt(v))}</text>`;
    }
    const lx = X(i) + bw / 2;
    if (i % labelEvery === 0 || i === n - 1) {
      if (rotateLabels) {
        g += `<text class="ax" x="${lx.toFixed(1)}" y="${H - B + 14}" text-anchor="end" transform="rotate(-38 ${lx.toFixed(1)} ${H - B + 14})">${esc(labels[i])}</text>`;
      } else {
        g += `<text class="ax" x="${lx.toFixed(1)}" y="${H - 12}" text-anchor="middle">${esc(labels[i])}</text>`;
      }
    }
  });
  g += `</svg>`;
  return g;
}

/* Horizontal bar chart — good for ranked names.
   rows: [{label, value, display?, color?}]; opts {unit, valueFmt, note} */
export function hBarChart(opts) {
  const { rows, valueFmt = fmtTick, color = '#1f3a5f', labelWidth = 170, height = null } = opts;
  const W = 760, rowH = 34, T = 8, B = 30, L = labelWidth, R = 74;
  const H = height ?? T + B + rows.length * rowH;
  const pw = W - L - R;
  const hi = Math.max(...rows.map((r) => r.value)) * 1.02;
  const step = tickStep(hi, 4);
  const maxTick = Math.ceil(hi / step) * step;
  const X = (v) => L + (v / maxTick) * pw;

  let g = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  for (let v = 0; v <= maxTick + step / 2; v += step) {
    const x = X(v).toFixed(1);
    g += `<line x1="${x}" y1="${T}" x2="${x}" y2="${H - B}" stroke="#e3dcc8" stroke-width="1"/>`;
    g += `<text class="ax" x="${x}" y="${H - 12}" text-anchor="middle">${esc(valueFmt(v))}</text>`;
  }
  rows.forEach((r, i) => {
    const y = T + i * rowH + 5;
    const w = Math.max(2, X(r.value) - L);
    const c = r.color ?? color;
    g += `<text class="ax" x="${L - 10}" y="${y + 15}" text-anchor="end">${esc(r.label)}</text>`;
    g += `<rect x="${L}" y="${y}" width="${w.toFixed(1)}" height="${rowH - 12}" rx="3" fill="${c}"/>`;
    g += `<text class="axv" x="${(L + w + 8).toFixed(1)}" y="${y + 15}">${esc(r.display ?? valueFmt(r.value))}</text>`;
  });
  g += `</svg>`;
  return g;
}

/* Grouped bars (two series side by side). series:[{name,values,color}] sharing labels. */
export function groupedBarChart(opts) {
  const { labels, series, valueFmt = fmtTick, labelEvery = 1, height = 300 } = opts;
  const W = 760, H = height, L = 54, R = 14, T = 30, B = 34;
  const pw = W - L - R, ph = H - T - B;
  const all = series.flatMap((s) => s.values);
  let lo = Math.min(0, ...all), hi = Math.max(0, ...all);
  const step = tickStep(hi - lo, 5);
  lo = Math.floor(lo / step) * step;
  hi = Math.ceil(hi / step) * step;
  const n = labels.length, slot = pw / n, bw = (slot * 0.72) / series.length;
  const Y = (v) => T + ph - ((v - lo) / (hi - lo)) * ph;

  let g = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  series.forEach((s, i) => {
    const x = L + i * 190;
    g += `<rect x="${x}" y="8" width="11" height="11" rx="2" fill="${s.color}"/>`;
    g += `<text class="ax" x="${x + 16}" y="17">${esc(s.name)}</text>`;
  });
  for (let v = lo; v <= hi + step / 2; v += step) {
    const y = Y(v).toFixed(1);
    g += `<line x1="${L}" y1="${y}" x2="${W - R}" y2="${y}" stroke="${v === 0 ? '#8a97a8' : '#e3dcc8'}" stroke-width="${v === 0 ? 1.4 : 1}"/>`;
    g += `<text class="ax" x="${L - 7}" y="${(+y + 4).toFixed(1)}" text-anchor="end">${esc(valueFmt(v))}</text>`;
  }
  labels.forEach((lab, i) => {
    const gx = L + i * slot + slot * 0.14;
    series.forEach((s, j) => {
      const v = s.values[i];
      const x = gx + j * bw;
      const y0 = Y(Math.max(0, v)), y1 = Y(Math.min(0, v));
      g += `<rect x="${x.toFixed(1)}" y="${y0.toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="${Math.max(1.5, y1 - y0).toFixed(1)}" rx="2" fill="${s.color}"/>`;
    });
    if (i % labelEvery === 0)
      g += `<text class="ax" x="${(L + i * slot + slot / 2).toFixed(1)}" y="${H - 12}" text-anchor="middle">${esc(lab)}</text>`;
  });
  g += `</svg>`;
  return g;
}

/* Donut chart with legend handled in HTML.
   parts: [{label, value, color}] — returns svg; percentages computed here. */
export function donutChart(parts, opts = {}) {
  const { size = 240, hole = 0.62 } = opts;
  const total = parts.reduce((a, p) => a + p.value, 0);
  const cx = size / 2, cy = size / 2, r = size / 2 - 8;
  const C = 2 * Math.PI * r;
  let acc = 0;
  let g = `<svg viewBox="0 0 ${size} ${size}" role="img">`;
  parts.forEach((p) => {
    const frac = p.value / total;
    const dash = frac * C;
    const rot = (acc / total) * 360 - 90;
    g += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${p.color}" stroke-width="${r * (1 - hole)}" stroke-dasharray="${dash.toFixed(2)} ${(C - dash).toFixed(2)}" transform="rotate(${rot.toFixed(2)} ${cx} ${cy})"/>`;
    acc += p.value;
  });
  const ir = r * hole - 4;
  if (opts.centerTop || opts.centerBottom) {
    g += `<text class="big" x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="${ir * 0.52}">${esc(opts.centerTop ?? '')}</text>`;
    g += `<text class="ax" x="${cx}" y="${cy + ir * 0.42}" text-anchor="middle">${esc(opts.centerBottom ?? '')}</text>`;
  }
  g += `</svg>`;
  return g;
}

/* HTML helpers for chart decorations */
export function legend(parts) {
  return `<div class="legend">${parts
    .map((p) => `<span><span class="sw" style="background:${p.color}"></span>${esc(p.label)} <b>${esc(p.display ?? p.value + '%')}</b></span>`)
    .join('')}</div>`;
}
