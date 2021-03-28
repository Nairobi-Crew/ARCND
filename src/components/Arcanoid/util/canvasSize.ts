import { GAME_CANVAS_ID } from 'Components/Arcanoid/settings';

export const getCanvasHeight = () => {
  const canvas = (document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement);
  return canvas ? canvas.height : 0;
};

export const getCanvasWidth = () => {
  const canvas = (document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement);
  return canvas ? canvas.width : 0;
};
