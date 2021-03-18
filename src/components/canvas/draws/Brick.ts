import DrawObject, { ICanvasObject } from './DrawObject';
import { Ball } from './Ball';
import { globalBus } from '../../../util/EventBus';
import { EVENTS } from '../settings';

export interface IBrickProps extends ICanvasObject {
  width: number
  height: number
}

export type BrickProps = IBrickProps;

export class Brick extends DrawObject {
  width: number;

  height: number;

  constructor(prop: BrickProps) {
    super(prop);
    this.x = prop.x;
    this.y = prop.y;
    this.width = prop.width;
    this.height = prop.height;
    this.style = prop.style;
    this.render();
  }

  render(canvas: CanvasRenderingContext2D | null = null): void {
    super.render(canvas);
    if (canvas) {
      this.canvas.beginPath();
      this.canvas.fillStyle = this.style;
      this.canvas.strokeStyle = this.style;
      this.canvas.fillRect(this.x, this.y, this.width, this.height);
      // this.canvas.rect(this.x, this.y, this.width, this.height);
      // this.canvas.stroke();
      // this.canvas.fill();
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
      if (this.x + this.width - ball.x < ball.radius) {
        globalBus.emit(EVENTS.BRICK, 'LEFT', this);
        ball.ballSpeed.x = -ball.ballSpeed.x;
        return;
      }
    } else if (this.x - ball.x < ball.radius) {
      globalBus.emit(EVENTS.BRICK, 'RIGHT', this);
      ball.ballSpeed.x = -ball.ballSpeed.x;
      return;
    }
    if (ball.ballSpeed.y < 0) {
      if (this.y + this.height - ball.y < ball.radius) {
        globalBus.emit(EVENTS.BRICK, 'BOTTOM', this);
        ball.ballSpeed.y = -ball.ballSpeed.y;
      }
    } else if (this.y - ball.y < ball.radius) {
      globalBus.emit(EVENTS.BRICK, 'TOP', this);
      ball.ballSpeed.y = -ball.ballSpeed.y;
    }
  }
}
