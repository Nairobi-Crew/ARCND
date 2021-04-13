import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {
  THING_COMPRESS_LETTER,
  THING_EXPAND_LETTER,
  THING_GLUE_LETTER,
  THING_GUN_LETTER,
  THING_SHOW_TYPE,
} from 'Components/Arcanoid/settings';

type brickStyle = {
  fillStyle: string
  strokeStyle: string
  bonusLetter: string
}

// генерация стилей по уровню кирпича и по типу в перспективе
const stylesByLevelType = (level: number, type = 0): brickStyle => {
  const res: brickStyle = { fillStyle: 'red', strokeStyle: 'blue', bonusLetter: '' };
  if (level === 1) {
    res.strokeStyle = 'gray';
    res.fillStyle = 'white';
  } else if (level === 2) {
    res.strokeStyle = 'rgb(0, 100, 100)';
    res.fillStyle = 'rgb(0, 200, 200)';
  } else if (level === 3) {
    res.strokeStyle = 'green';
    res.fillStyle = 'lime';
  } else if (level === 4) {
    res.strokeStyle = 'navy';
    res.fillStyle = 'blue';
  } else if (level === 5) {
    res.strokeStyle = 'rgb(128, 0, 0)';
    res.fillStyle = 'rgb(255, 0, 0)';
  }

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
const drawBall = (
  ctx: CanvasRenderingContext2D, // сонтекст канваса
  gameWindow: GameWindowProps, // размеры игрового поля и его отступы
  x: number,
  y: number,
  width: number,
  height,
  level: number,
  type: number, // координаты шара и радиус, и стили из оъекта
) => {
  if (!ctx) {
    return;
  }

  const style = stylesByLevelType(level, type);
  ctx.beginPath();

  ctx.fillStyle = style.fillStyle;
  ctx.strokeStyle = style.strokeStyle;
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2;
  ctx.shadowBlur = 15;
  ctx.shadowColor = 'black';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;

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

export default drawBall;
