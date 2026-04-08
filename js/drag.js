let dragSrc = null;

function initDrag() {
  const targets = [
    "d-company",
    "d-name",
    "d-job",
    "d-sep",
    "logo-r",
    "qr-recto",
    "d-phone",
    "d-email",
    "d-site",
    "logo-v",
    "d-vcompany",
    "d-vsep",
    "d-accroche",
  ];
  targets.forEach((id) => {
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
