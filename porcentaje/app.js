// ===== MEDISHORT360 · Conversor %→g · app.js =====

// ——— Datos de ejemplos precargados ———
const EJEMPLOS = [
  { nombre: 'Sulfato de Magnesio',     conc: 20,   vol: 10   },
  { nombre: 'Gluconato de Calcio',     conc: 10,   vol: 10   },
  { nombre: 'Bicarbonato de Sodio',    conc: 8.4,  vol: 10   },
  { nombre: 'Cloruro de Sodio 0.9%',  conc: 0.9,  vol: 1000 },
  { nombre: 'Cloruro de Sodio 20%',   conc: 20,   vol: 10   },
  { nombre: 'Cloruro de Potasio 20%', conc: 20,   vol: 10   },
  { nombre: 'Dextrosa 5%',            conc: 5,    vol: 1000 },
  { nombre: 'Dextrosa 10%',           conc: 10,   vol: 1000 },
  { nombre: 'Dextrosa 50%',           conc: 50,   vol: 500  },
  { nombre: 'Epinefrina Racémica',    conc: 2.25, vol: 0.5  },
  { nombre: 'Propofol 1%',            conc: 1,    vol: 20   },
  { nombre: 'Propofol 2%',            conc: 2,    vol: 20   },
];

// ——— Navegación entre secciones ———
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.querySelectorAll('.nav-pill').forEach(p => p.classList.remove('active'));

  document.getElementById('sec-' + id).classList.remove('hidden');

  const pills = document.querySelectorAll('.nav-pill');
  const map = { calculadora: 0, dosis: 1, ejemplos: 2, manual: 3 };
  if (map[id] !== undefined) pills[map[id]].classList.add('active');

  if (id === 'ejemplos') renderEjemplos();
}

