const fs = require('fs')
const path = require('path');
const { createCanvas } = require('canvas')
const { makeOutputDir, registerCanvasFonts } = require('./helpers');

registerCanvasFonts()

const outputDir = path.join(__dirname, '..', 'images');
makeOutputDir(outputDir);

const canvasWidth = 500;
const canvasHeight = 500;
const canvas = createCanvas(canvasWidth, canvasHeight);
const ctx = canvas.getContext('2d')

ctx.textBaseline = "middle";
ctx.textAlign = "center";

const drawText = (fontFamily, text) => {
  let fontSize = 10;
  ctx.font = `${fontSize}px ${fontFamily}`;
  while (ctx.measureText(text).width < canvasWidth) {
    fontSize++;
    ctx.font = `${fontSize}px ${fontFamily}`;
  }
  let finalFontSize = fontSize - 1;
  console.log(fontFamily, finalFontSize);
  ctx.font = `${finalFontSize}px ${fontFamily}`;
  ctx.fillText(text, canvasWidth/2, canvasHeight/2);
}

drawText('ubuntu-300', 'Texto de prueba');
ctx.globalCompositeOperation = 'xor';
drawText('roboto-300', 'Texto de prueba');

const outputFile = path.join(outputDir, 'test-diff.png');
const out = fs.createWriteStream(outputFile);
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () =>  console.log('The PNG file was created.'));
