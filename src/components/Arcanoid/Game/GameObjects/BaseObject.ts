import { GameWindowProps } from 'Components/Arcanoid/Game/types';

export interface IBaseObjectProps {
  x?: number
  y?: number
  fillStyle?: string
  strokeStyle?: string
}

export type DrawObjectProps = IBaseObjectProps;

// класс базового объекта. от него наследуем все, что отрисовывать по requestAnimationFrame
export default class BaseObject {

  fillStyle: string;

  strokeStyle: string;

  x: number;

  y: number;

  constructor(props: DrawObjectProps) {
    this.x = props.x ? props.x : 0;
    this.y = props.y ? props.y : 0;
    this.fillStyle = props.fillStyle ? props.fillStyle : '';
    this.strokeStyle = props.strokeStyle ? props.strokeStyle : '';
  }

  render(): void {

  }

  setCoords(x: number, y: number, draw = false): void {
    this.x = x;
    this.y = y;
    if (draw) {
      this.render();
    }
  }

  move(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
    return this;
  }
}
