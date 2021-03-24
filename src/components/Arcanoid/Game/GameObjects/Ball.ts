import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {
  EVENTS,
  ROCKET_HEIGHT,
  ROCKET_PART_SPEED_CHANGER,
  ROCKET_PART_SPEED_MULT,
  ROCKET_PARTS,
} from 'Components/Arcanoid/settings';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { globalBus } from 'Util/EventBus';

export interface IBallProps extends IBaseObjectProps {
  radius: number
  speedX: number
  speedY: number
  moved: boolean
}

export class Ball extends BaseObject {
  private static instance : Ball;

  radius: number;

  speedX = 0;

  speedY = 0;

  moved = false;

  constructor(props: IBallProps) {
    super(props);
    if (Ball.instance) {
      return Ball.instance;
    }
    this.radius = props.radius;
    this.moved = props.moved ? props.moved : false;
    this.speedX = props.speedX;
    this.speedY = props.speedY;
    Ball.instance = this;
  }

  render(gameWindow: GameWindowProps | undefined = undefined) {
    super.render(gameWindow);
    if (!gameWindow || !gameWindow.ctx) {
      return;
    }
    const { ctx } = this.gameWindow;
    ctx.beginPath();
    ctx.strokeStyle = this.strokeStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.ellipse(
      this.x + this.gameWindow.left,
      this.y + this.gameWindow.top,
      this.radius,
      this.radius,
      0,
      0,
      2 * Math.PI,
    );
    ctx.fill();
    ctx.stroke();
  }

  changeXSpeed(speed: number, fromCurrent = false): void {
    if (fromCurrent) {
      this.speedX += speed;
    } else {
      this.speedX = Math.abs(speed) * (this.speedX < 0 ? -1 : 1);
    }
  }

  changeYSpeed(speed: number, fromCurrent = false): void {
    if (fromCurrent) {
      this.speedY += speed;
    } else {
      this.speedY = Math.abs(speed) * (this.speedY < 0 ? -1 : 1);
    }
  }

  invertXDirection(needInvert = true): void {
    this.speedX = needInvert ? -this.speedX : this.speedX;
  }

  invertYDirection(needInvert = true): void {
    this.speedY = needInvert ? -this.speedY : this.speedY;
  }

  nextMove(): void {
    let needInvert = false;
    if (!this.moved || !this.gameWindow) {
      return;
    }

    const bottomOfBall = this.speedY
      + this.y
      + this.radius;
    const topOfBall = this.y - this.radius;
    const rightOfBall = this.x + this.radius;
    const leftOfBall = this.x - this.radius;
    const upOfRocket = this.gameWindow.height
      - ROCKET_HEIGHT; // верхняя грань рокетки
    const leftOfRocket = rocket.x;
    const rightOfRocket = leftOfRocket + rocket.width;

    if (this.speedY > 0) { // есть движение по оси вниз проверка ракетки или нижней кромки
      if (bottomOfBall > upOfRocket) {
        if (rightOfBall < leftOfRocket || leftOfBall > rightOfRocket) { // не попали в ракетку
          globalBus.emit(EVENTS.GOAL);
          this.y = upOfRocket;
          this.invertYDirection(true);
          return;
        }
        // попали в ракетку
        const ballOnRocketPosition = this.x - leftOfRocket;
        const partSize = (rocket.width - 1) / ROCKET_PARTS;
        let onPart = Math.round(ballOnRocketPosition / partSize);
        if (onPart === 0) {
          onPart = 1;
        }

        if (onPart < ROCKET_PART_SPEED_CHANGER) {
          const changeSpeed = ((ROCKET_PART_SPEED_CHANGER + 1) - onPart) * ROCKET_PART_SPEED_MULT;
          this.speedX -= changeSpeed;
        } else if (onPart > ROCKET_PARTS - ROCKET_PART_SPEED_CHANGER) {
          const partNum = ROCKET_PARTS - onPart;
          const changeSpeed = partNum * ROCKET_PART_SPEED_MULT;
          this.speedX += changeSpeed;
        } else {
          this.changeXSpeed(this.speedY);
        }
        this.y = upOfRocket - this.radius;
        globalBus.emit(EVENTS.BALL_RETURN, this.speedX, this.y);
        this.invertYDirection(true);
        return;
      }
    }

    this.x += this.speedX;
    if (this.speedX > 0) {
      if (rightOfBall >= this.gameWindow.width) {
        this.x = this.gameWindow.width - this.radius;
        needInvert = true;
      }
    } else if (leftOfBall < 0) {
      this.x = this.radius;
      needInvert = true;
    }
    this.invertXDirection(needInvert);
    needInvert = false;

    this.y += this.speedY;
    if (this.speedY > 0) {
      if (bottomOfBall >= this.gameWindow.height) {
        this.y = this.gameWindow.height - this.radius;
        needInvert = true;
      }
    } else if (topOfBall < 0) {
      this.y = this.radius;
      needInvert = true;
    }
    this.invertYDirection(needInvert);
  }
}
export const ball = new Ball({
  x: 950, y: 500, radius: 20, fillStyle: '#0f0', strokeStyle: '#f00', moved: false, speedX: 5, speedY: 5,
});
