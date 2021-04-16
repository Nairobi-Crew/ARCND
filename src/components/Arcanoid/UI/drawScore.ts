import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {
  SCORES_FILL_STYLE,
  SCORES_FONT,
  SCORES_STROKE_STYLE, SCORES_TEXT,
} from 'Components/Arcanoid/settings';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

/**
 * Отрисовка счета
 * @param {GameWindowProps} w - объект с размерами игрового окна
 */
const drawScore = (w: GameWindowProps) => {
  const { ctx } = gameProperties;

  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.strokeStyle = SCORES_STROKE_STYLE;
  ctx.fillStyle = SCORES_FILL_STYLE;
  ctx.textAlign = 'left';
  ctx.font = SCORES_FONT;
  ctx.fillText(
    `${SCORES_TEXT}${gameProperties.score}`,
    2,
    Math.round(w.top / 2 + 2),
  );
};

export default drawScore;
