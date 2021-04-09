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

  ctx.beginPath();
  const color1 = 'red';
  const color2 = 'blue';
  const grd = ctx.createLinearGradient(startX, startY, width, height);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  ctx.fillStyle = grd;
  ctx.fillRect(startX, startY, width, height);
};

export default drawShoot;
