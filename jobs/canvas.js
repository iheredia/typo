const fs = require('fs')
const path = require('path');
const { createCanvas } = require('canvas')
const { makeOutputDir, registerCanvasFonts } = require('./helpers');

registerCanvasFonts()

const outputDir = path.join(__dirname, '..', 'images');
makeOutputDir(outputDir);

const canvas = createCanvas(200, 200)
const ctx = canvas.getContext('2d')

ctx.font = '30px ubuntu-300'
ctx.fillText('Awesome!', 0, 0)

var text = ctx.measureText('Awesome!')
ctx.strokeStyle = 'rgba(0,0,0,0.5)'
ctx.beginPath()
ctx.lineTo(50, 102)
ctx.lineTo(50 + text.width, 102)
ctx.stroke()

const outputFile = path.join(outputDir, 'test-ubuntu2.png');
const out = fs.createWriteStream(outputFile)
const stream = canvas.createPNGStream()
stream.pipe(out)
out.on('finish', () =>  console.log('The PNG file was created.'))
