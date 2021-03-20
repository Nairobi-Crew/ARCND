import DrawObject, { IDrawObjectProps } from './DrawObject';
import { degreeToRadian } from '../../../util/angles';

interface IBirdProps extends IDrawObjectProps {
  width: number
  height: number
  angle: number
}

export type BirdProps = IBirdProps;

export const linearAccelerate = (count: number): number => count;
export const doubleAccelerate = (
  count: number,
): number => count * 2;

// export const powAccelerate = (
//   count: number,
// ): number => Math.pow(count, 2);

export class Bird extends DrawObject {
  private static instance : Bird;

  width: number;

  height: number;

  angle: number;

  moving: boolean = false;

  acceleratePosition = 0;

  fallingPosition = 0;

  isAccelerate = false;

  isFalling = false;

  constructor(props: BirdProps) {
    super(props);
    if (Bird.instance) {
      return Bird.instance;
    }
    this.width = props.width;
    this.height = props.height;
    this.angle = props.angle;
    Bird.instance = this;
  }

  render(canvas: CanvasRenderingContext2D | undefined = undefined): void {
    super.render(canvas);
    if (this.canvas) {
      this.canvas.beginPath();
      this.canvas.fillStyle = this.style;
      this.canvas.ellipse(
        this.x,
        this.y,
        Math.round(this.width / 2),
        Math.round(this.height / 2),
        degreeToRadian(this.angle),
        0,
        Math.PI * 2,
      );
      this.canvas.fill();
    }
  }

  nextPosition(accelerate = false): void {
    if (accelerate) {
      this.acceleratePosition = this.isAccelerate ? this.acceleratePosition + 1 : 0;
      this.isAccelerate = true;
      this.isFalling = false;
      this.y -= doubleAccelerate(this.acceleratePosition);
      this.angle = -this.acceleratePosition * 2;
      if (this.angle < -45) {
        this.angle = -45;
      }
    } else {
      this.isAccelerate = false;
      this.fallingPosition = this.isFalling ? this.fallingPosition + 1 : 0;
      this.isFalling = true;
      this.y += doubleAccelerate(this.fallingPosition);
      this.angle = this.fallingPosition * 2;
      if (this.angle > 45) {
        this.angle = 45;
      }
    }

    if (this.y < 0) {
      this.y = Math.round(this.height / 2);
      this.isFalling = false;
      this.isAccelerate = false;
      this.angle = 0;
    }

    if (this.y > this.canvasHeight) {
      this.y = this.canvasHeight - Math.round(this.height / 2);
      this.isFalling = false;
      this.isAccelerate = false;
      this.angle = 0;
    }
  }
}

export const bird = new Bird({
  x: Math.round(window.innerWidth / 3), y: 100, width: 30, height: 10, angle: 25,
});
