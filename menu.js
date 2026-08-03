/* ====================================================
   MS360 Enfermería — Menú maestro
   Navegación entre calculadoras (iframe aislado)
   ==================================================== */

/* ---- Disclaimer de primer arranque ---- */
(function initDisclaimer() {
  const YA_ACEPTO = "ms360_disclaimer_v1";
  const overlay = document.getElementById("disclaimer");
  const check = document.getElementById("disclaimer-accept-check");
  const btn = document.getElementById("disclaimer-btn");
  if (!overlay) return;

  let aceptado = false;
  try { aceptado = localStorage.getItem(YA_ACEPTO) === "1"; } catch (e) {}

  if (!aceptado) {
    overlay.hidden = false;
    if (check && btn) {
      check.addEventListener("change", () => { btn.disabled = !check.checked; });
      btn.addEventListener("click", () => {
        try { localStorage.setItem(YA_ACEPTO, "1"); } catch (e) {}
        overlay.hidden = true;
      });
    }
  }
})();

const APPS = {
  porcentaje: { url: "/porcentaje/index.html", title: "Conversión de %", premium: false },
  dosisflujo: { url: "/dosisflujo/index.html", title: "Dosis y Goteo",   premium: false },
  aspa:       { url: "/aspa/index.html",       title: "Regla del Aspa",   premium: true  },
  uci:        { url: "/uci/index.html",        title: "UCI: Balance + Antropometría", premium: true },
};

const menu        = document.getElementById("menu");
const viewer      = document.getElementById("viewer");
const viewerFrame = document.getElementById("viewer-frame");
const viewerTitle = document.getElementById("viewer-title");
const backBtn     = document.getElementById("back-btn");

/* ---- ¿Premium desbloqueado? ----
   El estado real lo lleva activacion.js: el código se valida contra
   Firestore y queda asociado a este dispositivo. */
function premiumDesbloqueado() {
  try {
    return window.MS360Activacion
      ? window.MS360Activacion.activado()
      : localStorage.getItem("ms360maestra_activado") === "1";
  } catch (e) {
    return false;
  }
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
  // Al activar con un código válido, abrimos la calculadora que se pidió.
  window.MS360_onActivado = () => {
    window.MS360_onActivado = null;
    abrirApp(key);
  };

  if (window.MS360Activacion) {
    window.MS360Activacion.abrir();
  } else {
    alert("Esta calculadora es PRO. Necesitas un código de activación.");
  }
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
  window.open("privacidad/index.html", "_blank");
});
document.getElementById("open-terms").addEventListener("click", () => {
  window.open("terminos/index.html", "_blank");
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
