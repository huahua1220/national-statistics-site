/* The National Ledger — all site content.
   Every figure is a real, published reading and carries its source and year.
   Shapes:
     fact  = { label, value, unit?, sub?, source, year }
     series = { labels:[years], values:[numbers], unit, source, year } */

export const NAV = [
  { path: '/', name: 'Overview' },
  { path: '/population', name: 'Population' },
  { path: '/economy', name: 'Economy' },
  { path: '/employment', name: 'Employment' },
  { path: '/prices', name: 'Prices' },
  { path: '/trade', name: 'Trade' },
  { path: '/health', name: 'Health' },
  { path: '/education', name: 'Education' },
];

/* ---------------- Overview ---------------- */

export const headline = [
  { label: 'Population', value: '340.1', unit: 'million', sub: 'July 1, 2024 estimate', source: 'U.S. Census Bureau', year: 2024, tone: 'c-blue' },
  { label: 'GDP (nominal)', value: '$29.2', unit: 'trillion', sub: 'full year', source: 'BEA', year: 2024, tone: 'c-navy' },
  { label: 'Real GDP growth', value: '+2.8', unit: '%', sub: 'annual change', source: 'BEA', year: 2024, tone: 'c-green' },
  { label: 'Unemployment (U-3)', value: '4.3', unit: '%', sub: 'August 2025', source: 'BLS', year: 2025, tone: 'c-red' },
  { label: 'CPI inflation', value: '3.0', unit: '%', sub: '12-mo change, Sep 2025', source: 'BLS', year: 2025, tone: 'c-gold' },
  { label: 'Median household income', value: '$83,730', sub: 'real terms', source: 'U.S. Census Bureau', year: 2024, tone: '' },
];

export const indexCards = [
  { path: '/population', title: 'Population', stat: '340.1M', desc: 'Size, growth, age structure, largest states and cities, origins.' },
  { path: '/economy', title: 'Economy', stat: '$29.2T', desc: 'GDP level and growth, what the output buys, debt and incomes.' },
  { path: '/employment', title: 'Employment', stat: '4.3%', desc: 'Unemployment, payrolls, participation, earnings and sectors.' },
  { path: '/prices', title: 'Prices', stat: '3.0%', desc: 'CPI and core inflation, price levels, what the Fed targets.' },
  { path: '/trade', title: 'Trade', stat: '−$918B', desc: 'Exports and imports, the deficit and the top partners.' },
  { path: '/health', title: 'Health', stat: '78.4 yrs', desc: 'Life expectancy, causes of death, spending and coverage.' },
  { path: '/education', title: 'Education', stat: '36.2%', desc: 'Attainment, enrollment, test scores, costs and student debt.' },
];

/* ---------------- Population ---------------- */

