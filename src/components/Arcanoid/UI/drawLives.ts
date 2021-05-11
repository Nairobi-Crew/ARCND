import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { LIVES_BALL_RADIUS } from 'Components/Arcanoid/settings';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

const drawLives = (w: GameWindowProps) => {
  const { ctx } = gameProperties;

  // eslint-disable-next-line no-shadow
  const drawOneLive = (current: number) => {
    const baseX = w.right - (current * 30) + 10;
    const baseY = Math.round(w.top / 2);
    if (!ctx) {
      return;
    }
    ctx.beginPath();
    ctx.fillStyle = ball.fillStyle;
    ctx.strokeStyle = ball.strokeStyle;
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;

    const OneDiv3 = Math.round(LIVES_BALL_RADIUS / 3);
    const grd = ctx.createRadialGradient(
      baseX,
      baseY,
      LIVES_BALL_RADIUS,
      baseX - OneDiv3,
      baseY - OneDiv3,
      OneDiv3,
    );
    grd.addColorStop(0, 'rgb(20, 80, 20');
    grd.addColorStop(0.4, 'rgb(120, 220, 120');
    grd.addColorStop(1, 'rgb(199, 255, 199');
    ctx.fillStyle = grd;

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

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < gameProperties.lives; i++) {
    drawOneLive(i);
  }
};

export default drawLives;
