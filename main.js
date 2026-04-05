import { routesData } from './data.js';

// --- State ---
let totalBudget = 0;
let segments = [];
let currentCurrency = 'INR';
const exchangeRates = { INR: 1, USD: 0.012, EUR: 0.011, GBP: 0.0095 };

// --- Symbols ---
const getSymbol = (currency) => {
  switch (currency) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'GBP': return '£';
    default: return '₹';
  }
};

// --- DOM Elements ---
const budgetInput = document.getElementById('total-budget');
const progressBar = document.getElementById('budget-progress-bar');
const budgetStatus = document.getElementById('budget-status');
const currBtns = document.querySelectorAll('.curr-btn');
const mainCurrencySymbol = document.getElementById('main-currency');
const displayCurrencies = document.querySelectorAll('.dynamic-curr');

const form = document.getElementById('add-leg-form');
const transportBtns = document.querySelectorAll('.transport-btn');
let currentTransport = 'flight';

const quickRoutesList = document.getElementById('quick-routes-list');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentFilter = 'flight';

// Metrics
const metricSegments = document.getElementById('metric-segments');
const metricFlights = document.getElementById('metric-flights');
const metricFlightsCost = document.getElementById('metric-flights-cost');
const metricTrains = document.getElementById('metric-trains');
const metricTrainsCost = document.getElementById('metric-trains-cost');
const metricBuses = document.getElementById('metric-buses');
const metricBusesCost = document.getElementById('metric-buses-cost');

// Visualization
const segmentsListEl = document.getElementById('segments-list');
const routeVisualizer = document.getElementById('route-visualizer');

// Charts Base Data
let doughnutChartRef = null;
let barChartRef = null;

// --- Initialize ---
function init() {
  renderQuickRoutes();
  setupEventListeners();
  initCharts();
}

// --- Event Listeners ---
function setupEventListeners() {
  // Budget Input
  budgetInput.addEventListener('input', (e) => {
    totalBudget = parseFloat(e.target.value) || 0;
    updateUI();
  });

  // Currency Toggle
  currBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      currBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCurrency = e.target.dataset.currency;
      const sym = getSymbol(currentCurrency);
      mainCurrencySymbol.textContent = sym;
      displayCurrencies.forEach(el => el.textContent = sym);
      updateUI();
    });
  });

  // Transport Form Toggle
  transportBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      transportBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentTransport = e.target.dataset.type;
    });
  });

  // Route Filter Toggle
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderQuickRoutes();
    });
  });

  // Form Submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const origin = document.getElementById('leg-origin').value;
    const dest = document.getElementById('leg-dest').value;
    const operator = document.getElementById('leg-operator').value;
    const cls = document.getElementById('leg-class').value;
    const cost = parseFloat(document.getElementById('leg-cost').value);
    const duration = document.getElementById('leg-duration').value;

    // Convert cost back to INR for internal storage
    const costInINR = cost / exchangeRates[currentCurrency];

    segments.push({
      type: currentTransport,
      origin,
      dest,
      operator,
      cls,
      cost: costInINR,
      duration
    });

    const savedBudget = budgetInput.value;
    form.reset();
    budgetInput.value = savedBudget;
    
    updateUI();
  });
}

// --- Core Logic ---