export const population = {
  lede: 'The United States is the world’s third-most-populous country. Growth has been running near 1% a year, lately driven mostly by immigration as births slow and the population ages.',
  facts: [
    { label: 'Total population', value: '340.1M', sub: 'resident estimate, July 1', source: 'U.S. Census Bureau', year: 2024 },
    { label: 'Annual growth', value: '+1.0%', sub: '≈3.3M added 2023→24', source: 'U.S. Census Bureau', year: 2024 },
    { label: 'Median age', value: '38.9 yrs', source: 'U.S. Census Bureau', year: 2023 },
    { label: 'Foreign-born share', value: '14.3%', sub: '≈47.8M people', source: 'U.S. Census Bureau (ACS)', year: 2023 },
    { label: 'Households', value: '132.2M', sub: '≈2.5 persons each', source: 'U.S. Census Bureau', year: 2024 },
    { label: 'Urban population', value: '80.0%', source: 'U.S. Census Bureau', year: 2020 },
  ],
  history: {
    labels: ['1960', '1970', '1980', '1990', '2000', '2010', '2020', '2024'],
    values: [180.7, 205.1, 227.7, 249.6, 282.2, 309.3, 331.5, 340.1],
    unit: 'M', source: 'U.S. Census Bureau', year: 2024,
    title: 'Resident population, millions',
  },
  states: [
    { label: 'California', value: 39.4 }, { label: 'Texas', value: 31.3 },
    { label: 'Florida', value: 23.4 }, { label: 'New York', value: 19.9 },
    { label: 'Pennsylvania', value: 13.1 }, { label: 'Illinois', value: 12.7 },
    { label: 'Ohio', value: 11.9 }, { label: 'Georgia', value: 11.2 },
    { label: 'North Carolina', value: 11.0 }, { label: 'Michigan', value: 10.1 },
  ],
  statesSrc: { source: 'U.S. Census Bureau', year: 2024, unit: 'M residents' },
  ages: [
    { label: 'Under 18', value: 21.7, color: '#2e5d8a' },
    { label: '18–64', value: 60.6, color: '#1f3a5f' },
    { label: '65 and over', value: 17.7, color: '#a63a2f' },
  ],
  agesSrc: { source: 'U.S. Census Bureau', year: 2023 },
  composition: [
    { label: 'White (non-Hispanic)', value: 57.8, color: '#1f3a5f' },
    { label: 'Hispanic or Latino', value: 18.7, color: '#a63a2f' },
    { label: 'Black (non-Hispanic)', value: 12.1, color: '#2e5d8a' },
    { label: 'Asian (non-Hispanic)', value: 5.9, color: '#b98a2f' },
    { label: 'Multiracial & other', value: 5.5, color: '#6e7b6b' },
  ],
  compositionSrc: { source: 'U.S. Census Bureau, decennial census', year: 2020 },
  cities: [
    { label: 'New York City', value: 8.48 }, { label: 'Los Angeles', value: 3.88 },
    { label: 'Chicago', value: 2.72 }, { label: 'Houston', value: 2.39 },
    { label: 'Phoenix', value: 1.67 }, { label: 'Philadelphia', value: 1.57 },
    { label: 'San Antonio', value: 1.53 }, { label: 'San Diego', value: 1.40 },
  ],
  citiesSrc: { source: 'U.S. Census Bureau', year: 2024, unit: 'M residents' },
  notes: [
    'Population growth rebounded to about <strong>1.0% in 2024</strong>, the fastest since 2001 — net international migration of roughly 2.8M did most of the work as natural increase (births minus deaths) stayed small (Census Bureau, 2024).',
    'The country is aging: the 65-and-over share has climbed from about 13% in 2010 to roughly <strong>18% in 2023</strong>, and the median age is near 39 (Census Bureau).',
    'Texas (+563k) and Florida (+467k) added the most residents in 2024; Texas, Florida and North Carolina are the fastest-growing large states (Census Bureau, 2024).',
  ],
};

/* ---------------- Economy ---------------- */

export const economy = {
  lede: 'The U.S. is the world’s largest economy at market exchange rates: about $29 trillion of output in 2024, roughly $86,000 per person, growing around 2–3% a year in real terms.',
  facts: [
    { label: 'GDP (nominal)', value: '$29.18T', source: 'BEA', year: 2024 },
    { label: 'Real GDP growth', value: '+2.8%', source: 'BEA', year: 2024 },
    { label: 'GDP per capita', value: '≈$85,800', source: 'BEA / Census est.', year: 2024 },
    { label: 'Median household income', value: '$83,730', sub: 'real terms', source: 'U.S. Census Bureau', year: 2024 },
    { label: 'Official poverty rate', value: '10.6%', source: 'U.S. Census Bureau', year: 2024 },
    { label: 'Federal funds target', value: '3.75–4.00%', sub: 'upper/lower bound', source: 'Federal Reserve', year: 2025 },
  ],
  gdp: {
    labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    values: [10.25, 10.58, 10.94, 11.46, 12.22, 13.04, 13.82, 14.47, 14.77, 14.48, 15.05, 15.60, 16.25, 16.88, 17.61, 18.30, 18.80, 19.61, 20.66, 21.54, 21.35, 23.68, 26.01, 27.72, 29.18],
    unit: '$T', source: 'BEA', year: 2024, title: 'Gross domestic product, $ trillions (nominal)',
  },
  growth: {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    values: [2.9, 1.8, 2.5, 3.0, 2.6, -2.2, 6.1, 2.5, 2.9, 2.8],
    unit: '%', source: 'BEA', year: 2024, title: 'Real GDP growth, annual % change',
  },
  spendingShares: [
    { label: 'Consumer spending', value: 68, color: '#1f3a5f' },
    { label: 'Business investment', value: 18, color: '#2e5d8a' },
    { label: 'Government', value: 17, color: '#b98a2f' },
    { label: 'Net exports', value: -3, color: '#a63a2f' },
  ],
  spendingSrc: { source: 'BEA', year: 2024, note: 'share of GDP, ≈%' },
  fiscal: [
    { label: 'Gross federal debt', value: '≈$36T', sub: 'about 122% of GDP', source: 'U.S. Treasury', year: 2025 },
    { label: 'Debt held by the public', value: '≈100%', sub: 'of GDP', source: 'CBO', year: 2025 },
    { label: 'Personal saving rate', value: '4.5%', sub: 'of disposable income', source: 'BEA', year: 2025 },
    { label: 'Military expenditure', value: '≈$997B', sub: '≈3.4% of GDP', source: 'SIPRI', year: 2024 },
  ],
  notes: [
    'Growth has been steady since the pandemic rebound: <strong>2.9% in 2023 and 2.8% in 2024</strong>, with consumer spending doing most of the lifting (BEA).',
    'Per-person output of about <strong>$85,800</strong> puts the U.S. among the richest large economies; only smaller financial and resource hubs rank higher on IMF tables.',
    'Households drive the economy: consumer spending is about <strong>68% of GDP</strong>, while the trade sector subtracts roughly 3 points because imports exceed exports (BEA, 2024).',
  ],
};

