function v(id) { const e = document.getElementById(id); return e ? e.value : ""; }
function el(id) { return document.getElementById(id); }

function applyTextColor(d, k) {
  if (!d) return;
  const c1 = v("c-" + k), c2 = v("c-" + k + "2");
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
  const c1 = v("c-" + k), c2 = v("c-" + k + "2");
  d.style.background = gm[k] && c1 !== c2 ? "linear-gradient(" + (dir || "135deg") + "," + c1 + "," + c2 + ")" : c1;
}

function update() {
  applyBg(el("card-recto"), "bg-r", "135deg");
  applyBg(el("sidebar"), "sb", "180deg");
  applyBg(el("card-verso"), "bg-v", "135deg");
  ["card-recto", "card-verso"].forEach(id => { el(id).style.outline = "3px solid"; el(id).style.outlineColor = v("c-ab1"); });
  const s1 = v("c-sep"), s2 = v("c-sep2");
  el("d-sep").style.background = gm["sep"] && s1 !== s2 ? "linear-gradient(90deg," + s1 + "," + s2 + ")" : s1;
  el("d-vsep").style.background = "linear-gradient(90deg," + v("c-vsep1") + "," + v("c-vsep2") + "," + v("c-vsep3") + ")";
  el("sidebar").style.borderRight = "1px solid " + v("c-sb-border");
  ["company","name","job","phone","email","site"].forEach(k => { const d = el("d-"+k); if(d){ d.textContent = v(k); applyTextColor(d,k); } });
  ["ic1","ic2","ic3"].forEach(id => applyTextColor(el(id), "ic"));
  ["vcompany","accroche"].forEach(k => { const d = el("d-"+k); if(d){ d.textContent = v(k); applyTextColor(d,k); } });
  ["msg1","msg2"].forEach(k => {
    const t = el("d-"+k);
    if (!t) return;
    t.textContent = v(k);
    const c1 = v("c-"+k), c2 = v("c-"+k+"2");
    if (gm[k] && c1 !== c2) { t.style.borderImage = "linear-gradient(135deg,"+c1+","+c2+") 1"; t.style.borderColor = ""; }
    else { t.style.borderImage = ""; t.style.borderColor = c1; }
    applyTextColor(t, k);
  });
  const qd = el("qr-recto");
  qd.innerHTML = "";
  new QRCode(qd, { text: v("qr-url") || "https://portfolio-cnd.netlify.app/", width: 50, height: 50, colorDark: "#111", colorLight: "#eee" });
}
