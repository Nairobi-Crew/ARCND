export const CANVAS_MARGIN = 10;
export const BALL_SPEED_UNIT = 5;
export const BALL_SPEED_LIMIT = 7;
export const ROCKET_HEIGHT = 20;
export const ROCKET_WIDTH = 200;
export const ROCKET_MOVE_STEP = 10;
export const RENDER_TIME = 10;
export const ROCKET_PARTS = 12;
export const ROCKET_PART_SPEED_MULT = 2;
export const ROCKET_PART_SPEED_CHANGER = 3;
export const HELP_FILL_STYLE = '#fff';
export const HELP_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const HELP_TEXT = 'Стрелки влево-вправо - перемещение рокетки, ENTER - полноэкранный режим, SPACE - старт игры/выстрел';
export const HELP_FONT = '20px Arial';
export const SCORES_FILL_STYLE = '#fff';
export const SCORES_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const SCORES_TEXT = 'Счет:';
export const SCORES_FONT = '20px Arial';

export const LEVEL_FILL_STYLE = '#ff0';
export const LEVEL_STROKE_STYLE = 'rgba(255, 255, 255, 0.5)';
export const LEVEL_TEXT = 'Уровень:';
export const LEVEL_FONT = '20px Arial';

export const LEVEL_STRING_LENGTH = 30;
export const LEVEL_BLOCKS_WIDTH = 5; // %
export const LEVEL_BLOCKS_HEIGHT = 5; // %
export const LEVEL_BLOCK_SPACE = 0.25;

export const LIVES_BALL_RADIUS = 10;
// eslint-disable-next-line no-shadow
export enum EVENTS {
  ROCKET_MOVE = 'do-rocket:move',
  BALL_MOVE = 'do-ball:move',
  GOAL = 'too:bad-goal',
  BALL_RETURN = 'good:ball-return',
  BRICK = 'shoot:to-brick',
  GAME_OVER = 'sorry:game-over',
}
