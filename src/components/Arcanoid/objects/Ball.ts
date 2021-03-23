import { globalBus } from 'Util/EventBus';
import DrawObject, { IDrawObjectProps } from './DrawObject';
import { rocket } from './Rocket';
import {
  EVENTS,
  ROCKET_HEIGHT,
  ROCKET_PART_SPEED_CHANGER,
  ROCKET_PART_SPEED_MULT,
  ROCKET_PARTS,
} from '../settings';

export interface IBallSpeed {
  x: number
  y: number
}

export interface IBallProps extends IDrawObjectProps {
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
          // this.moving = false;
          return;
        }
        const ballOnRocketPosition = this.x - rocketStart;
        const partSize = (rocket.width - 1) / ROCKET_PARTS;
        let onPart = Math.round(ballOnRocketPosition / partSize);
        if (onPart === 0) {
          onPart = 1;
        }

        if (onPart < ROCKET_PART_SPEED_CHANGER) {
          const changeSpeed = ((ROCKET_PART_SPEED_CHANGER + 1) - onPart) * ROCKET_PART_SPEED_MULT;
          this.ballSpeed.x -= changeSpeed;
        } else if (onPart > ROCKET_PARTS - ROCKET_PART_SPEED_CHANGER) {
          const partNum = ROCKET_PARTS - onPart;
          const changeSpeed = partNum * ROCKET_PART_SPEED_MULT;
          this.ballSpeed.x += changeSpeed;
        } else {
          this.changeXSpeed(this.ballSpeed.y);
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
    this.ballSpeed.y = -this.ballSpeed.y;
  }

  intersection(objectLeft: number, objectTop: number, width: number, height: number):boolean {
    const left = this.x - this.radius;
    const right = this.x + this.radius;
    const top = this.y - this.radius;
    const bottom = this.y + this.radius;
    const objectRight = objectLeft + width;
    const objectBottom = objectTop + height;
    return !(
      (bottom < objectTop) || (top > objectBottom) || (right < objectLeft) || (left > objectRight)
    );
  }
}
