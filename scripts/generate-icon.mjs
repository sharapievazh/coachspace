import { createCanvas } from 'canvas';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const size = 1024;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

const grad = ctx.createLinearGradient(0, 0, size, size);
grad.addColorStop(0, '#12002e');
grad.addColorStop(1, '#1e0060');
ctx.fillStyle = grad;

const r = 225;
ctx.beginPath();
ctx.moveTo(r, 0);
ctx.lineTo(size - r, 0);
ctx.arcTo(size, 0, size, r, r);
ctx.lineTo(size, size - r);
ctx.arcTo(size, size, size - r, size, r);
ctx.lineTo(r, size);
ctx.arcTo(0, size, 0, size - r, r);
ctx.lineTo(0, r);
ctx.arcTo(0, 0, r, 0, r);
ctx.closePath();
ctx.fill();

ctx.font = 'bold 520px serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

ctx.fillStyle = '#a78bfa';
ctx.fillText('C', 370, 530);

ctx.fillStyle = '#ffffff';
ctx.fillText('S', 660, 530);

const out = join(__dirname, '../AppIcon-1024.png');
writeFileSync(out, canvas.toBuffer('image/png'));
console.log('✅ Icon saved to AppIcon-1024.png');
