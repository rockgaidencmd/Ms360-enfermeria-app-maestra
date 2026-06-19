// ==========================================
// APP.JS - MS360-UCI Balance Hídrico
// ==========================================

let sexoActual = 'mujer';
let sexoAntropo = 'mujer';
let respiratorioSeleccionado = null;
let nasalSeleccionado = null;
let abdomenAbierto = false;

// ==========================================
// FUNCIONES DE ENTRADA
// ==========================================

function setSexo(valor) {
  sexoActual = valor;
}

function setAbdomen(valor) {
  abdomenAbierto = valor;
}

function toggleResp(elemento) {
  elemento.classList.toggle('selected');
  respiratorioSeleccionado = document.querySelector('#resp-group .selected') ? true : false;
}

function toggleNasal(elemento) {
  // Limpiar otros seleccionados en nasal-group
  document.querySelectorAll('#nasal-group .check-item').forEach(el => {
    el.classList.remove('selected');
  });
  elemento.classList.add('selected');
  nasalSeleccionado = elemento.textContent.trim();
}

// ==========================================
// CÁLCULOS ANTROPOMÉTRICOS
// ==========================================

function calcularPesoIdeal(talla, sexo) {
  // Fórmula de Devine: 
  // Hombre: 50 + 2.3 × (talla en pulgadas - 60)
  // Mujer: 45.5 + 2.3 × (talla en pulgadas - 60)
  const pulgadas = talla / 2.54;
  const base = sexo === 'hombre' ? 50 : 45.5;
  const pesoIdeal = base + 2.3 * (pulgadas - 60);
  return Math.round(pesoIdeal * 10) / 10;
}

function calcularIMC(peso, talla) {
  const tallaM = talla / 100;
  const imc = peso / (tallaM * tallaM);
  return Math.round(imc * 10) / 10;
}

function clasificarIMC(imc) {
  if (imc < 18.5) return 'Bajo peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidad I';
  if (imc < 40) return 'Obesidad II';
  return 'Obesidad III';
}

function calcularSuperficieCorporal(peso, talla) {
  // Fórmula de Mosteller: √(altura(cm) × peso(kg) / 3600)
  const sc = Math.sqrt((talla * peso) / 3600);
  return Math.round(sc * 100) / 100;
}

// ==========================================
// CÁLCULOS DE BALANCE HÍDRICO
// ==========================================

function calcularAguaEndo(peso, horasTurno) {
  // Tu fórmula exacta: peso * 5 / 24 * horas de turno
  const aguaEndo = (peso * 5 / 24) * horasTurno;
  return Math.round(aguaEndo); // Redondea automáticamente al entero más cercano
}

function calcularPerdidasInsensibles(peso, horas, respiratorio, nasal) {
  // Base: 10-15 ml/kg/día (usamos 12 ml/kg/día)
  let factor = 12;

  if (respiratorio) {
    // Soporte respiratorio: factor ×11
    factor = 11;
  } else if (nasal && nasal !== 'Al ambiente') {
    // Cánula nasal: factor ×15
    factor = 15;
  } else if (nasal === 'Al ambiente') {
    // Al ambiente: factor ×15
    factor = 15;
  }

  // Cálculo por horas del turno
  const perPorHora = (peso * factor) / 24;
  const perInsens = Math.round(perPorHora * horas);
  
  return perInsens;
}

function calcularPorFiebre(peso, f1horas, f2horas, f3horas) {
  // f1: 37.5-38°C → factor ×0.5 ml/kg/h
  // f2: 38-39°C → factor ×1.0 ml/kg/h
  // f3: >39°C → factor ×1.5 ml/kg/h

  const f1 = Math.round(peso * 0.5 * f1horas);
  const f2 = Math.round(peso * 1.0 * f2horas);
  const f3 = Math.round(peso * 1.5 * f3horas);

  return { f1, f2, f3 };
}

function calcularAbdomenAbierto(peso, horas) {
  // Abdomen abierto: 1 ml/kg/hora (× horas de turno trabajadas)
  const perAbd = Math.round(1 * peso * horas);
  return perAbd;
}

// ==========================================
// FUNCIÓN PRINCIPAL DE CÁLCULO
// ==========================================

