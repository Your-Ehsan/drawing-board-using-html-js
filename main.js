document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("drawing-board");
  const context = canvas.getContext("2d");
  let isDrawing = false;

  function startDrawing(e) {
    isDrawing = true;
    draw(e);
  }

  function stopDrawing() {
    isDrawing = false;
    context.beginPath();
  }

  function draw(e) {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e;
    context.lineWidth = 5;
    context.lineCap = "round";
    context.strokeStyle = "#000";

    context.lineTo(offsetX, offsetY);
    context.stroke();
    context.beginPath();
    context.moveTo(offsetX, offsetY);
  }

  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", stopDrawing);
  canvas.addEventListener("mousemove", draw);

  const downloadButton = document.getElementById("download-button");
  downloadButton.addEventListener("click", () => {
    const dataUrl = canvas.toDataURL("image/webp");
    const a = document.createElement("a");
    Object.assign(a, { href: dataUrl, download: "drawing.webp" });
    a.click();
  });
});
