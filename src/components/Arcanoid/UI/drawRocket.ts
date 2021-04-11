import { GUN_HEIGHT, GUN_WIDTH, ROCKET_HEIGHT } from 'Components/Arcanoid/settings';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';

const drawRocket = (
  ctx: CanvasRenderingContext2D,
  gameWindow: GameWindowProps,
  x: number, y: number, width: number, glue = false, gun = false,

) => {
  ctx.beginPath();

  const startX = x + gameWindow.left;
  const startY = gameWindow.bottom - ROCKET_HEIGHT;

  let grd = ctx.createLinearGradient(startX, startY, startX, startY + ROCKET_HEIGHT);
  grd.addColorStop(0, 'gray');
  grd.addColorStop(1, 'gray');
  grd.addColorStop(0.4, 'white');
  ctx.fillStyle = grd;
  ctx.fillRect(startX,
    startY,
    width,
    ROCKET_HEIGHT);
  ctx.closePath();
  if (glue) {
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,0,0.4)';
    ctx.fillRect(startX,
      startY,
      width,
      ROCKET_HEIGHT / 2);
    ctx.closePath();
  }
  if (gun) {
    const startGunX = startX + width / 2 - GUN_WIDTH / 2;
    const startGunY = startY - GUN_HEIGHT;
    ctx.beginPath();
    grd = ctx.createLinearGradient(startGunX, startGunY, startGunX + GUN_WIDTH, startGunY);
    grd.addColorStop(0, 'gray');
    grd.addColorStop(0.2, 'white');
    grd.addColorStop(1, 'gray');
    ctx.fillStyle = grd;
    ctx.fillRect(startGunX, startGunY, GUN_WIDTH, GUN_HEIGHT);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    ctx.strokeRect(startGunX, startGunY, GUN_WIDTH, GUN_HEIGHT);
  }
};

export default drawRocket;
