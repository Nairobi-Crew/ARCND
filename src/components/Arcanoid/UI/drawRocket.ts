import { ROCKET_HEIGHT } from 'Components/Arcanoid/settings';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';

const drawRocket = (
  ctx: CanvasRenderingContext2D,
  gameWindow: GameWindowProps,
  x: number, y: number, width: number, strokeStyle = '', fillStyle = '',

) => {
  ctx.strokeStyle = strokeStyle;
  ctx.fillStyle = fillStyle;
  ctx.fillRect(x + gameWindow.left,
    gameWindow.bottom - ROCKET_HEIGHT,
    width,
    ROCKET_HEIGHT);
  ctx.strokeRect(x + gameWindow.left,
    gameWindow.bottom - ROCKET_HEIGHT,
    width,
    ROCKET_HEIGHT);
};

export default drawRocket;
