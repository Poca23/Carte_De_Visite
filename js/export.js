// js/export.js
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

  const gap = 30;
  const out = document.createElement("canvas");
  out.width = cr.width + cv.width + gap;
  out.height = Math.max(cr.height, cv.height) + 40;

  const ctx = out.getContext("2d");
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, out.width, out.height);
  ctx.drawImage(cr, 0, 20);
  ctx.drawImage(cv, cr.width + gap, 20);

  const a = document.createElement("a");
  a.download = "cartes-cnd.png";
  a.href = out.toDataURL("image/png");
  a.click();
}