// ——— Cargar medicamento rápido ———
function cargarMed(nombre, conc, vol) {
  document.getElementById('inputNombre').value = nombre;
  document.getElementById('inputConc').value = conc;
  document.getElementById('inputVol').value = vol;
  calcular();
  setTimeout(() => {
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

// ——— Función principal de cálculo ———
function calcular() {
  const nombre = document.getElementById('inputNombre').value.trim() || 'Medicamento';
  const conc   = parseFloat(document.getElementById('inputConc').value);
  const vol    = parseFloat(document.getElementById('inputVol').value);

  if (isNaN(conc) || isNaN(vol) || conc <= 0 || vol <= 0) {
    alert('⚠️ Por favor ingresa una concentración y un volumen válidos.');
    return;
  }
  if (conc > 100) {
    alert('⚠️ La concentración no puede ser mayor al 100%.');
    return;
  }

  const resultado = computar(conc, vol);

  document.getElementById('resNombre').textContent = nombre;
  document.getElementById('resConc').textContent   = formatNum(conc) + '%';
  document.getElementById('resVol').textContent    = formatNum(vol) + ' mL';

  document.getElementById('pasoAPaso').innerHTML = buildPasoAPaso(nombre, conc, vol, resultado);

  document.getElementById('resBig').textContent     = formatNum(resultado.gTotal) + ' g en ' + formatNum(vol) + ' mL';
  document.getElementById('resMgMl').textContent    = formatNum(resultado.mgMl) + ' mg/mL';
  document.getElementById('resMgTotal').textContent = formatNum(resultado.mgTotal) + ' mg';
  document.getElementById('resGTotal').textContent  = formatNum(resultado.gTotal) + ' g';

  const pct = Math.min((resultado.mgMl / 1000) * 100, 100);
  document.getElementById('barraFill').style.width = pct + '%';
  document.getElementById('barraLabel').textContent = formatNum(resultado.mgMl) + ' mg/mL';

  document.getElementById('resultado').classList.remove('hidden');
}

// ——— Cálculo base ———
function computar(conc, vol) {
  const mgMl    = (conc * 1000) / 100;
  const mgTotal = mgMl * vol;
  const gTotal  = mgTotal / 1000;
  return { mgMl, mgTotal, gTotal };
}

// ——— Paso a paso ———
function buildPasoAPaso(nombre, conc, vol, r) {
  const lines = [
    `<span class="paso-line">1. <span class="paso-highlight">${formatNum(conc)}%</span> significa que hay <span class="paso-highlight">${formatNum(conc)} g</span> por cada <span class="paso-highlight">100 mL</span></span>`,
    `<span class="paso-line">2. <span class="paso-highlight">${formatNum(conc)} g ÷ 100 mL = ${formatNum(r.mgMl / 1000)} g/mL = <span class="paso-highlight">${formatNum(r.mgMl)} mg/mL</span></span>`,
    `<span class="paso-line">3. <span class="paso-highlight">${formatNum(r.mgMl)} mg/mL × ${formatNum(vol)} mL = <span class="paso-highlight">${formatNum(r.mgTotal)} mg</span></span>`,
    `<span class="paso-line paso-result">✅ Resultado: <strong>${formatNum(r.gTotal)} g</strong> en <strong>${formatNum(vol)} mL</strong></span>`,
  ];
  return lines.join('');
}

// ═══════════════════════════════════════════════════════
// ——— CALCULADORA DE DOSIS ———
// ═══════════════════════════════════════════════════════

const MEDS_DOSIS = [
  {
    nombre: 'Propofol 1%',
    conc: 1,
    unidad: 'mg',
    presentaciones: [10, 20, 50, 100]
  },
  {
    nombre: 'Propofol 2%',
    conc: 2,
    unidad: 'mg',
    presentaciones: [20, 50]
  },
  {
    nombre: 'Sulfato de Magnesio 20%',
    conc: 20,
    unidad: 'g',
    presentaciones: [5, 10, 20]
  },
  {
    nombre: 'Gluconato de Calcio 10%',
    conc: 10,
    unidad: 'mg',
    presentaciones: [10]
  },
  {
    nombre: 'Bicarbonato de Sodio 8.4%',
    conc: 8.4,
    unidad: 'mg',
    presentaciones: [10, 20]
  },
  {
    nombre: 'Cloruro de Sodio 20%',
    conc: 20,
    unidad: 'mg',
    presentaciones: [10, 20]
  },
  {
    nombre: 'Cloruro de Potasio 20%',
    conc: 20,
    unidad: 'mg',
    presentaciones: [10, 20]
  },
  {
    nombre: 'Dextrosa 50%',
    conc: 50,
    unidad: 'g',
    presentaciones: [50, 500]
  },
  {
    nombre: 'Epinefrina Racémica 2.25%',
    conc: 2.25,
    unidad: 'mg',
    presentaciones: [0.5]
  },
  {
    nombre: 'Otro (manual)',
    conc: null,
    unidad: 'mg',
    presentaciones: []
  },
];

function initDosisSection() {
  const select = document.getElementById('dosisSelectMed');
  if (select.dataset.init === '1') return;
  select.dataset.init = '1';

  MEDS_DOSIS.forEach((m, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = m.nombre;
    select.appendChild(opt);
  });

  onDosisSelectChange();
}

function onDosisSelectChange() {
  const idx = parseInt(document.getElementById('dosisSelectMed').value);
  const med = MEDS_DOSIS[idx];

  const manualRow   = document.getElementById('dosisManualRow');
  const presRow     = document.getElementById('dosisPresRow');
  const presSelect  = document.getElementById('dosisSelectPres');
  const unidadLabel = document.getElementById('dosisUnidadLabel');

  // Manual o precargado
  if (med.conc === null) {
    manualRow.classList.remove('hidden');
    presRow.classList.add('hidden');
  } else {
    manualRow.classList.add('hidden');

    // Llenar presentaciones
    presSelect.innerHTML = '';
    med.presentaciones.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = v + ' mL';
      presSelect.appendChild(opt);
    });
    presRow.classList.remove('hidden');
  }

  unidadLabel.textContent = med.unidad || 'mg';
  document.getElementById('dosisInputUnidad').value = med.unidad || 'mg';

  // Limpiar resultado
  document.getElementById('dosisResultado').classList.add('hidden');
}

function calcularDosis() {
  const idx   = parseInt(document.getElementById('dosisSelectMed').value);
  const med   = MEDS_DOSIS[idx];
  const dosis = parseFloat(document.getElementById('dosisInputDosis').value);
  const unidad = document.getElementById('dosisInputUnidad').value || 'mg';

  let conc, volAmpolla;

  if (med.conc === null) {
    // Modo manual
    conc      = parseFloat(document.getElementById('dosisManualConc').value);
    volAmpolla = parseFloat(document.getElementById('dosisManualVol').value);
    if (isNaN(conc) || isNaN(volAmpolla) || conc <= 0 || volAmpolla <= 0) {
      alert('⚠️ Ingresa la concentración y el volumen del frasco.');
      return;
    }
  } else {
    conc      = med.conc;
    volAmpolla = parseFloat(document.getElementById('dosisSelectPres').value);
  }

  if (isNaN(dosis) || dosis <= 0) {
    alert('⚠️ Ingresa la dosis ordenada.');
    return;
  }

  const mgMl   = (conc * 1000) / 100;

  // Convertir dosis a mg si viene en gramos
  const dosisMg = unidad === 'g' ? dosis * 1000 : dosis;

  const mlAdmin   = dosisMg / mgMl;
  const ampollas  = mlAdmin / volAmpolla;
  const excede    = mlAdmin > volAmpolla;

  const nombreMed = med.conc !== null ? med.nombre : 'Medicamento';

  // Mostrar resultado
  const resEl = document.getElementById('dosisResultado');
  resEl.classList.remove('hidden');

  document.getElementById('dosisResMed').textContent   = nombreMed;
  document.getElementById('dosisResConc').textContent  = formatNum(conc) + '%  (' + formatNum(mgMl) + ' mg/mL)';
  document.getElementById('dosisResDosis').textContent = formatNum(dosis) + ' ' + unidad;
  document.getElementById('dosisResMl').textContent    = formatNum(mlAdmin) + ' mL';
  document.getElementById('dosisResMl').className      = excede ? 'dosis-big-val warn' : 'dosis-big-val';
  document.getElementById('dosisResAmpollas').textContent = formatNum(Math.ceil(ampollas * 100) / 100) + ' ampolla(s) de ' + formatNum(volAmpolla) + ' mL';

  document.getElementById('dosisPasoAPaso').innerHTML = buildDosisPasos(
    nombreMed, conc, mgMl, dosisMg, mlAdmin, ampollas, volAmpolla, unidad, dosis, excede
  );

  document.getElementById('dosisAvisoExcede').classList.toggle('hidden', !excede);

  resEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function buildDosisPasos(nombre, conc, mgMl, dosisMg, mlAdmin, ampollas, volAmp, unidad, dosisOrig, excede) {
  const lines = [
    `<span class="paso-line">1. <span class="paso-highlight">${formatNum(conc)}%</span> = <span class="paso-highlight">${formatNum(mgMl)} mg/mL</span></span>`,
    `<span class="paso-line">2. Dosis ordenada: <span class="paso-highlight">${formatNum(dosisOrig)} ${unidad}</span>${unidad === 'g' ? ' = ' + formatNum(dosisMg) + ' mg' : ''}</span>`,
    `<span class="paso-line">3. mL = ${formatNum(dosisMg)} mg ÷ ${formatNum(mgMl)} mg/mL = <span class="paso-highlight">${formatNum(mlAdmin)} mL</span></span>`,
    `<span class="paso-line">4. Ampollas = ${formatNum(mlAdmin)} mL ÷ ${formatNum(volAmp)} mL = <span class="paso-highlight">${formatNum(Math.ceil(ampollas * 100) / 100)} ampolla(s)</span></span>`,
    excede
      ? `<span class="paso-line paso-warn">⚠️ La dosis supera 1 ampolla. Necesitas ${formatNum(Math.ceil(ampollas * 100) / 100)} ampollas de ${formatNum(volAmp)} mL.</span>`
      : `<span class="paso-line paso-result">✅ Administrar <strong>${formatNum(mlAdmin)} mL</strong> de <strong>${nombre}</strong></span>`,
  ];
  return lines.join('');
}

// ——— Render de ejemplos ———
function renderEjemplos() {
  const container = document.getElementById('ejemplosGrid');
  if (container.innerHTML !== '') return;

  container.innerHTML = EJEMPLOS.map((ej, i) => {
    const r = computar(ej.conc, ej.vol);
    return `
      <div class="ejemplo-item" id="ej-${i}" onclick="toggleEjemplo(${i})">
        <div class="ejemplo-header">
          <span class="ej-name">${ej.nombre}</span>
          <div class="ej-badges">
            <span class="ej-badge gold">${formatNum(ej.conc)}%</span>
            <span class="ej-badge">${formatNum(ej.vol)} mL</span>
          </div>
        </div>
        <div class="ejemplo-body">
          <div class="ej-paso">
            1. ${formatNum(ej.conc)}% = ${formatNum(ej.conc)} g / 100 mL<br/>
            2. ${formatNum(ej.conc)} g ÷ 100 mL = <span class="cyan">${formatNum(r.mgMl)} mg/mL</span><br/>
            3. ${formatNum(r.mgMl)} mg/mL × ${formatNum(ej.vol)} mL = <span class="cyan">${formatNum(r.mgTotal)} mg</span><br/>
            ✅ Contiene <strong>${formatNum(r.gTotal)} g</strong> en ${formatNum(ej.vol)} mL
          </div>
          <div class="ej-resultados">
            <div class="ej-res-item">
              <span class="ej-res-label">mg/mL</span>
              <span class="ej-res-val">${formatNum(r.mgMl)}</span>
            </div>
            <div class="ej-res-item">
              <span class="ej-res-label">mg totales</span>
              <span class="ej-res-val">${formatNum(r.mgTotal)}</span>
            </div>
            <div class="ej-res-item">
              <span class="ej-res-label">g totales</span>
              <span class="ej-res-val">${formatNum(r.gTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function toggleEjemplo(i) {
  const el = document.getElementById('ej-' + i);
  el.classList.toggle('open');
}

// ——— Helpers ———
function formatNum(n) {
  if (n === undefined || n === null || isNaN(n)) return '—';
  const str = parseFloat(n.toPrecision(6)).toString();
  return str;
}

// ——— Service Worker gestionado por la app maestra MS360 ———
