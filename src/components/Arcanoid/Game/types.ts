import BaseObject from 'Components/Arcanoid/Game/GameObjects/BaseObject';

export type GameProps = {
  ctx: CanvasRenderingContext2D
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

export interface IGameFieldObjectProps {
  type: string
  object: BaseObject
}
