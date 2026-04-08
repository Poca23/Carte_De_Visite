function loadImg(input, tid) {
  const f = input.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = e => {
    const img = document.createElement("img");
    img.id = tid; img.src = e.target.result;
    img.style.cssText = tid === "logo-v" ? "max-width:90px;max-height:55px;object-fit:contain" : "width:52px;height:52px;object-fit:contain;border-radius:6px";
    document.getElementById(tid).replaceWith(img);
  };
  r.readAsDataURL(f);
}

function resizeImg(id, val) {
  const node = document.getElementById(id);
  if (!node || node.tagName !== "IMG") return;
  node.style.maxWidth = val + "px";
  node.style.maxHeight = val + "px";
  save();
}
