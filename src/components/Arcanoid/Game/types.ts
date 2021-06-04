import BaseObject from 'Components/Arcanoid/Game/GameObjects/BaseObject';

type TOnGamepadStateChange = (gamepads: Gamepad[]) => void;

export type GameProps = {
  ctx?: CanvasRenderingContext2D
  onGamepadStateChange?: TOnGamepadStateChange
}

// размер игрового окна
export type GameWindowProps = {
  top: number // верхний отступ
  left: number // левый
  right: number // правый
  bottom: number // нижний
  width: number // ширина
  height: number // высота
};

export type GameFieldObjectType = 'ball' | 'brick' | 'thing' | 'shoot';

export interface IGameFieldObjectProps {
  type: GameFieldObjectType
  object: BaseObject
}

// eslint-disable-next-line no-shadow
export enum EVENTS {
  GOAL = 'too:bad-goal',
  BALL_RETURN = 'good:ball-return',
  GAME_OVER = 'sorry:game-over',
  BLOCK = 'block:crash',
  GUN = 'take:a:gun',
  GLUE = 'take:a:glue',
  SPLIT = 'take:3balls',
  FIREBALL = 'take:fireball',
  EXPAND = 'expand:a:rocket',
  COMPRESS = 'compress:a:rocket',
  BRICK_CRASH = 'yeah:brick-level',
  ROCKETMAX = 'take:rocket_max',
  INC_SCORE = 'score:add',
  TOGGLE_FULL_SCREEN = 'fullscreen:toggle',
  DEC_LIVE = 'lives: lives--',
  SHOOT_START = 'shoot!!!_or_start',
  START = 'lets:go!',
}
