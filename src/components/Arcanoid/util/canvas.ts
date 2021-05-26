import isClient from 'Util/isClient';
import {
  GAME_CANVAS_ID, MARGIN_BOTTOM, MARGIN_LEFT, MARGIN_RIGHT, MARGIN_TOP,
} from 'Components/Arcanoid/settings';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';

export const getWidth = () => { // ширина канваса
  if (!isClient()) {
    return 0;
  }
  const canvasId = document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement;
  if (canvasId) {
    return canvasId.width;
  }
  return 0;
};

export const getHeight = () => { // высота канваса
  if (!isClient()) {
    return 0;
  }
  const canvasId = document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement;
  if (canvasId) {
    return canvasId.height;
  }
  return 0;
};

// устанавливаем размер игрового поля
export const getGameContext = (): GameWindowProps => ({
  top: MARGIN_TOP,
  left: MARGIN_LEFT,
  width: getWidth() - MARGIN_LEFT - MARGIN_RIGHT,
  height: getHeight() - MARGIN_TOP - MARGIN_BOTTOM,
  right: getWidth() - MARGIN_RIGHT,
  bottom: getHeight() - MARGIN_BOTTOM,
});
