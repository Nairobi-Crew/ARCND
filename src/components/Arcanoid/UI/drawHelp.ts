import {
  HELP_FILL_STYLE, HELP_FONT, HELP_STROKE_STYLE, HELP_TEXT,
} from 'Components/Arcanoid/settings';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';

const drawHelp = (w: GameWindowProps) => {
  const { ctx } = gameObjects;

  if (!ctx) {
    return;
  }
  ctx.beginPath();
  ctx.strokeStyle = HELP_STROKE_STYLE;
  ctx.fillStyle = HELP_FILL_STYLE;
  ctx.textAlign = 'center';
  ctx.font = HELP_FONT;
  ctx.fillText(
    HELP_TEXT,
    Math.round((w.left + w.width) / 2),
    w.top + w.height + 30,
  );
  ctx.strokeText(
    HELP_TEXT,
    Math.round((w.left + w.width) / 2),
    w.top + w.height + 30,
  );
};

export default drawHelp;