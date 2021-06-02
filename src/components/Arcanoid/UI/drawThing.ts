import { ThingType } from 'Components/Arcanoid/Game/GameObjects/Thing';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {
  THING_COMPRESS_LETTER, THING_EXPAND_LETTER, THING_FIREBALL_LETTER,
  THING_FONT, THING_GLUE_LETTER, THING_GUN_LETTER,
  THING_HEIGHT,
  THING_SPLIT_LETTER,
  THING_WIDTH,
} from 'Components/Arcanoid/settings';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

/**
 * Отрисовка бонуса
 * @param {CanvasRenderingContext2D} ctx - контекст канваса
 * @param {GameWindowProps} gameWindow - объект с размерами игрового окна
 * @param {number} x - относительные координаты
 * @param {number} y - относительные координаты
 * @param {ThingType} type - тип бонуса
 */
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
      letter = THING_GUN_LETTER;
      color1 = 'silver';
      color2 = 'gray';
      break;
    case 'glue':
      letter = THING_GLUE_LETTER;
      color1 = 'yellow';
      color2 = 'gray';
      break;
    case 'expand':
      letter = THING_EXPAND_LETTER;
      color1 = 'green';
      color2 = 'gray';
      break;
    case 'compress':
      letter = THING_COMPRESS_LETTER;
      color1 = 'darkgray';
      color2 = 'gray';
      break;
    case 'split':
      letter = THING_SPLIT_LETTER;
      color1 = 'blue';
      color2 = 'gray';
      break;
    case 'fireball':
      letter = THING_FIREBALL_LETTER;
      color1 = 'red';
      color2 = 'gray';
      break;
    default:
  }
  const grd = ctx.createLinearGradient(startX, startY, THING_WIDTH, THING_HEIGHT);
  grd.addColorStop(0, color1);
  grd.addColorStop(1, color2);

  if (gameProperties.useShadows) {
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
  }

  ctx.fillStyle = grd;
  ctx.fillRect(startX, startY, THING_WIDTH, THING_HEIGHT);
  ctx.beginPath();
  ctx.font = THING_FONT;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';
  ctx.fillText(letter, startX + halfWidth, startY + halfHeight, THING_WIDTH);
  ctx.closePath();
};

export default drawThing;