/* ---------------- Employment ---------------- */

export const employment = {
  lede: 'About 160 million Americans hold nonfarm payroll jobs. Unemployment has stayed low by post-war standards — near 4% — after the sharpest spike (and recovery) on record in 2020–21.',
  facts: [
    { label: 'Unemployment (U-3)', value: '4.3%', sub: 'August 2025', source: 'BLS', year: 2025 },
    { label: 'Nonfarm payrolls', value: '159.5M', sub: 'December 2024', source: 'BLS', year: 2024 },
    { label: 'Labor-force participation', value: '62.5%', sub: 'of adults 16+', source: 'BLS', year: 2025 },
    { label: 'Avg hourly earnings', value: '$35.69', sub: 'private nonfarm, Dec 2024', source: 'BLS', year: 2024 },
    { label: 'Job openings', value: '7.7M', sub: 'JOLTS, August 2025', source: 'BLS', year: 2025 },
    { label: 'Union membership', value: '9.9%', sub: 'of wage & salary workers', source: 'BLS', year: 2024 },
  ],
  unemployment: {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    values: [5.3, 4.9, 4.4, 3.9, 3.7, 8.1, 5.3, 3.6, 3.6, 4.0],
    unit: '%', source: 'BLS', year: 2024, title: 'Unemployment rate, annual average',
  },
  participation: {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    values: [62.7, 62.8, 62.9, 62.9, 63.1, 61.7, 61.7, 62.2, 62.6, 62.5],
    unit: '%', source: 'BLS', year: 2024, title: 'Labor-force participation, annual average',
  },
  sectors: [
    { label: 'Health care & social assistance', value: 23.4 },
    { label: 'Government (all levels)', value: 23.5 },
    { label: 'Professional & business services', value: 22.9 },
    { label: 'Leisure & hospitality', value: 16.9 },
    { label: 'Retail trade', value: 15.6 },
    { label: 'Manufacturing', value: 12.9 },
    { label: 'Financial activities', value: 9.2 },
    { label: 'Construction', value: 8.3 },
    { label: 'Transportation & warehousing', value: 6.6 },
  ],
  sectorsSrc: { source: 'BLS', year: 2024, unit: 'M jobs (≈)' },
  notes: [
    'The 2020 spike to an annual average of <strong>8.1%</strong> — and a monthly peak near 14.7% in April 2020 — was the steepest since the Great Depression; the rate was back near 3.6% by 2022–23 (BLS).',
    'Health care has been the standout jobs engine of the 2020s, now rivaling government as the largest employer block at about <strong>23 million jobs</strong> (BLS, 2024).',
    'Participation near <strong>62–63%</strong> remains below its 2000 peak of 67.3%, mostly because the workforce is aging into retirement (BLS).',
  ],
};

/* ---------------- Prices ---------------- */

