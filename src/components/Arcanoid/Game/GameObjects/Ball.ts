import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import {
  BALL_FILL_STYLE,
  BALL_SPEED_LIMIT,
  BALL_STROKE_STYLE,
  EVENTS,
  ROCKET_HEIGHT,
  ROCKET_PART_SPEED_CHANGER,
  ROCKET_PART_SPEED_MULT,
  ROCKET_PARTS,
} from 'Components/Arcanoid/settings';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { globalBus } from 'Util/EventBus';
import drawBall from 'Components/Arcanoid/UI/drawBall';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

export interface IBallProps extends IBaseObjectProps {
  radius: number
  speedX: number
  speedY: number
}

// синглтон на объект шарика и другие игровые свойства
export class Ball extends BaseObject {
  private static instance : Ball;

  radius: number;

  speedX = 0;

  speedY = 0;

  constructor(props: IBallProps) {
    super(props);
    if (Ball.instance) {
      return Ball.instance;
    }
    this.radius = props.radius;
    this.speedX = props.speedX;
    this.speedY = props.speedY;
    Ball.instance = this;
  }

  render(gameWindow: GameWindowProps | undefined = undefined) {
    super.render(gameWindow);
    if (!gameWindow || !this.ctx) {
      return;
    }
    const { ctx } = this;
    drawBall(ctx, this.gameWindow, this.x, this.y, this.radius, this.strokeStyle, this.fillStyle);
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
    if (
      !gameProperties.moved
      || !this.gameWindow
      || !gameProperties.gameStarted
      || gameProperties.onRocket) {
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
        const partSize = (rocket.width + this.radius * 2) / ROCKET_PARTS;
        const onPart = Math.round(ballOnRocketPosition / partSize) + 1;

        if (onPart <= ROCKET_PART_SPEED_CHANGER) {
          const speedChanger = onPart - ROCKET_PART_SPEED_CHANGER + 1;
          this.speedX -= (speedChanger * ROCKET_PART_SPEED_MULT);
          if (this.speedX < 0) {
            if (Math.abs(this.speedX) < BALL_SPEED_LIMIT) {
              this.speedX = -BALL_SPEED_LIMIT;
            }
          }
        } else if (onPart > ROCKET_PARTS - ROCKET_PART_SPEED_CHANGER) {
          const partNum = ROCKET_PARTS - onPart + 1;
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
  x: 950, // координаты по умолчанию
  y: 500,
  radius: 15, // радиус
  fillStyle: BALL_FILL_STYLE, // стили. заполнения
  strokeStyle: BALL_STROKE_STYLE, // и обводки
  speedX: 5, // сророст и по осям
  speedY: 5,
});
