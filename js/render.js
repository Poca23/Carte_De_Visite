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

// ✅ Gestion visibilité — 1 fonction, 1 ligne par élément
function vis(checkId, targetId) {
  const t = el(targetId);
  if (t) t.style.display = el(checkId)?.checked ? "" : "none";
}

function update() {
  applyBg(el("card-recto"), "bg-r", "135deg");
  applyBg(el("sidebar"), "sb", "180deg");
  applyBg(el("card-verso"), "bg-v", "135deg");
  const r = v("c-radius") + "px";
  ["card-recto", "card-verso"].forEach((id) => {
    el(id).style.borderRadius = r;
  });

  ["card-recto", "card-verso"].forEach((id) => {
    const ck1 = el("ck-ab1")?.checked,
      ck2 = el("ck-ab2")?.checked,
      ck3 = el("ck-ab3")?.checked;
    const cols = [
      ck1 && v("c-ab1"),
      ck2 && v("c-ab12"),
      ck3 && v("c-ab13"),
    ].filter(Boolean);
    const grad =
      cols.length > 1
        ? "linear-gradient(135deg," + cols.join(",") + ")"
        : cols[0] || "#89bdd3";
    el(id).style.setProperty("--card-border", grad);
  });

  const s1 = v("c-sep"),
    s2 = v("c-sep2");
  el("d-sep").style.background =
    gm["sep"] && s1 !== s2
      ? "linear-gradient(90deg," + s1 + "," + s2 + ")"
      : s1;
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
    const d = el("d-" + k),
      i = el(k);
    if (d) {
      d.textContent = v(k) || (i && i.placeholder) || "";
      applyTextColor(d, k);
    }
  });
  ["ic1", "ic2", "ic3"].forEach((id) => applyTextColor(el(id), "ic"));
  ["vcompany", "accroche"].forEach((k) => {
    const d = el("d-" + k),
      i = el(k);
    if (d) {
      d.textContent = v(k) || (i && i.placeholder) || "";
      applyTextColor(d, k);
    }
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

  // ✅ Visibilité — 1 ligne par élément
  vis("vis-sidebar", "sidebar");
  vis("vis-logo-r", "logo-r");
  vis("vis-qr", "qr-recto");
  vis("vis-company", "d-company");
  vis("vis-name", "d-name");
  vis("vis-job", "d-job");
  vis("vis-sep", "d-sep");
  vis("vis-phone", "d-phone");
  vis("vis-email", "d-email");
  vis("vis-site", "d-site");
  vis("vis-logo-v", "logo-v");
  vis("vis-vcompany", "d-vcompany");
  vis("vis-vsep", "d-vsep");
  vis("vis-accroche", "d-accroche");
}
