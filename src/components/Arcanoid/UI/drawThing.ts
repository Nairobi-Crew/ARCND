import { ThingType } from 'Components/Arcanoid/Game/GameObjects/Thing';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { THING_FONT, THING_HEIGHT, THING_WIDTH } from 'Components/Arcanoid/settings';

const drawThing = (
  ctx: CanvasRenderingContext2D,
  gameWindow: GameWindowProps,
  x: number,
  y: number,
  type: ThingType,
) => {
  if (!ctx) {
    return;
  }
  const startX = x + gameWindow.left;
  const startY = y + gameWindow.top;

  const halfWidth = Math.round(THING_WIDTH / 2);
  const halfHeight = Math.round(THING_HEIGHT / 2);

  ctx.beginPath();
  let color1 = 'red';
  let color2 = 'blue';

  let letter = '';
  switch (type) {
    case 'gun':
      letter = 'П';
      color1 = 'silver';
      color2 = 'gray';
      break;
    case 'glue':
      letter = 'К';
      color1 = 'yellow';
      color2 = 'gray';
      break;
    case 'expand':
      letter = 'Ш';
      color1 = 'green';
      color2 = 'gray';
      break;
    case 'compress':
      letter = 'У';
      color1 = 'red';
      color2 = 'gray';
      break;
    default:
  }
  const grd = ctx.createLinearGradient(startX, startY, THING_WIDTH, THING_HEIGHT);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;

  ctx.fillStyle = grd;
  ctx.fillRect(startX, startY, THING_WIDTH, THING_HEIGHT);
  ctx.beginPath();
  ctx.font = THING_FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText(letter, startX + halfWidth, startY + halfHeight, THING_WIDTH);
};

export default drawThing;
