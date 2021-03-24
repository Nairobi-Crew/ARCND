import { GameWindowProps } from 'Components/Arcanoid/Game/types';

export interface IBaseObjectProps {
  x?: number
  y?: number
  gameWindow?: GameWindowProps
  fillStyle?: string
  strokeStyle?: string
}

export type DrawObjectProps = IBaseObjectProps;

export default class BaseObject {
  gameWindow: GameWindowProps;

  fillStyle: string;

  strokeStyle: string;

  x: number;

  y: number;

  constructor(props: DrawObjectProps) {
    this.x = props.x ? props.x : 0;
    this.y = props.y ? props.y : 0;
    this.gameWindow = props.gameWindow;
    this.fillStyle = props.fillStyle ? props.fillStyle : '';
    this.strokeStyle = props.strokeStyle ? props.strokeStyle : '';
  }

  render(gameWindow: GameWindowProps | undefined = undefined): void {
    if (gameWindow) {
      this.gameWindow = gameWindow;
    }
  }

  setGameWindow(gameWindow: GameWindowProps): void {
    this.gameWindow = gameWindow;
  }

  setCoords(x: number, y: number, draw = false): void {
    this.x = x;
    this.y = y;
    if (draw) {
      this.render();
    }
  }

  offScreen(): boolean {
    return (
      this.x >= 0
      && this.x <= this.gameWindow.width
      && this.y >= 0
      && this.y <= this.gameWindow.height
    );
  }

  move(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
    return this;
  }
}
