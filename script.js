const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const colorPicker = document.getElementById("color");
const sizePicker = document.getElementById("size");
const eraserButton = document.getElementById("eraser");
const clearButton = document.getElementById("clear");
const glowButton = document.getElementById("glow");

let isDrawing = false;
let isErasing = false;
let glowEnabled = false;

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);
canvas.addEventListener("mousemove", draw);

eraserButton.addEventListener("click", () => {
  isErasing = !isErasing;
  eraserButton.classList.toggle("active");
});

clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

glowButton.addEventListener("click", () => {
  glowEnabled = !glowEnabled;
  glowButton.textContent = glowEnabled ? "✨ On" : "✨ Off";
});

function startDraw(e) {
  isDrawing = true;
  draw(e);
}

function stopDraw() {
  isDrawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!isDrawing) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = sizePicker.value;
  ctx.lineCap = "round";
  ctx.strokeStyle = isErasing ? "#ffffff" : colorPicker.value;

  if (glowEnabled && !isErasing) {
    ctx.shadowColor = colorPicker.value;
    ctx.shadowBlur = 10;
  } else {
    ctx.shadowBlur = 0;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}
