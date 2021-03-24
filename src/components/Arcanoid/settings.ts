export const CANVAS_MARGIN = 10;
export const BALL_SPEED_UNIT = 2;
export const ROCKET_HEIGHT = 20;
export const ROCKET_WIDTH = 200;
export const ROCKET_MOVE_STEP = 10;
export const RENDER_TIME = 10;
export const ROCKET_PARTS = 12;
export const ROCKET_PART_SPEED_MULT = 2;
export const ROCKET_PART_SPEED_CHANGER = 3;

// eslint-disable-next-line no-shadow
export enum EVENTS {
  ROCKET_MOVE = 'do-rocket:move',
  BALL_MOVE = 'do-ball:move',
  GOAL = 'too:bad-goal',
  BALL_RETURN = 'good:ball-return',
  BRICK = 'shoot:to-brick',
}
