/* ====================================================
   MS360 Enfermería — Menú maestro
   Navegación entre calculadoras (iframe aislado)
   ==================================================== */

const APPS = {
  porcentaje: { url: "porcentaje/index.html", title: "Conversión de %", premium: false },
  dosisflujo: { url: "dosisflujo/index.html", title: "Dosis y Goteo",   premium: false },
  aspa:       { url: "aspa/index.html",       title: "Regla del Aspa",   premium: true  },
  uci:        { url: "uci/index.html",        title: "UCI: Balance + Antropometría", premium: true },
};

const menu        = document.getElementById("menu");
const viewer      = document.getElementById("viewer");
const viewerFrame = document.getElementById("viewer-frame");
const viewerTitle = document.getElementById("viewer-title");
const backBtn     = document.getElementById("back-btn");

/* ---- ¿Premium desbloqueado? ----
   NOTA: por ahora siempre devuelve true para poder probar la navegación.
   Cuando integremos Google Play Billing, esta función consultará el
   estado real de la compra. NO usar localStorage como única verdad. */
function premiumDesbloqueado() {
  return true; // TODO: reemplazar por verificación real de Billing
}

function abrirApp(key) {
  const app = APPS[key];
  if (!app) return;

  if (app.premium && !premiumDesbloqueado()) {
    mostrarPaywall(key);
    return;
  }

  viewerFrame.src = app.url;
  viewerTitle.textContent = app.title;
  viewer.hidden = false;
  menu.style.display = "none";
  window.scrollTo(0, 0);
}

function volverAlMenu() {
  viewer.hidden = true;
  viewerFrame.src = "about:blank"; // libera la calculadora (reinicia estado)
  menu.style.display = "flex";
}

function mostrarPaywall(key) {
  // Placeholder: se reemplazará por la pantalla real de compra ($2.99)
  alert("Esta calculadora es PRO.\n\nPróximamente: desbloquear las 2 calculadoras PRO por una sola compra.");
}

/* ---- Eventos ---- */
document.querySelectorAll(".tool").forEach(btn => {
  btn.addEventListener("click", () => abrirApp(btn.dataset.app));
});

backBtn.addEventListener("click", volverAlMenu);

// El botón físico "atrás" de Android vuelve al menú en vez de cerrar la app
window.addEventListener("popstate", () => {
  if (!viewer.hidden) volverAlMenu();
});

document.getElementById("open-privacy").addEventListener("click", () => {
  alert("La política de privacidad se mostrará aquí.");
});
document.getElementById("open-about").addEventListener("click", () => {
  alert("MS360 Enfermería\nCalculadoras clínicas de MEDISHORT360.\n\nHerramienta de apoyo educativo.");
});

/* ---- Service Worker (PWA) ---- */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
