import { HELP_FONT } from 'Components/Arcanoid/settings';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

const drawDebugInfo = () => {
  const w = gameProperties.gameWindow;
  const { ctx } = gameProperties;
  const { debug } = gameProperties;

  if (!ctx || !w || debug === '') {
    return;
  }
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.fillStyle = ' black';
  ctx.textAlign = 'left';
  ctx.font = HELP_FONT;
  ctx.fillText(
    debug,
    100,
    100,
  );
  ctx.strokeText(
    debug,
    100,
    100,
  );
  ctx.closePath();
};

export default drawDebugInfo;
