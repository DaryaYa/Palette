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

let img = document.getElementById('#img');

function drawPic() {
    img.onload;
    ctx.drawImage(img, 0, 0, 512, 512);
}

function fourByFour(frame, ctx) {
    let scale1 = 512 / 4;
    frame.forEach((raw, i) => {
        raw.forEach((column, j) => {
            ctx.fillStyle = '#' + column;
            ctx.fillRect(j * scale1, i * scale1, (j + 1) * scale1, (i + 1) * scale1);
        });
    });
}

function draw32x32(frame, ctx) {
    let scale1 = 512 / 32;
    frame.forEach((raw, i) => {
        raw.forEach((column, j) => {
            ctx.fillStyle = 'rgba(' + column[0] + ',' + column[1] + ',' + column[2] + ')';
            ctx.fillRect(j * scale1, i * scale1, (j + 1) * scale1, (i + 1) * scale1);
        });
    });
}

let draw32 = document.querySelector('.draw32x32');

draw32.onclick = () => fetch('./data/32x32.json')
    .then(response => response.json().then(json => draw32x32(json, ctx)));

let draw4x4 = document.querySelector('.draw4x4');

draw4x4.onclick = () => fetch('./data/4x4.json')
    .then(response => response.json().then(json => fourByFour(json, ctx)));

let pic = document.querySelector('.pic');

pic.addEventListener('click', drawPic);

document.addEventListener('keydown', (event) => {
    if (event.code === 'KeyP') {
        draw();
    }
});

let red = document.querySelector('.red');
let blue = document.querySelector('.blue');
red.onclick = () => color = 'red';
blue.onclick = () => color = 'blue';
//let currentColor = document.querySelector('.current-color');

/*
 * Canvas.onclick = function(event) {
 *     let x = event.pageX;
 *     let y = event.pageY;
 *     // Look what color the pixel at the screenshot is
 *     let p = ctx.getImageData(x, y, 1, 1).data;
 *     console.log('rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')');
 * };
 */
let preview = document.querySelector('.preview');
let x = '';
let y = '';

canvas.addEventListener('mousedown', (e) => {
    [x, y] = [e.offsetX, e.offsetY];
    let p = ctx.getImageData(x, y, 1, 1).data;
    preview.style.background = 'rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')';
    console.log('rgb(' + p[0] + ',' + p[1] + ',' + p[2] + ')');

});