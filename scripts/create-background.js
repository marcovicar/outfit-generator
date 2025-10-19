const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure assets directory exists
const assetsDir = path.join(__dirname, '../public/assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function createBackgroundImage() {
  const canvas = createCanvas(800, 600);
  const ctx = canvas.getContext('2d');
  
  // Light gray background
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(0, 0, 800, 600);
  
  // Title bar gradient (dark blue)
  const titleGradient = ctx.createLinearGradient(0, 0, 800, 0);
  titleGradient.addColorStop(0, '#000080');
  titleGradient.addColorStop(1, '#0000ff');
  
  ctx.fillStyle = titleGradient;
  ctx.fillRect(0, 0, 800, 30);
  
  // Title text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px "MS Sans Serif", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('What should I wear today?', 400, 20);
  
  // Menu bar
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(0, 30, 800, 20);
  
  // Menu items
  ctx.fillStyle = '#000000';
  ctx.font = '11px "MS Sans Serif", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('File', 10, 44);
  ctx.fillText('Edit', 50, 44);
  ctx.fillText('View', 90, 44);
  ctx.fillText('Help', 130, 44);
  
  // Content area border (inset effect)
  ctx.strokeStyle = '#808080';
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 52, 796, 546);
  
  // Inner content area
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(4, 54, 792, 542);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, 'background.png'), buffer);
  console.log('Created background.png');
}

// Generate background image
console.log('Generating background image...');
createBackgroundImage();
console.log('Background image generated successfully!');
