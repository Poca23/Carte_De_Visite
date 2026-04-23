async function exportPNG() {
  const r = document.getElementById("card-recto");
  const v = document.getElementById("card-verso");

  const [cr, cv] = await Promise.all([
    html2canvas(r, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    }),
    html2canvas(v, {
      scale: 3,
      useCORS: true,
      logging: false,
      backgroundColor: null,
    }),
  ]);

  const gap = 60;
  const pad = 60;
  const out = document.createElement("canvas");
  out.width = Math.max(cr.width, cv.width) + pad * 2;
  out.height = cr.height + cv.height + gap + pad * 2;

  const ctx = out.getContext("2d");
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(cr, pad, pad);
  ctx.drawImage(cv, pad, pad + cr.height + gap);

  const a = document.createElement("a");
  a.download = "cartes-cnd.png";
  a.href = out.toDataURL("image/png");
  a.click();
}
