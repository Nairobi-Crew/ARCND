import { GameWindowProps } from 'Components/Arcanoid/Game/types';

type brickStyle = {
  fillStyle: string
  strokeStyle: string
}

// генерация стилей по уровню кирпича и по типу в перспективе
const stylesByLevelType = (level: number, type = 0): brickStyle => {
  const res: brickStyle = { fillStyle: 'red', strokeStyle: 'blue' };
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

  // ctx.fill(); // заливаем
  ctx.stroke(); // рисуем контур
};

export default drawBall;
