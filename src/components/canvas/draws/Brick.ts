import DrawObject, { IDrawObjectProps } from './DrawObject';
import { Ball } from './Ball';
import { globalBus } from '../../../util/EventBus';
import { EVENTS } from '../settings';

export interface IBrickProps extends IDrawObjectProps {
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
    // debugger;

    if (ball.ballSpeed.x < 0) {
      if (Math.abs(this.x + this.width - ball.x) < ball.radius) {
        // globalBus.emit(EVENTS.BRICK, 'LEFT', this);
        ball.changeXDirection();
        return;
      }
    } else if (Math.abs(this.x - ball.x) < ball.radius) {
      // globalBus.emit(EVENTS.BRICK, 'RIGHT', this);
      ball.changeXDirection();
      return;
    }
    if (ball.ballSpeed.y < 0) {
      if (Math.abs(this.y + this.height - ball.y) < ball.radius) {
        // globalBus.emit(EVENTS.BRICK, 'BOTTOM', this);
        ball.changeYDirection();
      }
    } else if (Math.abs(this.y - ball.y) < ball.radius) {
      globalBus.emit(EVENTS.BRICK, 'TOP', this, ball.x, ball.y);
      console.log('TOP', { x: ball.x, y: ball.y });
      ball.changeYDirection();
      // ball.ballSpeed.x = -ball.ballSpeed.x;
    }
  }
}
