import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

/**
 * Рисование рамки вокруг игрового поля
 * @param {GameWindowProps} w
 */
const drawFrame = (w: GameWindowProps): void => {
  const { ctx } = gameProperties;
  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.strokeStyle = '#312b4e';
  ctx.lineWidth = 1;
  ctx.rect(w.left, w.top, w.width, w.height);
  ctx.stroke();
};

export default drawFrame;
