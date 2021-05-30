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
