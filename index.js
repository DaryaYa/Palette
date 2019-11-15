/* eslint-disable no-console */
const canvas = document.getElementById('#draw');
const ctx = canvas.getContext('2d');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '30';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let color = 'green';
const currentColor = document.querySelector('.current-color');
const prevColor = document.querySelector('.prev-color');
const pencil = document.querySelector('.pencil');
const colorPicker = document.querySelector('.colorPicker');


function draw(e) {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.strokeStyle = color;

  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

const img = document.getElementById('#img');

function drawPic() {
  img.onload;
  ctx.drawImage(img, 0, 0, 512, 512);
}

function fourByFour(frame, ctx) {
  const scale1 = 512 / 4;
  frame.forEach((raw, i) => {
    raw.forEach((column, j) => {
      ctx.fillStyle = `#${column}`;
      ctx.fillRect(j * scale1, i * scale1, (j + 1) * scale1, (i + 1) * scale1);
    });
  });
}

function draw32x32(frame, ctx) {
  const scale1 = 512 / 32;
  frame.forEach((raw, i) => {
    raw.forEach((column, j) => {
      ctx.fillStyle = `rgba(${column[0] },${column[1] },${column[2] })`;
      ctx.fillRect(j * scale1, i * scale1, (j + 1) * scale1, (i + 1) * scale1);
    });
  });
}

const draw32 = document.querySelector('.draw32x32');

draw32.onclick = () => fetch('./data/32x32.json')
  .then((response) => response.json().then((json) => draw32x32(json, ctx)));

const draw4x4 = document.querySelector('.draw4x4');

draw4x4.onclick = () => fetch('./data/4x4.json')
  .then((response) => response.json().then((json) => fourByFour(json, ctx)));

const pic = document.querySelector('.pic');

pic.addEventListener('click', drawPic);

document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyP') {
    setTimeout(() => {
      pencil.classList.toggle('active');
    }, 1000);

    currentColor.style.backgroundColor = preview.style.background;
    color = currentColor.style.backgroundColor;
    draw();
  }
});
pencil.addEventListener('click', () => {
  currentColor.style.backgroundColor = preview.style.background;
  color = currentColor.style.backgroundColor;
  draw();
});

const red = document.querySelector('.red');
const blue = document.querySelector('.blue');
red.onclick = () => {
  preview.style.background = currentColor.style.backgroundColor;
  currentColor.style.backgroundColor = 'red';
  color = 'red';
};
blue.onclick = () => {
  preview.style.background = currentColor.style.backgroundColor;
  currentColor.style.backgroundColor = 'blue';
  color = 'blue';
};

let preview = document.querySelector('.preview');
let x = '';
let y = '';

canvas.addEventListener('mousedown', (e) => {
  [x, y] = [e.offsetX, e.offsetY];
  const p = ctx.getImageData(x, y, 1, 1).data;
  preview.style.background = `rgb(${p[0]},${p[1]},${p[2]})`;
  console.log(`rgb(${p[0]},${p[1]},${p[2]})`);
});


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
const clear = document.querySelector('.clear');
clear.addEventListener('click', clearCanvas);
