// ===== activacion.js · MS360 Enfermería (App Maestra) =====
// Un código = un dispositivo. Bloquea TODA la app hasta activar.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, doc, getDoc, updateDoc }
  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

// ─────────────────────────────────────────────
//  🔧 REEMPLAZA CON TU CONFIGURACIÓN FIREBASE
//  (la misma que usas en las otras 4 apps)
// ─────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyApl919VrDKdV1AdHtZsrVYUC0zym-ZrZs",
  authDomain:        "medishort360-f6f20.firebaseapp.com",
  projectId:         "medishort360-f6f20",
  storageBucket:     "medishort360-f6f20.firebasestorage.app",
  messagingSenderId: "127659670697",
  appId:             "1:127659670697:web:b845e760917ba77e253db8"
};
// ─────────────────────────────────────────────

const COLECCION   = 'codigos_maestra';
const LS_KEY       = 'ms360maestra_activado';
const LS_CODE_KEY  = 'ms360maestra_codigo';

// ——— Inicializar Firebase ———
const app = initializeApp(firebaseConfig, 'ms360-maestra');
const db  = getFirestore(app);

// ——— Generar ID estable del dispositivo ———
function generarDispositivoId() {
  const datos = [
    navigator.language || '',
    navigator.platform || '',
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    Intl.DateTimeFormat().resolvedOptions().timeZone || '',
    navigator.hardwareConcurrency || '',
    navigator.deviceMemory || '',
  ].join('|');
  let hash = 0;
  for (let i = 0; i < datos.length; i++) {
    const char = datos.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return 'dev_' + Math.abs(hash).toString(36);
}

// ——— Verificar y activar código ———
async function verificarCodigo(codigo) {
  const codigoLimpio = codigo.trim().toUpperCase();
  const dispositivoId = generarDispositivoId();

  let docSnap;
  try {
    docSnap = await getDoc(doc(db, COLECCION, codigoLimpio));
  } catch (e) {
    return { valido: false, razon: 'error_red' };
  }

  if (!docSnap.exists()) return { valido: false, razon: 'no_encontrado' };

  const data = docSnap.data();
  if (data.estado === 'DESACTIVADO' || data.activo === false) {
    return { valido: false, razon: 'inactivo' };
  }

  const dispositivoGuardado = data.dispositivo_id || '';

  // Código nuevo / disponible → asignar a este dispositivo
  if ((data.estado === 'DISPONIBLE' || data.estado === undefined) && dispositivoGuardado === '') {
    try {
      await updateDoc(doc(db, COLECCION, codigoLimpio), {
        estado: 'USADO',
        dispositivo_id: dispositivoId,
        fecha_activacion: new Date().toISOString(),
      });
      return { valido: true };
    } catch (e) {
      return { valido: false, razon: 'error_escritura' };
    }
  }

  // Mismo dispositivo (reinstalación) → permitir
  if (dispositivoGuardado === dispositivoId) return { valido: true };

  // Otro dispositivo → bloquear
  return { valido: false, razon: 'otro_dispositivo' };
}

// ——— Lógica del gate ———
function yaActivado() {
  return localStorage.getItem(LS_KEY) === '1';
}

function marcarActivado(codigo) {
  localStorage.setItem(LS_KEY, '1');
  localStorage.setItem(LS_CODE_KEY, codigo);
}

function ocultarGate() {
  const gate = document.getElementById('maestra-gate');
  if (gate) {
    gate.style.opacity = '0';
    gate.style.transition = 'opacity 0.5s ease';
    setTimeout(() => gate.remove(), 500);
  }
}

function mostrarError(msg) {
  const errEl = document.getElementById('maestra-error');
  const input = document.getElementById('maestra-input');
  if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
  if (input) {
    input.classList.remove('shake');
    void input.offsetWidth;
    input.classList.add('shake');
  }
}

async function intentarActivar() {
  const input = document.getElementById('maestra-input');
  const btn   = document.getElementById('maestra-btn');
  const errEl = document.getElementById('maestra-error');
  const codigo = input ? input.value.trim() : '';

  if (!codigo) { mostrarError('Ingresa un código de activación.'); return; }

  btn.disabled    = true;
  btn.textContent = 'Verificando...';
  if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }

  try {
    const resultado = await verificarCodigo(codigo);
    if (resultado.valido) {
      marcarActivado(codigo.toUpperCase());
      btn.textContent = '✅ ¡Activado!';
      setTimeout(ocultarGate, 700);
    } else {
      const mensajes = {
        no_encontrado:    'Código inválido. Verifica e intenta de nuevo.',
        inactivo:         'Este código ha sido desactivado.',
        otro_dispositivo: 'Este código ya está en uso en otro dispositivo.',
        error_red:        'Error de conexión. Verifica tu internet.',
        error_escritura:  'Error al activar. Intenta de nuevo.',
      };
      mostrarError(mensajes[resultado.razon] || 'Código inválido.');
      btn.disabled    = false;
      btn.textContent = 'Activar';
    }
  } catch (err) {
    mostrarError('Error de conexión. Verifica tu internet.');
    btn.disabled    = false;
    btn.textContent = 'Activar';
  }
}

// ——— Inicializar al cargar ———
document.addEventListener('DOMContentLoaded', () => {
  if (yaActivado()) {
    const gate = document.getElementById('maestra-gate');
    if (gate) gate.remove();
    return;
  }

  const gate = document.getElementById('maestra-gate');
  if (gate) gate.style.display = 'flex';

  const btn   = document.getElementById('maestra-btn');
  const input = document.getElementById('maestra-input');

  if (btn)   btn.addEventListener('click', intentarActivar);
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') intentarActivar();
    });
    input.addEventListener('input', (e) => {
      const pos = e.target.selectionStart;
      e.target.value = e.target.value.toUpperCase();
      e.target.setSelectionRange(pos, pos);
    });
  }
});
