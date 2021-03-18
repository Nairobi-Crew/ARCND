import DrawObject, { ICanvasObject } from './DrawObject';
import { CANVAS_MARGIN, ROCKET_HEIGHT, ROCKET_WIDTH } from '../settings';

export interface IRocketProps extends ICanvasObject {
  width: number
  height: number
  position: number
}

type RocketProps = IRocketProps;

export class Rocket extends DrawObject {
  private static instance: Rocket;

  position: number;

  height: number;

  width: number;

  constructor(props: RocketProps) {
    super(props);
    if (Rocket.instance) {
      return Rocket.instance;
    }
    this.position = props.position;
    this.width = props.width;
    this.height = props.height;

    Rocket.instance = this;
  }

  render(canvas: CanvasRenderingContext2D | undefined = undefined): void {
    super.render(canvas);
    if (this.canvas) {
      this.canvas.beginPath();
      const half = Math.round(this.width / 2);
      this.canvas.fillStyle = this.style;
      this.canvas.strokeStyle = this.style;
      this.canvas.fillRect(this.position - half, this.canvasHeight - this.height, 10, this.height);
      this.canvas.fillRect(
        this.position + half - 10,
        this.canvasHeight - this.height,
        10, this.height,
      );
      this.canvas.rect(
        this.position - half + 10,
        this.canvasHeight - this.height,
        this.width - 20, this.height,
      );
      this.canvas.stroke();
    }
  }

  moveRocket(delta: number): void {
    const half = Math.round(this.width / 2);
    if (delta > 0) {
      if (this.position + delta + half > this.canvasWidth) {
        this.position = this.canvasWidth - half;
      } else {
        this.position += delta;
      }
    } else if (this.position + delta - half < 0) {
      this.position = half;
    } else {
      this.position += delta;
    }
  }
}

const position = Math.round(
  (window.innerWidth - CANVAS_MARGIN * 2) / 2 - ROCKET_WIDTH / 2,
);

export const rocket = new Rocket({
  height: ROCKET_HEIGHT,
  width: ROCKET_WIDTH,
  position,
  style: 'rgba(200, 0, 0, 1)',
});
