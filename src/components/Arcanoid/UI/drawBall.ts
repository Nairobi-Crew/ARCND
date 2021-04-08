import { GameWindowProps } from 'Components/Arcanoid/Game/types';

const drawGradientBall = (
  ctx: CanvasRenderingContext2D, // сонтекст канваса
  gameWindow: GameWindowProps, // размеры игрового поля и его отступы
  x: number, y: number, radius: number, // координаты шара и радиус, и стили из оъекта
) => {
  const centerX = x + gameWindow.left;
  const centerY = y + gameWindow.top;
  const OneDiv3 = Math.round(radius / 3);
  const grd = ctx.createRadialGradient(
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
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.ellipse(
    // координаты шара в координатах окна игры,
    // для преобразования в абсолютные канвасовские добавляем левый отспуп к х и верхний к y
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
  x: number, y: number, radius: number, strokeStyle = '', fillStyle = '', // координаты шара и радиус, и стили из оъекта
) => {
  drawGradientBall(ctx, gameWindow, x, y, radius);
};

export default drawBall;
