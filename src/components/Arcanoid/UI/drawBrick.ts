import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {
  brickColor,
  brickColors,
  THING_COMPRESS_LETTER,
  THING_EXPAND_LETTER, THING_FIREBALL_LETTER,
  THING_GLUE_LETTER,
  THING_GUN_LETTER, THING_ROCKETMAX_LETTER,
  THING_SHOW_TYPE, THING_SPLIT_LETTER,
} from 'Components/Arcanoid/settings';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

export type brickStyle = {
  fillStyle: string
  strokeStyle: string
  bonusLetter: string
}

// генерация стилей по уровню кирпича и по типу в перспективе
const stylesByLevelType = (level: number, type = 0): brickStyle => {
  const defaultStyle: brickColor = brickColors[0];
  let style: brickColor;
  if (level <= brickColors.length) {
    style = brickColors[level];
  } else {
    style = defaultStyle;
  }
  const res: brickStyle = { fillStyle: style.fill, strokeStyle: style.stroke, bonusLetter: '' };

  switch (type) {
    case 2:
      res.bonusLetter = THING_GUN_LETTER;
      break;
    case 3:
      res.bonusLetter = THING_GLUE_LETTER;
      break;
    case 4:
      res.bonusLetter = THING_EXPAND_LETTER;
      break;
    case 5:
      res.bonusLetter = THING_COMPRESS_LETTER;
      break;
    case 6:
      res.bonusLetter = THING_SPLIT_LETTER;
      break;
    case 7:
      res.bonusLetter = THING_FIREBALL_LETTER;
      break;
    case 8:
      res.bonusLetter = THING_ROCKETMAX_LETTER;
      break;
    case 9:
      res.bonusLetter = '?';
      break;
    default:
      res.bonusLetter = '';
  }

  return res;
};

/**
 * Отрисовка кирпича
 * @param {CanvasRenderingContext2D} ctx - контекст канваса
 * @param {GameWindowProps} gameWindow - объект с размерами игрового поля
 * @param {number} x - относительные координаты
 * @param {number} y - относительные координаты
 * @param {number} width - ширина блока
 * @param height - высота блока
 * @param {number} level - уровень
 * @param {number} type - тип бонуса
 */
const drawBrick = (
  ctx: CanvasRenderingContext2D, // сонтекст канваса
  gameWindow: GameWindowProps, // размеры игрового поля и его отступы
  x: number,
  y: number,
  width: number,
  height: number,
  level: number,
  type: number, // координаты шара и радиус, и стили из оъекта
) => {
  if (!ctx) {
    return;
  }

  ctx.beginPath();
  const style = stylesByLevelType(level, type);
  ctx.fillStyle = style.fillStyle;
  ctx.strokeStyle = style.strokeStyle;
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2;
  if (gameProperties.useShadows) {
    ctx.shadowBlur = 15;
    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 10;
  }

  ctx.fillRect(
    // координаты кирпича в координатах окна игры,
    // для преобразования в абсолютные канвасовские добавляем левый отспуп к х и верхний к y
    x + gameWindow.left,
    y + gameWindow.top,
    width,
    height,
  );
  ctx.strokeRect(
    // координаты кирпича в координатах окна игры,
    // для преобразования в абсолютные канвасовские добавляем левый отспуп к х и верхний к y
    x + gameWindow.left,
    y + gameWindow.top,
    width,
    height,
  );
  ctx.stroke(); // рисуем контур

  if (THING_SHOW_TYPE) {
    ctx.beginPath();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.fillText(
      style.bonusLetter,
      x + gameWindow.left + width / 2, y + gameWindow.top + height / 2,
    );
    ctx.strokeText(
      style.bonusLetter,
      x + gameWindow.left + width / 2, y + gameWindow.top + height / 2,
    );
    ctx.closePath();
  }

  // ctx.fill(); // заливаем
};

export default drawBrick;
