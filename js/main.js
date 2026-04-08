// Point d'entrée — charge les modules dans l'ordre
const _scripts = ["js/history.js", "js/render.js", "js/media.js", "js/drag.js"];

function _load(i) {
  if (i >= _scripts.length) return _boot();
  const s = document.createElement("script");
  s.src = _scripts[i];
  s.onload = () => _load(i + 1);
  document.head.appendChild(s);
}

function _boot() {
  document.querySelectorAll('[id$="2"]').forEach(e => { if (e.type === "color") e.style.opacity = "0.3"; });
  const saved = localStorage.getItem("cnd_card");
  if (saved) { hist.push(JSON.parse(saved)); cur = 0; restore(hist[0]); }
  else { save(); update(); }
  let debounceT;
  document.getElementById("left").addEventListener("input", e => {
    if (e.target.type === "file") return;
    update();
    clearTimeout(debounceT);
    debounceT = setTimeout(save, 600);
  });
  initDrag();
}

_load(0);
