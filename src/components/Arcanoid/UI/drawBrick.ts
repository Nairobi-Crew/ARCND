import { GameWindowProps } from 'Components/Arcanoid/Game/types';

type brickStyle = {
  fillStyle: string
  strokeStyle: string
}

// генерация стилей по уровню кирпича и по типу в перспективе
const stylesByLevelType = (level: number, type = 0): brickStyle => {
  const res: brickStyle = { fillStyle: 'red', strokeStyle: 'blue' };
  if (level === 1) {
    res.strokeStyle = 'red';
    res.fillStyle = 'white';
  } else if (level === 2) {
    res.strokeStyle = 'red';
    res.fillStyle = 'yellow';
  } else if (level === 3) {
    res.strokeStyle = 'red';
    res.fillStyle = 'green';
  }
  return res;
};

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
  ctx.fillRect(
    // координаты кирпича в координатах окна игры,
    // для преобразования в абсолютные канвасовские добавляем левый отспуп к х и верхний к y
    x + gameWindow.left,
    y + gameWindow.top,
    width,
    height,
  );

  ctx.fill(); // заливаем
  ctx.stroke(); // рисуем контур
};

export default drawBall;
