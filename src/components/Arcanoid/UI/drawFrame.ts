import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {gameObjects} from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';

const drawFrame = (w: GameWindowProps): void => {
  const { ctx } = gameObjects;
  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.strokeStyle = '#f00';
  ctx.rect(w.top, w.left, w.width, w.height);
  ctx.stroke();
};

export default drawFrame;
