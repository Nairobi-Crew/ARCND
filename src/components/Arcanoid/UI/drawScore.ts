import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {
  SCORES_FILL_STYLE,
  SCORES_FONT,
  SCORES_STROKE_STYLE, SCORES_TEXT,
} from 'Components/Arcanoid/settings';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';

const drawScore = (w: GameWindowProps) => {
  const { ctx } = gameObjects;

  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.strokeStyle = SCORES_STROKE_STYLE;
  ctx.fillStyle = SCORES_FILL_STYLE;
  ctx.textAlign = 'left';
  ctx.font = SCORES_FONT;
  ctx.fillText(
    `${SCORES_TEXT}${ball.score}`,
    0,
    Math.round(w.top / 2),
  );
};

export default drawScore;