function formatMoney(amountInINR) {
  const converted = amountInINR * exchangeRates[currentCurrency];
  return getSymbol(currentCurrency) + converted.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function renderQuickRoutes() {
  quickRoutesList.innerHTML = '';
  const filtered = routesData.filter(r => r.type === currentFilter);
  
  filtered.forEach(route => {
    const el = document.createElement('div');
    el.className = 'q-route';
    el.innerHTML = `
      <div class="q-route-top">
        <strong>${route.origin} → ${route.dest}</strong>
        <span class="badge ${route.type}">${route.type.toUpperCase()}</span>
      </div>
      <div class="q-route-bottom">
        <span>${route.operator} (${route.class})</span>
        <span>₹${route.cost}</span>
      </div>
    `;
    el.addEventListener('click', () => {
      // Auto-fill form
      transportBtns.forEach(b => b.classList.toggle('active', b.dataset.type === route.type));
      currentTransport = route.type;

      document.getElementById('leg-origin').value = route.origin;
      document.getElementById('leg-dest').value = route.dest;
      document.getElementById('leg-operator').value = route.operator;
      document.getElementById('leg-class').value = route.class;
      document.getElementById('leg-duration').value = route.duration;
      // Convert mock INR data to current currency for the input
      document.getElementById('leg-cost').value = Math.round(route.cost * exchangeRates[currentCurrency]);
    });
    quickRoutesList.appendChild(el);
  });
}

function updateUI() {
  // 1. Calculate Totals
  const totalSpentINR = segments.reduce((acc, seg) => acc + seg.cost, 0);
  const totalBudgetINR = totalBudget / exchangeRates[currentCurrency]; 

  // 2. Update Progress
  if (totalBudgetINR > 0) {
    const pct = Math.min((totalSpentINR / totalBudgetINR) * 100, 100);
    progressBar.style.width = `${pct}%`;
    progressBar.style.background = pct > 90 ? '#e35f5f' : 'var(--accent-gold)';
  } else {
    progressBar.style.width = `0%`;
  }
  
  const remainINR = Math.max(totalBudgetINR - totalSpentINR, 0);
  budgetStatus.innerHTML = `<span>${formatMoney(totalSpentINR)} spent</span><span>${formatMoney(remainINR)} remaining</span>`;

  // 3. Update Metrics
  const flights = segments.filter(s => s.type === 'flight');
  const trains = segments.filter(s => s.type === 'train');
  const buses = segments.filter(s => s.type === 'bus');

  metricSegments.textContent = segments.length;
  metricFlights.textContent = flights.length;
  metricTrains.textContent = trains.length;
  metricBuses.textContent = buses.length;

  metricFlightsCost.textContent = formatMoney(flights.reduce((a, b) => a + b.cost, 0));
  metricTrainsCost.textContent = formatMoney(trains.reduce((a, b) => a + b.cost, 0));
  metricBusesCost.textContent = formatMoney(buses.reduce((a, b) => a + b.cost, 0));

  // 4. Update Segments List
  segmentsListEl.innerHTML = '';
  if (segments.length === 0) {
    segmentsListEl.innerHTML = '<div class="empty-state">Add segments to see your itinerary.</div>';
  } else {
    segments.forEach(seg => {
      const el = document.createElement('div');
      el.className = 'segment-item';
      let icon = seg.type === 'flight' ? '✈️' : (seg.type === 'train' ? '🚆' : '🚌');
      el.innerHTML = `
        <div class="seg-icon ${seg.type}">${icon}</div>
        <div class="seg-route">${seg.origin} → ${seg.dest}</div>
        <div class="seg-meta">
           <span>${seg.operator}</span>
           <span>${seg.cls}</span>
        </div>
        <div class="seg-dur">${seg.duration}</div>
        <div class="seg-cost">${formatMoney(seg.cost)}</div>
      `;
      segmentsListEl.appendChild(el);
    });
  }

  // 5. Update Visualizer
  routeVisualizer.innerHTML = '';
  if (segments.length === 0) {
    routeVisualizer.innerHTML = '<div class="empty-state">No segments added yet. Add a leg to start mapping!</div>';
  } else {
    segments.forEach((seg, index) => {
      // Origin Node
      if (index === 0) {
        routeVisualizer.innerHTML += `
          <div class="vis-node">
            <div class="vis-dot"></div>
            <div class="vis-label">${seg.origin}</div>
          </div>
        `;
      }
      // Line connecting to dest
      routeVisualizer.innerHTML += `
        <div class="vis-line ${seg.type}"></div>
        <div class="vis-node">
          <div class="vis-dot"></div>
          <div class="vis-label">${seg.dest}</div>
        </div>
      `;
    });
  }

  // 6. Update Charts
  updateCharts(flights, trains, buses);
}

// --- Charts ---
function initCharts() {
  const ctxDoughnut = document.getElementById('doughnut-chart').getContext('2d');
  const ctxBar = document.getElementById('bar-chart').getContext('2d');

  Chart.defaults.color = '#8e9096';
  Chart.defaults.font.family = "'DM Mono', monospace";

  doughnutChartRef = new Chart(ctxDoughnut, {
    type: 'doughnut',
    data: {
      labels: ['Flights', 'Trains', 'Buses'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: ['#00f0ff', '#00ff9d', '#ffb800'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      },
      cutout: '70%'
    }
  });

  barChartRef = new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: [],
      datasets: [{
        label: 'Cost',
        data: [],
        backgroundColor: '#39ff14',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

function updateCharts(flights, trains, buses) {
  if (!doughnutChartRef || !barChartRef) return;

  const fCost = flights.reduce((a, b) => a + b.cost, 0);
  const tCost = trains.reduce((a, b) => a + b.cost, 0);
  const bCost = buses.reduce((a, b) => a + b.cost, 0);
  
  // Convert for specific currency display (optional, but shows correct relations anyway)
  doughnutChartRef.data.datasets[0].data = [
    fCost * exchangeRates[currentCurrency], 
    tCost * exchangeRates[currentCurrency], 
    bCost * exchangeRates[currentCurrency]
  ];
  doughnutChartRef.update();

  const labels = segments.map(s => s.origin + '-' + s.dest);
  const data = segments.map(s => s.cost * exchangeRates[currentCurrency]);
  
  barChartRef.data.labels = labels;
  barChartRef.data.datasets[0].data = data;
  barChartRef.data.datasets[0].backgroundColor = segments.map(s => {
    if(s.type === 'flight') return '#00f0ff';
    if(s.type === 'train') return '#00ff9d';
    return '#ffb800';
  });
  barChartRef.update();
}

// Start
document.addEventListener('DOMContentLoaded', init);
