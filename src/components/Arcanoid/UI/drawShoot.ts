import { GameWindowProps } from 'Components/Arcanoid/Game/types';

const drawShoot = (
  ctx: CanvasRenderingContext2D,
  gameWindow: GameWindowProps,
  x: number,
  y: number,
  width: number,
  height: number,
) => {
  if (!ctx) {
    return;
  }
  const startX = x + gameWindow.left;
  const startY = y + gameWindow.top;
  const halfWidth = Math.round(width / 2);
  const halfHeight = Math.round(height / 2);
  const centerX = startX + halfWidth;
  const centerY = startY + halfHeight;

  ctx.beginPath();
  const color1 = 'red';
  const color2 = 'yellow';
  // const grd = ctx.createLinearGradient(startX, startY, width, height);
  const grd = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, halfHeight);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = grd;
  ctx.fillRect(startX, startY, width, height);
  //ctx.ellipse(centerX, centerY, halfWidth, halfHeight, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};

export default drawShoot;
