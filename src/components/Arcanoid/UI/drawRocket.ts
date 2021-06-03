import { GUN_HEIGHT, GUN_WIDTH, ROCKET_HEIGHT } from 'Components/Arcanoid/settings';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';

/**
 * Рисование ракетки
 * @param {CanvasRenderingContext2D} ctx контекст канваса
 * @param {GameWindowProps} gameWindow объект с размерами игрового окна
 * @param {number} x координата относительно игрового окна
 * @param {number} _y координата относительно игрового окна
 * @param {number} width ширина ракетки
 * @param {number} glue клей - 0 рисовать не надо
 * @param {number} gun ствол - 0 рисовать не надо
 */
const drawRocket = (
  ctx: CanvasRenderingContext2D,
  gameWindow: GameWindowProps,
  x: number, _y: number, width: number, glue = 0, gun = 0,

) => {
  // вычисление абсолютных координат
  const startX = x + gameWindow.left;
  const startY = gameWindow.bottom - ROCKET_HEIGHT;

  let grd = ctx.createLinearGradient(startX, startY, startX, startY + ROCKET_HEIGHT);
  ctx.beginPath();
  // создание градиента
  grd.addColorStop(0, 'gray');
  grd.addColorStop(1, 'gray');
  grd.addColorStop(0.4, 'white');
  ctx.fillStyle = grd;
  // рисование самой ракетки
  ctx.fillRect(startX,
    startY,
    width,
    ROCKET_HEIGHT);
  ctx.closePath();
  if (glue) { // рисовать клей?
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255,255,0,0.4)';
    ctx.fillRect(startX,
      startY,
      width,
      ROCKET_HEIGHT / 2);
    ctx.closePath();
  }
  if (gun) { // рисовать ствол?
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
  if (rocket.maxTime !== 0) {
    const seconds = (Date.now() - rocket.maxTime) / 1000;
    const text = seconds.toFixed(1);
    ctx.textAlign = 'center';
    ctx.fillText(text, rocket.x + Math.round(width / 2), rocket.y);
  }
  ctx.closePath();
};

export default drawRocket;
