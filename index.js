const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')

const width = 1080
const height = 1080

const canvas = createCanvas(width, height)
const context = canvas.getContext('2d')

loadImage('bkgd/0'+(Math.floor(Math.random()*9)+1)+'.jpg').then(image => {
    // sx,sy,swidth,sheight,x,y,width,height
    context.drawImage(image, Math.floor(Math.random()*3920), Math.floor(Math.random()*3920), width, height, 0, 0, width, height)
  })

context.font = 'bold 70pt Menlo'
context.textAlign = 'center'
context.textBaseline = 'top'
context.fillStyle = '#000'

const text = 'Hello, World!'

const textWidth = context.measureText(text).width
// context.fillRect(width - textWidth / 2 - 10, 170 - 5, textWidth + 20, 120)
// context.fillStyle = '#000'
// console.log((width - textWidth) / 2);
context.fillText(text, 0, 170)

// context.fillStyle = '#000'
// context.font = 'bold 30pt Menlo'
// context.fillText('flaviocopes.com', 600, 530)

loadImage('./logo.png').then(image => {
  context.drawImage(image, 78, 515, 923, 239)
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync('./ig.png', buffer)
})