export const prices = {
  lede: 'Inflation ran above 8% in 2022 — a four-decade high — and has since cooled to about 3%. The price level, though, keeps rising: the 2020 basket costs roughly a quarter more today.',
  facts: [
    { label: 'CPI inflation (all items)', value: '3.0%', sub: '12-mo, Sep 2025', source: 'BLS', year: 2025 },
    { label: 'Core CPI (ex food & energy)', value: '3.0%', sub: '12-mo, Sep 2025', source: 'BLS', year: 2025 },
    { label: 'CPI-U index level', value: '313.7', sub: '1982–84 = 100, annual avg', source: 'BLS', year: 2024 },
    { label: 'PCE inflation (Fed gauge)', value: '≈2.8%', sub: '12-mo', source: 'BEA', year: 2025 },
    { label: 'Fed target', value: '2%', sub: 'PCE inflation, long-run', source: 'Federal Reserve', year: 2025 },
    { label: 'Fed funds target', value: '3.75–4.00%', source: 'Federal Reserve', year: 2025 },
  ],
  cpi: {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    values: [0.1, 1.3, 2.1, 2.4, 1.8, 1.2, 4.7, 8.0, 4.1, 2.9],
    unit: '%', source: 'BLS', year: 2024, title: 'CPI-U inflation, 12-month change (annual average)',
  },
  core: {
    labels: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'],
    values: [1.8, 2.2, 1.8, 2.1, 2.2, 1.7, 3.6, 6.2, 4.8, 3.3],
    unit: '%', source: 'BLS', year: 2024, title: 'Core CPI, 12-month change (annual average)',
  },
  priceLevels: [
    { label: 'Shelter', value: 27, color: '#a63a2f' },
    { label: 'Food at home', value: 26, color: '#b98a2f' },
    { label: 'All items (CPI)', value: 24, color: '#1f3a5f' },
    { label: 'New vehicles', value: 21, color: '#2e5d8a' },
    { label: 'Motor fuel', value: 18, color: '#6e7b6b' },
    { label: 'Apparel', value: 7, color: '#6e4a72' },
    { label: 'Medical care services', value: 12, color: '#3f7d5a' },
  ],
  priceLevelsSrc: { source: 'BLS (CPI, ≈ cumulative)', year: '2020→2025' },
  notes: [
    'The 2022 peak of <strong>8.0%</strong> (annual) — 9.1% year-over-year in June 2022 — was the fastest inflation since 1981, driven by energy, supply chains and post-pandemic demand (BLS).',
    'Cumulative bite: what cost <strong>$100 in early 2020 costs about $125 in 2025</strong>. Shelter and groceries rose faster than the headline; apparel far slower (BLS CPI).',
    'The Fed targets <strong>2% PCE inflation</strong> and raised its policy rate to 5.25–5.50% by mid-2023 before easing to 3.75–4.00% in late 2025 as price growth cooled (Federal Reserve).',
  ],
};

/* ---------------- Trade ---------------- */

export const trade = {
  lede: 'The U.S. runs the world’s largest goods-and-services trade deficit — about $918 billion in 2024 — importing roughly $4.1 trillion while exporting $3.2 trillion.',
  facts: [
    { label: 'Exports (goods & services)', value: '$3.19T', source: 'BEA / Census', year: 2024 },
    { label: 'Imports (goods & services)', value: '$4.11T', source: 'BEA / Census', year: 2024 },
    { label: 'Trade balance', value: '−$918B', sub: 'deficit', source: 'BEA / Census', year: 2024 },
    { label: 'Goods exports', value: '$2.08T', source: 'BEA / Census', year: 2024 },
    { label: 'Services exports', value: '$1.11T', source: 'BEA / Census', year: 2024 },
    { label: 'Trade as share of GDP', value: '≈25%', sub: 'exports + imports', source: 'BEA', year: 2024 },
  ],
  flows: {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    exports: [2.53, 2.13, 2.56, 3.01, 3.05, 3.19],
    imports: [3.11, 2.81, 3.40, 3.96, 3.83, 4.11],
    deficit: [578, 679, 845, 951, 773, 918],
    source: 'BEA / Census', year: 2024,
  },
  partners: [
    { label: 'Mexico', value: 840 },
    { label: 'Canada', value: 762 },
    { label: 'China', value: 582 },
    { label: 'Germany', value: 236 },
    { label: 'Japan', value: 228 },
    { label: 'United Kingdom', value: 148 },
  ],
  partnersSrc: { source: 'U.S. Census Bureau', year: 2024, unit: '$B two-way goods trade (≈)' },
  notes: [
    'Mexico passed China in 2023 to become America’s largest goods-trading partner; with Canada the two USMCA neighbors account for about <strong>30% of U.S. goods trade</strong> (Census, 2024).',
    'The deficit is concentrated in goods: the 2024 goods gap was about <strong>$1.2 trillion</strong>, partly offset by a services surplus near $300B from finance, tech and travel (BEA).',
    'Largest bilateral goods deficits: China (≈$295B) and Mexico (≈$172B) in 2024 (Census Bureau).',
  ],
};

/* ---------------- Health ---------------- */

