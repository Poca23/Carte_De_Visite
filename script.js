const gm = {};
const hist = [];
let cur = -1;

function snapshot() {
  const s = {};
  document
    .querySelectorAll("input[type=text],input[type=color]")
    .forEach((i) => {
      s[i.id] = i.value;
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
}
function restore(s) {
  document
    .querySelectorAll("input[type=text],input[type=color]")
    .forEach((i) => {
      if (s[i.id] !== undefined) i.value = s[i.id];
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
function v(id) {
  const e = document.getElementById(id);
  return e ? e.value : "";
}
function el(id) {
  return document.getElementById(id);
}

function applyTextColor(d, k) {
  if (!d) return;
  const c1 = v("c-" + k),
    c2 = v("c-" + k + "2");
  if (gm[k] && c1 !== c2) {
    d.style.backgroundImage = "linear-gradient(135deg," + c1 + "," + c2 + ")";
    d.style.webkitBackgroundClip = "text";
    d.style.webkitTextFillColor = "transparent";
    d.style.backgroundClip = "text";
    d.style.color = "";
  } else {
    d.style.backgroundImage = "";
    d.style.webkitBackgroundClip = "";
    d.style.webkitTextFillColor = "";
    d.style.backgroundClip = "";
    d.style.color = c1;
  }
}
function applyBg(d, k, dir) {
  if (!d) return;
  const c1 = v("c-" + k),
    c2 = v("c-" + k + "2");
  d.style.background =
    gm[k] && c1 !== c2
      ? "linear-gradient(" + (dir || "135deg") + "," + c1 + "," + c2 + ")"
      : c1;
}
function loadImg(input, tid) {
  const f = input.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = (e) => {
    const isV = tid === "logo-v",
      img = document.createElement("img");
    img.id = tid;
    img.src = e.target.result;
    img.style.cssText = isV
      ? "max-width:90px;max-height:55px;object-fit:contain"
      : "width:52px;height:52px;object-fit:contain;border-radius:6px";
    el(tid).replaceWith(img);
  };
  r.readAsDataURL(f);
}

function update() {
  applyBg(el("card-recto"), "bg-r", "135deg");
  applyBg(el("sidebar"), "sb", "180deg");
  applyBg(el("card-verso"), "bg-v", "135deg");
  const brd =
    "linear-gradient(180deg," +
    v("c-ab1") +
    "," +
    v("c-ab2") +
    "," +
    v("c-ab3") +
    ")";
  ["wrap-recto", "wrap-verso"].forEach((id) => {
    el(id).style.background = brd;
  });
  const s1 = v("c-sep"),
    s2 = v("c-sep2");
  el("d-sep").style.background =
    s1 === s2
      ? "rgba(255,255,255,.15)"
      : "linear-gradient(90deg," + s1 + "," + s2 + ")";
  el("d-vsep").style.background =
    "linear-gradient(90deg," +
    v("c-vsep1") +
    "," +
    v("c-vsep2") +
    "," +
    v("c-vsep3") +
    ")";
  el("sidebar").style.borderRight = "1px solid " + v("c-sb-border");
  ["company", "name", "job", "phone", "email", "site"].forEach((k) => {
    const d = el("d-" + k);
    if (d) {
      d.textContent = v(k);
      applyTextColor(d, k);
    }
  });
  ["ic1", "ic2", "ic3"].forEach((id) => applyTextColor(el(id), "ic"));
  ["vcompany", "accroche"].forEach((k) => {
    const d = el("d-" + k);
    if (d) {
      d.textContent = v(k);
      applyTextColor(d, k);
    }
  });
  ["msg1", "msg2"].forEach((k) => {
    const t = el("d-" + k);
    t.textContent = v(k);
    const c1 = v("c-" + k),
      c2 = v("c-" + k + "2");
    if (gm[k] && c1 !== c2) {
      t.style.borderImage = "linear-gradient(135deg," + c1 + "," + c2 + ") 1";
      t.style.borderColor = "";
    } else {
      t.style.borderImage = "";
      t.style.borderColor = c1;
    }
    applyTextColor(t, k);
  });
  const qd = el("qr-recto");
  qd.innerHTML = "";
  new QRCode(qd, {
    text: v("qr-url") || "https://portfolio-cnd.netlify.app/",
    width: 50,
    height: 50,
    colorDark: "#111",
    colorLight: "#eee",
  });
}

let debounceT;
document.getElementById("left").addEventListener("input", (e) => {
  if (e.target.type === "file") return;
  update();
  clearTimeout(debounceT);
  debounceT = setTimeout(save, 600);
});

document.querySelectorAll('[id$="2"]').forEach((e) => {
  if (e.type === "color") e.style.opacity = "0.3";
});
save();
update();

// ── Drag & Drop swap ──
let dragSrc = null;

function initDrag() {
  const targets = [
    "d-company",
    "d-name",
    "d-job",
    "d-sep", // recto main
    "logo-r",
    "qr-recto", // recto sidebar
    "d-phone",
    "d-email",
    "d-site", // contacts (spans parents)
    "logo-v",
    "d-vcompany",
    "d-vsep", // verso
    "d-accroche",
    "d-msg1",
    "d-msg2",
  ];

  targets.forEach((id) => {
    // Pour les contacts on prend le .contact parent
    let node = document.getElementById(id);
    if (!node) return;
    if (["d-phone", "d-email", "d-site"].includes(id))
      node = node.closest(".contact") || node;

    node.setAttribute("draggable", true);
    node.dataset.dndId = id;

    node.addEventListener("dragstart", (e) => {
      dragSrc = node;
      e.dataTransfer.effectAllowed = "move";
    });
    node.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (node !== dragSrc) node.classList.add("drag-over");
    });
    node.addEventListener("dragleave", () =>
      node.classList.remove("drag-over"),
    );
    node.addEventListener("drop", (e) => {
      e.preventDefault();
      node.classList.remove("drag-over");
      if (!dragSrc || dragSrc === node) return;
      swapNodes(dragSrc, node);
      save();
    });
    node.addEventListener("dragend", () => node.classList.remove("drag-over"));
  });
}

function swapNodes(a, b) {
  const pa = a.parentNode,
    pb = b.parentNode;
  const sa = document.createComment(""),
    sb = document.createComment("");
  pa.insertBefore(sa, a);
  pb.insertBefore(sb, b);
  pa.insertBefore(b, sa);
  pb.insertBefore(a, sb);
  sa.remove();
  sb.remove();
}

initDrag();

function resizeImg(id, val) {
  const node = document.getElementById(id);
  if (!node || node.tagName !== "IMG") return;
  node.style.maxWidth = val + "px";
  node.style.maxHeight = val + "px";
  save();
}
