import { globalBus } from 'Util/EventBus';
import DrawObject, { IDrawObjectProps } from './DrawObject';
import { Ball } from './Ball';
import { EVENTS } from '../settings';

export interface IBrickProps extends IDrawObjectProps {
  width: number
  height: number
  level?: number
}

export type BrickProps = IBrickProps;

export class Brick extends DrawObject {
  width: number;

  height: number;

  level: number;

  constructor(prop: BrickProps) {
    super(prop);
    this.x = prop.x;
    this.y = prop.y;
    this.width = prop.width;
    this.height = prop.height;
    this.style = prop.style;
    this.level = prop.level ? prop.level : 1;
    this.render();
  }

  render(canvas: CanvasRenderingContext2D | null = null): void {
    super.render(canvas);
    if (canvas) {
      this.canvas.beginPath();
      this.canvas.fillStyle = this.style;
      this.canvas.strokeStyle = this.style;
      this.canvas.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  intersect(ball: Ball):void {
    if (ball.x - ball.radius > this.x + this.width
      || ball.x + ball.radius < this.x) {
      return;
    }
    if (ball.y - ball.radius > this.y + this.height
      || ball.y + ball.radius < this.y) {
      return;
    }

    if (ball.ballSpeed.x < 0) {
      if (Math.abs(this.x + this.width - ball.x) < ball.radius) {
        ball.changeXDirection();
        this.level -= 1;
        return;
      }
    } else if (Math.abs(this.x - ball.x) < ball.radius) {
      ball.changeXDirection();
      this.level -= 1;
      return;
    }
    if (ball.ballSpeed.y < 0) {
      if (Math.abs(this.y + this.height - ball.y) < ball.radius) {
        this.level -= 1;
        ball.changeYDirection();
      }
    } else if (Math.abs(this.y - ball.y) < ball.radius) {
      globalBus.emit(EVENTS.BRICK, 'TOP', this, ball.x, ball.y);
      this.level -= 1;
      ball.changeYDirection();
    }
  }
}
