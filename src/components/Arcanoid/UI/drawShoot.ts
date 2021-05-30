import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

/**
 * Отрисовка выстрела
 * @param {CanvasRenderingContext2D} ctx - контекст канваса
 * @param {GameWindowProps} gameWindow - объект с размерами игрового поля
 * @param {number} x - относительные координаты
 * @param {number} y - относительные координаты
 * @param {number} width - ширина
 * @param {number} height - высота
 */
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
  const grd = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, halfHeight);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  if (gameProperties.useShadows) {
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
  }

  ctx.fillStyle = grd;
  ctx.fillRect(startX, startY, width, height);
  ctx.fill();
  ctx.closePath();
};

export default drawShoot;
