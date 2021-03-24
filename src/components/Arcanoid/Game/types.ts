import { FC } from 'react';
import BaseObject from 'Components/Arcanoid/Game/GameObjects/BaseObject';

export type OwnGameProps = {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
}

export type GameProps = FC<OwnGameProps>;

export type GameWindowProps = {
  top: number
  left: number
  right: number
  bottom: number
  width: number
  height: number
  ctx: CanvasRenderingContext2D
};

export interface IGameFieldObjectProps {
  type: string
  object: BaseObject
}
