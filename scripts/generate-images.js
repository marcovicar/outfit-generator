const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure directories exist
const assetsDir = path.join(__dirname, '../public/assets');
const topsDir = path.join(assetsDir, 'tops');
const bottomsDir = path.join(assetsDir, 'bottoms');

[assetsDir, topsDir, bottomsDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

function createPersonImage() {
  const canvas = createCanvas(163, 331);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#F0F0F0';
  ctx.fillRect(0, 0, 163, 331);
  
  // Head
  ctx.fillStyle = '#FFDBAC';
  ctx.beginPath();
  ctx.arc(81.5, 60, 25, 0, 2 * Math.PI);
  ctx.fill();
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Body (yellow shirt)
  ctx.fillStyle = '#FFFF00';
  ctx.fillRect(60, 90, 43, 60);
  ctx.strokeRect(60, 90, 43, 60);
  
  // Arms
  ctx.fillStyle = '#FFDBAC';
  ctx.fillRect(40, 100, 20, 40);
  ctx.strokeRect(40, 100, 20, 40);
  ctx.fillRect(103, 100, 20, 40);
  ctx.strokeRect(103, 100, 20, 40);
  
  // Legs (blue pants)
  ctx.fillStyle = '#0000FF';
  ctx.fillRect(65, 150, 15, 80);
  ctx.strokeRect(65, 150, 15, 80);
  ctx.fillRect(83, 150, 15, 80);
  ctx.strokeRect(83, 150, 15, 80);
  
  // Feet
  ctx.fillStyle = '#000000';
  ctx.fillRect(60, 230, 25, 15);
  ctx.strokeRect(60, 230, 25, 15);
  ctx.fillRect(78, 230, 25, 15);
  ctx.strokeRect(78, 230, 25, 15);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(assetsDir, 'person.png'), buffer);
  console.log('Created person.png');
}

function createTop1() {
  const canvas = createCanvas(80, 80);
  const ctx = canvas.getContext('2d');
  
  // Transparent background
  ctx.clearRect(0, 0, 80, 80);
  
  // Black sleeveless top
  ctx.fillStyle = '#000000';
  ctx.fillRect(10, 20, 60, 50);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 20, 60, 50);
  
  // White buttons
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(40, 30, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(40, 40, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(40, 50, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(40, 60, 2, 0, 2 * Math.PI);
  ctx.fill();
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(topsDir, 'top_1.png'), buffer);
  console.log('Created top_1.png');
}

function createTop2() {
  const canvas = createCanvas(80, 80);
  const ctx = canvas.getContext('2d');
  
  // Transparent background
  ctx.clearRect(0, 0, 80, 80);
  
  // White button shirt
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(10, 15, 60, 55);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 15, 60, 55);
  
  // Collar
  ctx.beginPath();
  ctx.moveTo(30, 15);
  ctx.lineTo(40, 25);
  ctx.lineTo(50, 15);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Black buttons
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(40, 30, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(40, 40, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(40, 50, 2, 0, 2 * Math.PI);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(40, 60, 2, 0, 2 * Math.PI);
  ctx.fill();
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(topsDir, 'top_2.png'), buffer);
  console.log('Created top_2.png');
}

function createTop3() {
  const canvas = createCanvas(80, 80);
  const ctx = canvas.getContext('2d');
  
  // Transparent background
  ctx.clearRect(0, 0, 80, 80);
  
  // Red tank top
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(15, 25, 50, 40);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.strokeRect(15, 25, 50, 40);
  
  // Straps
  ctx.fillRect(20, 20, 8, 15);
  ctx.strokeRect(20, 20, 8, 15);
  ctx.fillRect(52, 20, 8, 15);
  ctx.strokeRect(52, 20, 8, 15);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(topsDir, 'top_3.png'), buffer);
  console.log('Created top_3.png');
}

function createBottom1() {
  const canvas = createCanvas(80, 80);
  const ctx = canvas.getContext('2d');
  
  // Transparent background
  ctx.clearRect(0, 0, 80, 80);
  
  // Blue wide leg jeans
  ctx.fillStyle = '#0000FF';
  ctx.fillRect(5, 10, 70, 60);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.strokeRect(5, 10, 70, 60);
  
  // Waistband
  ctx.fillStyle = '#000080';
  ctx.fillRect(5, 10, 70, 8);
  ctx.strokeRect(5, 10, 70, 8);
  
  // Pockets
  ctx.fillStyle = '#000080';
  ctx.fillRect(15, 20, 12, 15);
  ctx.strokeRect(15, 20, 12, 15);
  ctx.fillRect(53, 20, 12, 15);
  ctx.strokeRect(53, 20, 12, 15);
  
  // Leg separation
  ctx.beginPath();
  ctx.moveTo(40, 25);
  ctx.lineTo(40, 70);
  ctx.stroke();
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(bottomsDir, 'bottom_1.png'), buffer);
  console.log('Created bottom_1.png');
}

function createBottom2() {
  const canvas = createCanvas(80, 80);
  const ctx = canvas.getContext('2d');
  
  // Transparent background
  ctx.clearRect(0, 0, 80, 80);
  
  // Black pants
  ctx.fillStyle = '#000000';
  ctx.fillRect(10, 10, 60, 60);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 10, 60, 60);
  
  // Waistband
  ctx.fillStyle = '#333333';
  ctx.fillRect(10, 10, 60, 8);
  ctx.strokeRect(10, 10, 60, 8);
  
  // Belt loops
  ctx.fillStyle = '#666666';
  ctx.fillRect(20, 8, 4, 4);
  ctx.strokeRect(20, 8, 4, 4);
  ctx.fillRect(30, 8, 4, 4);
  ctx.strokeRect(30, 8, 4, 4);
  ctx.fillRect(40, 8, 4, 4);
  ctx.strokeRect(40, 8, 4, 4);
  ctx.fillRect(50, 8, 4, 4);
  ctx.strokeRect(50, 8, 4, 4);
  
  // Leg separation
  ctx.beginPath();
  ctx.moveTo(40, 25);
  ctx.lineTo(40, 70);
  ctx.stroke();
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(bottomsDir, 'bottom_2.png'), buffer);
  console.log('Created bottom_2.png');
}

function createBottom3() {
  const canvas = createCanvas(80, 80);
  const ctx = canvas.getContext('2d');
  
  // Transparent background
  ctx.clearRect(0, 0, 80, 80);
  
  // Gray shorts
  ctx.fillStyle = '#808080';
  ctx.fillRect(15, 10, 50, 35);
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 1;
  ctx.strokeRect(15, 10, 50, 35);
  
  // Waistband
  ctx.fillStyle = '#666666';
  ctx.fillRect(15, 10, 50, 8);
  ctx.strokeRect(15, 10, 50, 8);
  
  // Pockets
  ctx.fillStyle = '#666666';
  ctx.fillRect(20, 20, 10, 12);
  ctx.strokeRect(20, 20, 10, 12);
  ctx.fillRect(50, 20, 10, 12);
  ctx.strokeRect(50, 20, 10, 12);
  
  // Leg openings
  ctx.beginPath();
  ctx.ellipse(25, 45, 8, 3, 0, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(55, 45, 8, 3, 0, 0, 2 * Math.PI);
  ctx.stroke();
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(bottomsDir, 'bottom_3.png'), buffer);
  console.log('Created bottom_3.png');
}

// Generate all images
console.log('Generating PNG images...');
createPersonImage();
createTop1();
createTop2();
createTop3();
createBottom1();
createBottom2();
createBottom3();
console.log('All images generated successfully!');
