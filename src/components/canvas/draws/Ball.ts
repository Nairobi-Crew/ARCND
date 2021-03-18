import CanvasObject, { ICanvasObject } from './CanvasObject';

export interface IBallSpeed {
  x: number
  y: number
}

export interface IBallProps extends ICanvasObject {
  radius: number
  ballSpeed: IBallSpeed
  moving?: boolean
}

type BallProps = IBallProps;

export class Ball extends CanvasObject {
  radius: number;

  moving: boolean;

  ballSpeed: IBallSpeed;

  constructor(props: BallProps) {
    super(props);
    this.radius = props.radius;
    this.moving = props.moving;
    this.ballSpeed = props.ballSpeed;
  }

  setBallSpeed(ballSpeed: IBallSpeed): void {
    this.ballSpeed.x = ballSpeed.x;
    this.ballSpeed.y = ballSpeed.y;
  }

  nextMove(): void {
    let needInvert = false;
    if (!this.moving) {
      return;
    }

    this.x += this.ballSpeed.x;
    if (this.ballSpeed.x > 0) {
      if (this.x + this.radius >= this.canvasWidth) {
        this.x = this.canvasWidth - this.radius;
        needInvert = true;
      }
    } else if (this.x - this.radius < 0) {
      this.x = this.radius;
      needInvert = true;
    }

    if (needInvert) {
      this.ballSpeed.x = -this.ballSpeed.x;
      needInvert = false;
    }

    this.y += this.ballSpeed.y;
    if (this.ballSpeed.y > 0) {
      if (this.y + this.radius >= this.canvasHeight) {
        this.y = this.canvasHeight - this.radius;
        needInvert = true;
      }
    } else if (this.y - this.radius < 0) {
      this.y = this.radius;
      needInvert = true;
    }

    if (needInvert) {
      this.ballSpeed.y = -this.ballSpeed.y;
    }
  }

  render(canvas: CanvasRenderingContext2D | undefined = undefined) {
    super.render(canvas);
    if (this.canvas) {
      this.canvas.beginPath();
      this.canvas.strokeStyle = this.style;
      this.canvas.ellipse(this.x, this.y, this.radius, this.radius, Math.PI / 4, 0, 2 * Math.PI);
      this.canvas.fill();
    }
  }
}
