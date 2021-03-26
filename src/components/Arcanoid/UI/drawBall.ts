import { GameWindowProps } from 'Components/Arcanoid/Game/types';

const drawBall = (
  ctx: CanvasRenderingContext2D, // сонтекст канваса
  gameWindow: GameWindowProps, // размеры игрового поля и его отступы
  x: number, y: number, radius: number, strokeStyle = '', fillStyle = '', // координаты шара и радиус, и стили из оъекта
) => {
  ctx.beginPath(); // начало отрисовки
  ctx.strokeStyle = strokeStyle; // стиль контура
  ctx.fillStyle = fillStyle; // стиль заполнения
  ctx.ellipse(
    // координаты шара в координатах окна игры,
    // для преобразования в абсолютные канвасовские добавляем левый отспуп к х и верхний к y
    x + gameWindow.left,
    y + gameWindow.top,
    radius,
    radius,
    0,
    0,
    2 * Math.PI,
  );
  ctx.fill(); // заливаем
  ctx.stroke(); // рисуем контур
};

export default drawBall;
