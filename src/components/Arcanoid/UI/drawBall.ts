import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

/**
 * Отрисовка шарика
 * @param {CanvasRenderingContext2D} ctx - контекст канваса
 * @param {GameWindowProps} gameWindow - объект с размерами игрового поля
 * @param {number} x - отновительные координаты
 * @param {number} y - отновительные координаты
 * @param {number} radius - радиус шарика
 */
const drawGradientBall = (
  ctx: CanvasRenderingContext2D,
  gameWindow: GameWindowProps,
  x: number, y: number, radius: number,
) => {
  const centerX = x + gameWindow.left; // абсолютные координаты центра шарика
  const centerY = y + gameWindow.top;
  const OneDiv3 = Math.round(radius / 3); // треть от радиуса, для смещения центра градиента
  const grd = ctx.createRadialGradient( // создание градиента
    centerX,
    centerY,
    radius,
    centerX - OneDiv3,
    centerY - OneDiv3,
    OneDiv3,
  );
  grd.addColorStop(0, 'rgb(30, 30, 30');
  grd.addColorStop(0.4, 'rgb(200, 200, 200');
  grd.addColorStop(1, 'rgb(250, 250, 250');
  ctx.fillStyle = grd;
  if (gameProperties.useShadows) {
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  ctx.ellipse( // отрисовка шарика в абсолютных координатах
    centerX,
    centerY,
    radius,
    radius,
    0,
    0,
    2 * Math.PI,
  );
  ctx.fill();
};

const drawBall = (
  ctx: CanvasRenderingContext2D, // сонтекст канваса
  gameWindow: GameWindowProps, // размеры игрового поля и его отступы
  x: number, y: number, radius: number, // координаты шара и радиус
) => {
  ctx.beginPath();
  drawGradientBall(ctx, gameWindow, x, y, radius);
  ctx.closePath();
};

export default drawBall;
