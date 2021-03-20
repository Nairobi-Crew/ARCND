// eslint-disable-next-line import/prefer-default-export
export const CANVAS_MARGIN = 10;
export const ROCKET_HEIGHT = 20;
export const ROCKET_WIDTH = 200;
export const ROCKET_MOVE_STEP = 5;
export const RENDER_TIME = 20;
export const ROCKET_PARTS = 7;
export const BIRDS_GATE_HEIGHT = 15; // % - 1
export const BIRDS_GATE_HEIGHT_MIN = 5;
export const BIRDS_GATE_HEIGHT_DEVIATION = 3; // % - 1
export const BIRDS_LEVEL_DIFFICULT = 0.5; //
export const BIRDS_GATE_WIDTH = 30; // pix
export const BIRDS_GATE_X_DEVIATION = 50; // pix
export const BIRDS_GATE_MOVE = 5; // pix
export const BIRDS_SKIP_CONTROL_FRAME = 4;
// eslint-disable-next-line no-shadow
export enum EVENTS {
  ROCKET_MOVE = 'do-rocket:move',
  BALL_MOVE = 'do-ball:move',
  GOAL = 'too:bad-goal',
  BALL_RETURN = 'good:ball-return',
  BRICK = 'shoot:to-brick',
}