function calcular() {
  // Obtener valores de entrada
  const talla = parseFloat(document.getElementById('talla').value);
  const peso = parseFloat(document.getElementById('peso').value);
  const horasProd = parseFloat(document.getElementById('horas-prod').value);
  const horasTurno = parseFloat(document.getElementById('horas-turno').value);
  const orina = parseFloat(document.getElementById('orina').value) || 0;
  const f1h = parseFloat(document.getElementById('f1h').value) || 0;
  const f2h = parseFloat(document.getElementById('f2h').value) || 0;
  const f3h = parseFloat(document.getElementById('f3h').value) || 0;

  // Validar entrada
  if (!talla || !peso || talla < 100 || peso < 10) {
    alert('Por favor, ingresa talla y peso válidos');
    return;
  }

  // ==========================================
  // CÁLCULOS ANTROPOMÉTRICOS
  // ==========================================

  const pesoIdeal = calcularPesoIdeal(talla, sexoActual);
  const imc = calcularIMC(peso, talla);
  const imcCat = clasificarIMC(imc);
  const sc = calcularSuperficieCorporal(peso, talla);

  // Mostrar resultados antropométricos
  document.getElementById('r-pesoIdeal').textContent = pesoIdeal + ' kg';
  document.getElementById('r-imc').textContent = imc;
  document.getElementById('r-imc-cat').textContent = imcCat;
  document.getElementById('r-sc').textContent = sc + ' m²';

  // ==========================================
  // CÁLCULOS DE BALANCE HÍDRICO
  // ==========================================

  // Agua endógena
  const aguaEndo = calcularAguaEndo(peso, horasProd);
  document.getElementById('r-aguaEndo').textContent = aguaEndo + ' ml';
  document.getElementById('label-aguaEndo').textContent = 
    `💧 Agua Endógena (${horasProd}h)`;

  // Pérdidas insensibles
  const perInsens = calcularPerdidasInsensibles(peso, horasTurno, respiratorioSeleccionado, nasalSeleccionado);
  document.getElementById('r-perInsens').textContent = perInsens + ' ml';
  document.getElementById('label-perInsens').textContent = 
    `🌫️ Pérd. Insensibles (${horasTurno}h turno)`;

  // Pérdidas por fiebre
  const fiebre = calcularPorFiebre(peso, f1h, f2h, f3h);
  let totalFiebre = fiebre.f1 + fiebre.f2 + fiebre.f3;

  if (totalFiebre > 0) {
    document.getElementById('div-fiebre').style.display = 'block';
    
    if (fiebre.f1 > 0) {
      document.getElementById('row-f1').style.display = 'block';
      document.getElementById('r-f1').textContent = fiebre.f1 + ' ml';
    } else {
      document.getElementById('row-f1').style.display = 'none';
    }

    if (fiebre.f2 > 0) {
      document.getElementById('row-f2').style.display = 'block';
      document.getElementById('r-f2').textContent = fiebre.f2 + ' ml';
    } else {
      document.getElementById('row-f2').style.display = 'none';
    }

    if (fiebre.f3 > 0) {
      document.getElementById('row-f3').style.display = 'block';
      document.getElementById('r-f3').textContent = fiebre.f3 + ' ml';
    } else {
      document.getElementById('row-f3').style.display = 'none';
    }
  } else {
    document.getElementById('div-fiebre').style.display = 'none';
    document.getElementById('row-f1').style.display = 'none';
    document.getElementById('row-f2').style.display = 'none';
    document.getElementById('row-f3').style.display = 'none';
  }

  // Pérdidas por abdomen abierto
  if (abdomenAbierto) {
    const perAbd = calcularAbdomenAbierto(peso, horasTurno);
    document.getElementById('div-abd').style.display = 'block';
    document.getElementById('row-abd').style.display = 'block';
    document.getElementById('r-abd').textContent = perAbd + ' ml';
  } else {
    document.getElementById('div-abd').style.display = 'none';
    document.getElementById('row-abd').style.display = 'none';
  }

   // Gasto urinario (Calculado en ml/kg/h con 2 decimales)
  let calculoGastoU = 0;
  if (peso > 0 && horasTurno > 0) {
    calculoGastoU = orina / (peso * horasTurno);
  }
  document.getElementById('r-gastoU').textContent = calculoGastoU.toFixed(2) + ' ml/kg/h';
  document.getElementById('label-gastoU').textContent = 
    `🚿 Gasto Urinario (${horasTurno}h turno)`;

  // ==========================================
  // TOTAL DE PÉRDIDAS
  // ==========================================

  let perAbd = 0;
  if (abdomenAbierto) {
    perAbd = calcularAbdomenAbierto(peso, horasTurno);
  }

  const totalPerdidas = aguaEndo + perInsens + totalFiebre + perAbd + orina;

  document.getElementById('r-total').textContent = totalPerdidas + ' ml';

  // Scroll a resultados
  setTimeout(() => {
    document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// ==========================================
// FUNCIONES DE UTILIDAD
// ==========================================

function resetAll() {
  // Limpiar inputs
  document.getElementById('talla').value = '';
  document.getElementById('peso').value = '';
  document.getElementById('horas-prod').value = '24';
  document.getElementById('horas-turno').value = '12';
  document.getElementById('orina').value = '';
  document.getElementById('f1h').value = '0';
  document.getElementById('f2h').value = '0';
  document.getElementById('f3h').value = '0';

  // Reset sexo
  document.querySelector('input[name="sexo"][value="mujer"]').checked = true;
  sexoActual = 'mujer';

  // Reset abdomen
  document.querySelector('input[name="abdomen"][value="no"]').checked = true;
  abdomenAbierto = false;

  // Limpiar selecciones respiratorio
  document.querySelectorAll('#resp-group .check-item').forEach(el => {
    el.classList.remove('selected');
  });
  respiratorioSeleccionado = null;

  // Limpiar selecciones nasal
  document.querySelectorAll('#nasal-group .check-item').forEach(el => {
    el.classList.remove('selected');
  });
  nasalSeleccionado = null;

  // Limpiar resultados
  document.getElementById('r-pesoIdeal').textContent = '—';
  document.getElementById('r-imc').textContent = '—';
  document.getElementById('r-imc-cat').textContent = '—';
  document.getElementById('r-sc').textContent = '—';
  document.getElementById('r-aguaEndo').textContent = '—';
  document.getElementById('r-perInsens').textContent = '—';
  document.getElementById('r-gastoU').textContent = '—';
  document.getElementById('r-total').textContent = '— ml';

  document.getElementById('div-fiebre').style.display = 'none';
  document.getElementById('row-f1').style.display = 'none';
  document.getElementById('row-f2').style.display = 'none';
  document.getElementById('row-f3').style.display = 'none';
  document.getElementById('div-abd').style.display = 'none';
  document.getElementById('row-abd').style.display = 'none';
}

function compartir() {
  const pesoIdeal = document.getElementById('r-pesoIdeal').textContent;
  const imc = document.getElementById('r-imc').textContent;
  const imcCat = document.getElementById('r-imc-cat').textContent;
  const sc = document.getElementById('r-sc').textContent;
  const aguaEndo = document.getElementById('r-aguaEndo').textContent;
  const perInsens = document.getElementById('r-perInsens').textContent;
  const gastoU = document.getElementById('r-gastoU').textContent;
  const total = document.getElementById('r-total').textContent;

  const mensaje = `📊 *Resultados MS360-UCI - Balance Hídrico*

📐 Datos Antropométricos
⚖️ Peso Ideal: ${pesoIdeal}
📏 IMC: ${imc} (${imcCat})
🧬 Superficie Corporal: ${sc}

💦 Balance Hídrico
💧 Agua Endógena: ${aguaEndo}
🌫️ Pérd. Insensibles: ${perInsens}
🚿 Gasto Urinario: ${gastoU}

*TOTAL PÉRDIDAS: ${total}*

🔗 MS360-UCI - Medishort360`;

  // Intenta compartir con Web Share API
  if (navigator.share) {
    navigator.share({
      title: 'MS360-UCI - Balance Hídrico',
      text: mensaje
    }).catch(err => console.log('Error al compartir:', err));
  } else {
    // Fallback: copiar al portapapeles
    navigator.clipboard.writeText(mensaje).then(() => {
      alert('✅ Resultados copiados al portapapeles');
    }).catch(() => {
      alert('Resultados:\n\n' + mensaje);
    });
  }
}

// ==========================================
// PESTAÑAS (Balance / Antropometría)
// ==========================================

function cambiarTab(tab) {
  const panelBalance = document.getElementById('panel-balance');
  const panelAntropo = document.getElementById('panel-antropo');
  const btnBalance = document.getElementById('tab-balance');
  const btnAntropo = document.getElementById('tab-antropo');

  if (tab === 'balance') {
    panelBalance.classList.add('active');
    panelAntropo.classList.remove('active');
    btnBalance.classList.add('active');
    btnAntropo.classList.remove('active');
  } else {
    panelAntropo.classList.add('active');
    panelBalance.classList.remove('active');
    btnAntropo.classList.add('active');
    btnBalance.classList.remove('active');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setSexoA(valor) {
  sexoAntropo = valor;
}

// ==========================================
// FÓRMULAS ANTROPOMÉTRICAS (pestaña aparte)
// ==========================================

function calcularMCM(peso, talla, sexo) {
  // Masa Corporal Magra — fórmula de James
  // Varón:  1.1 × peso − 128 × (peso/talla)²
  // Mujer:  1.07 × peso − 148 × (peso/talla)²
  let mcm;
  if (sexo === 'hombre') {
    mcm = 1.1 * peso - 128 * Math.pow(peso / talla, 2);
  } else {
    mcm = 1.07 * peso - 148 * Math.pow(peso / talla, 2);
  }
  return Math.round(mcm * 10) / 10;
}

function calcularACT(mcm) {
  // Agua Corporal Total = 73.2% de la Masa Corporal Magra
  const act = mcm * 0.732;
  return Math.round(act * 10) / 10;
}

function calcularPesoAjustadoIMC(talla, imcObjetivo) {
  // peso = IMC objetivo × talla(m)²
  const tallaM = talla / 100;
  const peso = imcObjetivo * tallaM * tallaM;
  return Math.round(peso * 10) / 10;
}

function calcularAntropo() {
  const talla = parseFloat(document.getElementById('talla-a').value);
  const peso = parseFloat(document.getElementById('peso-a').value);
  const edad = parseFloat(document.getElementById('edad-a').value);

  if (!talla || !peso || talla < 100 || peso < 10) {
    alert('Por favor, ingresa talla y peso válidos');
    return;
  }

  // PI (Devine, misma que balance hídrico)
  const pi = calcularPesoIdeal(talla, sexoAntropo);
  // PPI = peso real / peso ideal × 100
  const ppi = Math.round((peso / pi * 100) * 10) / 10;
  // IMC + clasificación
  const imc = calcularIMC(peso, talla);
  const imcCat = clasificarIMC(imc);
  // ASC (Mosteller)
  const asc = calcularSuperficieCorporal(peso, talla);
  // MCM (James) y ACT (73.2% MCM)
  const mcm = calcularMCM(peso, talla, sexoAntropo);
  const act = calcularACT(mcm);
  // Peso ajustado a IMC 20 y 25
  const pimc20 = calcularPesoAjustadoIMC(talla, 20);
  const pimc25 = calcularPesoAjustadoIMC(talla, 25);

  document.getElementById('ra-pi').textContent = pi + ' kg';
  document.getElementById('ra-ppi').textContent = ppi + ' %';
  document.getElementById('ra-imc').textContent = imc + ' kg/m²';
  document.getElementById('ra-imc-cat').textContent = imcCat;
  document.getElementById('ra-asc').textContent = asc + ' m²';
  document.getElementById('ra-mcm').textContent = mcm + ' kg';
  document.getElementById('ra-act').textContent = act + ' litros';
  document.getElementById('ra-pimc20').textContent = pimc20 + ' kg';
  document.getElementById('ra-pimc25').textContent = pimc25 + ' kg';

  document.getElementById('resultados-antropo').style.display = 'block';
}

function resetAntropo() {
  document.getElementById('talla-a').value = '';
  document.getElementById('peso-a').value = '';
  document.getElementById('edad-a').value = '';
  document.querySelector('input[name="sexo-a"][value="mujer"]').checked = true;
  sexoAntropo = 'mujer';
  document.getElementById('resultados-antropo').style.display = 'none';
}

function compartirAntropo() {
  const pi = document.getElementById('ra-pi').textContent;
  const ppi = document.getElementById('ra-ppi').textContent;
  const imc = document.getElementById('ra-imc').textContent;
  const imcCat = document.getElementById('ra-imc-cat').textContent;
  const asc = document.getElementById('ra-asc').textContent;
  const mcm = document.getElementById('ra-mcm').textContent;
  const act = document.getElementById('ra-act').textContent;
  const pimc20 = document.getElementById('ra-pimc20').textContent;
  const pimc25 = document.getElementById('ra-pimc25').textContent;

  const mensaje = `📐 *Resultados MS360-UCI - Antropometría*

⚖️ PI · Peso Ideal: ${pi}
📊 PPI · % Peso Ideal: ${ppi}
📏 IMC: ${imc} (${imcCat})
🧬 ASC · Sup. Corporal: ${asc}
💪 MCM · Masa Magra: ${mcm}
💧 ACT · Agua Corp. Total: ${act}

🎯 Peso ajustado a IMC
• IMC 20: ${pimc20}
• IMC 25: ${pimc25}

🔗 MS360-UCI - Medishort360`;

  if (navigator.share) {
    navigator.share({
      title: 'MS360-UCI - Antropometría',
      text: mensaje
    }).catch(err => console.log('Error al compartir:', err));
  } else {
    navigator.clipboard.writeText(mensaje).then(() => {
      alert('✅ Resultados copiados al portapapeles');
    }).catch(() => {
      alert('Resultados:\n\n' + mensaje);
    });
  }
}

// ==========================================
// SERVICE WORKER gestionado por la app maestra MS360
// ==========================================
