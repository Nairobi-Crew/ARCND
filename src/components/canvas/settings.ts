// eslint-disable-next-line import/prefer-default-export
export const CANVAS_MARGIN = 10;
export const ROCKET_HEIGHT = 20;
export const ROCKET_WIDTH = 100;
export const ROCKET_MOVE_STEP = 5;
export const RENDER_TIME = 10;
export const ROCKET_PARTS = 7;
export enum EVENTS {
  ROCKET_MOVE = 'do-rocket:move',
  BALL_MOVE = 'do-ball:move',
  GOAL = 'too:bad-goal',
  BALL_RETURN = 'good:ball-return',
  BRICK = 'shoot:to-brick',
}
