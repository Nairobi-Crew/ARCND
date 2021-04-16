import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';

const drawFrame = (w: GameWindowProps): void => {
  const { ctx } = gameObjects;
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
