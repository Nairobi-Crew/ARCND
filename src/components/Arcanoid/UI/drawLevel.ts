import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {
  LEVEL_FILL_STYLE,
  LEVEL_FONT,
  LEVEL_STROKE_STYLE, LEVEL_TEXT,
} from 'Components/Arcanoid/settings';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

const drawLevel = (w: GameWindowProps) => {
  const { ctx } = gameProperties;

  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.strokeStyle = LEVEL_STROKE_STYLE;
  ctx.fillStyle = LEVEL_FILL_STYLE;
  ctx.textAlign = 'center';
  ctx.font = LEVEL_FONT;
  ctx.strokeText(
    `${LEVEL_TEXT}${gameProperties.level - 1}`,
    Math.round((w.left + w.width) / 2),
    Math.round(w.top / 2 + 2),
  );
  ctx.fillText(
    `${LEVEL_TEXT}${gameProperties.level - 1}`,
    Math.round((w.left + w.width) / 2),
    Math.round(w.top / 2 + 2),
  );
  ctx.closePath();
};

export default drawLevel;
