import DrawObject, { ICanvasObject } from './DrawObject';
import { rocket } from './Rocket';
import { globalBus } from '../../../util/EventBus';
import { EVENTS, ROCKET_HEIGHT } from '../settings';

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

export class Ball extends DrawObject {
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

    if (this.ballSpeed.y > 0) {
      const half = Math.round(rocket.width / 2);
      const rocketStart = rocket.position - half - this.radius;
      const rocketEnd = rocket.position + half + this.radius;
      if (this.ballSpeed.y + this.y + this.radius > this.canvasHeight - ROCKET_HEIGHT) {
        // this.moving = false;
        if (this.x < rocketStart || this.x > rocketEnd) {
          globalBus.emit(EVENTS.GOAL);
          this.y = this.canvasHeight - this.radius;
          this.ballSpeed.y = -this.ballSpeed.y;
          return;
        }
        this.y = this.canvasHeight - ROCKET_HEIGHT - this.radius;
        globalBus.emit(EVENTS.BALL_RETURN, this.ballSpeed.x, this.y);
        this.ballSpeed.y = -this.ballSpeed.y;
        return;
      }
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
      this.canvas.fillStyle = this.style;
      this.canvas.ellipse(this.x, this.y, this.radius, this.radius, Math.PI / 4, 0, 2 * Math.PI);
      this.canvas.fill();
    }
  }

  changeXSpeed(speed: number): void {
    this.ballSpeed.x = Math.abs(speed) * (this.ballSpeed.x < 0 ? -1 : 1);
  }

  changeYSpeed(speed: number): void {
    this.ballSpeed.y = Math.abs(speed) * (this.ballSpeed.y < 0 ? -1 : 1);
  }

  changeXDirection(): void {
    this.ballSpeed.x = -this.ballSpeed.x;
  }

  changeYDirection(): void {
    const was = { ...this.ballSpeed };
    this.ballSpeed.y = -this.ballSpeed.y;
    console.log('Change Y Direction', { ballSpeed: this.ballSpeed, was });
  }
}
