const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

class App {
  constructor() {
    this.canvas = document.getElementById('jsCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.colors = document.getElementsByClassName('jsColor');
    this.range = document.getElementById('jsRange');
    this.mode = document.getElementById('jsMode');
    this.saveBtn = document.getElementById('jsSave');

    this.painting = false;
    this.filling = false;

    this.renderCanvas();
    this.setEvent();
  }

  renderCanvas() {
    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;

    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    this.ctx.strokeStyle = INITIAL_COLOR;
    this.ctx.fillStyle = INITIAL_COLOR;
    this.ctx.lineWidth = 2.5;
  }

  handleStopPainting = () => {
    this.painting = false;
  };
  handleStartPainting = () => {
    this.painting = true;
  };
  handleMouseMove = event => {
    const x = event.offsetX;
    const y = event.offsetY;

    if (!this.painting) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
    } else {
      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    }
  };
  handleColorClick = event => {
    const color = event.target.style.backgroundColor;
    this.ctx.strokeStyle = color;
    this.fillStyle = color;
  };
  handleRangeChange = event => {
    const size = event.target.value;
    this.ctx.lineWidth = size;
  };
  handleModeClick = () => {
    if (this.filling) {
      this.filling = false;
      this.mode.innerText = 'Fill';
    } else {
      this.filling = true;
      this.mode.innerHTML = 'paint';
    }
  };
  handleCanvasClick = () => {
    if (this.filling) {
      this.ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  };
  handleCM = event => {
    event.preventDefault();
  };
  handleSaveClick = () => {
    const image = this.canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS[EXPORT]';
    link.click();
  };

  setEvent() {
    console.log(this.colors);
    Array.from(this.colors).forEach(color =>
      color.addEventListener('click', this.handleColorClick)
    );

    if (this.canvas) {
      console.log(this.canvas);
      this.canvas.addEventListener('mousemove', this.handleMouseMove);
      this.canvas.addEventListener('mousedown', this.handleStartPainting);
      this.canvas.addEventListener('mouseup', this.handleStopPainting);
      this.canvas.addEventListener('mouseleave', this.handleStopPainting);
      this.canvas.addEventListener('click', this.handleCanvasClick);
      this.canvas.addEventListener('contextmenu', this.handleCM);
    }
    if (this.range) {
      this.range.addEventListener('input', this.handleRangeChange);
    }
    if (this.mode) {
      this.mode.addEventListener('click', this.handleModeClick);
    }
    if (this.saveBtn) {
      this.saveBtn.addEventListener('click', this.handleSaveClick);
    }
  }
}

new App();
