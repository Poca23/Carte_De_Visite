const gm = {};
const hist = [];
let cur = -1;

function snapshot() {
  const s = {};
  document
    .querySelectorAll(
      "input[type=text],input[type=color],input[type=range],input[type=checkbox]",
    )
    .forEach((i) => {
      s[i.id] = i.type === "checkbox" ? i.checked : i.value;
    });
  Object.keys(gm).forEach((k) => {
    s["__gm__" + k] = gm[k];
  });
  return s;
}

function save() {
  hist.splice(cur + 1);
  hist.push(snapshot());
  if (hist.length > 50) hist.shift();
  cur = hist.length - 1;
  localStorage.setItem("cnd_card", JSON.stringify(hist[cur]));
}

function restore(s) {
  document
    .querySelectorAll(
      "input[type=text],input[type=color],input[type=range],input[type=checkbox]",
    )
    .forEach((i) => {
      if (s[i.id] === undefined) return;
      i.type === "checkbox" ? (i.checked = s[i.id]) : (i.value = s[i.id]);
    });
  Object.keys(gm).forEach((k) => delete gm[k]);
  Object.keys(s)
    .filter((k) => k.startsWith("__gm__"))
    .forEach((k) => {
      gm[k.slice(6)] = s[k];
    });
  document.querySelectorAll('[id$="2"]').forEach((e) => {
    if (e.type === "color")
      e.style.opacity = gm[e.id.slice(2, -1)] ? "1" : "0.3";
  });
  update();
}

function undo() {
  if (cur > 0) {
    cur--;
    restore(hist[cur]);
  }
}
function redo() {
  if (cur < hist.length - 1) {
    cur++;
    restore(hist[cur]);
  }
}

function tg(k) {
  gm[k] = !gm[k];
  const e = document.getElementById("c-" + k + "2");
  if (e) e.style.opacity = gm[k] ? "1" : "0.3";
  save();
  update();
}
