import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { LIVES_BALL_RADIUS } from 'Components/Arcanoid/settings';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

const drawLives = (w: GameWindowProps) => {
  const { ctx } = gameObjects;

  // eslint-disable-next-line no-shadow
  const drawOneLive = (current: number) => {
    const baseX = w.right - (current * 30);
    ctx.ellipse(
      baseX,
      Math.round(w.top / 2),
      LIVES_BALL_RADIUS,
      LIVES_BALL_RADIUS,
      0,
      0,
      2 * Math.PI,
    );
    ctx.fill();
  };
  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.fillStyle = ball.fillStyle;
  ctx.strokeStyle = ball.strokeStyle;
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < gameProperties.lives; i++) {
    drawOneLive(i);
  }
};

export default drawLives;