export const health = {
  lede: 'Americans live about 78 years on average and the country spends far more on health than any peer — nearly a fifth of GDP — with coverage reaching about 92% of the population.',
  facts: [
    { label: 'Life expectancy at birth', value: '78.4 yrs', source: 'CDC / NCHS', year: 2023 },
    { label: 'National health spending', value: '$4.9T', sub: '$14,570 per person', source: 'CMS', year: 2023 },
    { label: 'Health share of GDP', value: '17.6%', source: 'CMS', year: 2023 },
    { label: 'Uninsured', value: '≈8%', source: 'U.S. Census Bureau', year: 2024 },
    { label: 'Adult obesity', value: '40.3%', sub: 'adults 20+', source: 'CDC / NHANES', year: '2021–23' },
    { label: 'Infant mortality', value: '5.6', sub: 'per 1,000 live births', source: 'CDC / NCHS', year: 2023 },
  ],
  lifeBySex: [
    { label: 'Women', value: 81.1, color: '#a63a2f' },
    { label: 'Both sexes', value: 78.4, color: '#1f3a5f' },
    { label: 'Men', value: 75.8, color: '#2e5d8a' },
  ],
  lifeSrc: { source: 'CDC / NCHS', year: 2023, unit: 'years' },
  spendingSeries: {
    labels: ['2016', '2018', '2020', '2022', '2023'],
    values: [3.6, 3.8, 4.3, 4.7, 4.9],
    source: 'CMS', year: 2023,
  },
  causes: [
    { label: 'Heart disease', value: 681 },
    { label: 'Cancer', value: 613 },
    { label: 'Unintentional injuries', value: 223 },
    { label: 'Stroke', value: 163 },
    { label: 'Chronic lower respiratory', value: 145 },
    { label: 'Alzheimer’s disease', value: 114 },
    { label: 'Diabetes', value: 95 },
    { label: 'COVID-19', value: 50 },
  ],
  causesSrc: { source: 'CDC / NCHS', year: 2023, unit: 'thousand deaths (≈)' },
  notes: [
    'Life expectancy rebounded to <strong>78.4 in 2023</strong> after falling to 76.4 in 2021 during COVID-19 — still below most wealthy peers, which cluster near 82–84 (CDC).',
    'Heart disease and cancer together cause about <strong>1.3 million deaths a year</strong> — more than the next six causes combined (CDC, 2023).',
    'Health care absorbs <strong>17.6% of GDP</strong> — by far the largest share among rich nations — and Medicare covers roughly 68 million people (CMS).',
  ],
};

/* ---------------- Education ---------------- */

export const education = {
  lede: 'Over a third of U.S. adults hold a bachelor’s degree, almost all children complete secondary schooling, and the system spends more per pupil than nearly any other country.',
  facts: [
    { label: 'Bachelor’s degree or higher', value: '36.2%', sub: 'adults 25+', source: 'U.S. Census Bureau', year: 2023 },
    { label: 'High school completion', value: '≈91%', sub: 'adults 25+', source: 'U.S. Census Bureau', year: 2023 },
    { label: 'Public K-12 enrollment', value: '49.6M', source: 'NCES', year: 2023 },
    { label: 'College enrollment', value: '19.4M', source: 'NCES', year: 2023 },
    { label: 'Spending per public pupil', value: '≈$16,300', sub: 'current expenditure/yr', source: 'NCES', year: 2022 },
    { label: 'Federal student loans', value: '$1.6T', sub: '≈43M borrowers', source: 'Dept. of Education / Fed', year: 2025 },
  ],
  attainment: [
    { label: 'Graduate / professional', value: 14, color: '#a63a2f' },
    { label: 'Bachelor’s', value: 22, color: '#1f3a5f' },
    { label: 'Some college / associate', value: 28, color: '#2e5d8a' },
    { label: 'High school diploma', value: 26, color: '#b98a2f' },
    { label: 'Less than high school', value: 10, color: '#6e7b6b' },
  ],
  attainmentSrc: { source: 'U.S. Census Bureau (ACS, ≈%)', year: 2023 },
  pisa: {
    labels: ['Math', 'Reading', 'Science'],
    us: [465, 504, 499],
    oecd: [472, 476, 485],
    source: 'OECD PISA', year: 2022,
  },
  notes: [
    'Attainment keeps climbing: the bachelor’s-or-higher share of adults 25+ rose from about 28% in 2010 to <strong>36.2% in 2023</strong> (Census Bureau).',
    'On PISA 2022, U.S. 15-year-olds scored <strong>504 in reading and 499 in science — above the OECD average — but 465 in math, below it</strong> (OECD).',
    'Published in-state tuition and fees at public four-year colleges average about <strong>$11,600 a year</strong> (College Board, 2024–25); federal student loan debt totals ≈$1.6 trillion (Dept. of Education / Federal Reserve, 2025).',
  ],
};

/* Source agencies shown in the overview footer strip */
export const sourceAgencies = [
  'U.S. Census Bureau', 'Bureau of Economic Analysis', 'Bureau of Labor Statistics',
  'Federal Reserve', 'CDC / NCHS', 'CMS', 'NCES', 'U.S. Treasury', 'CBO', 'OECD', 'SIPRI',
];
