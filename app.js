const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // clientX,Y offsetX,Y
  // 차이점은 client는 browser screen size에 대한 좌표, offset은 해당 영역(여기서는 canvas)에 대한 좌표 값
  // 마우스가 움직이는 동안 계속 이벤트는 발생
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerHTML = 'paint';
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[EXPORT👀]';
  link.click();
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', startPainting)
  canvas.addEventListener('mouseup', stopPainting)
  canvas.addEventListener('mouseleave', stopPainting)
  canvas.addEventListener('click', handleCanvasClick)
  canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if (range) {
  range.addEventListener('input', handleRangeChange)
}

if (mode) {
  mode.addEventListener('click', handleModeClick)
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick)
}