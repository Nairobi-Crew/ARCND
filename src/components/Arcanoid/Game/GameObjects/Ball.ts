import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import {
  BALL_MAX_SPEED,
  BALL_MIN_SPEED,
  BALL_SPEED_LIMIT,
  FIREBALL_TIME,
  ROCKET_HEIGHT,
  ROCKET_PART_SPEED_CHANGER,
  ROCKET_PART_SPEED_MULT,
  ROCKET_PARTS, SOUND_WALL,
} from 'Components/Arcanoid/settings';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { globalBus } from 'Util/EventBus';
import drawBall from 'Components/Arcanoid/UI/drawBall';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { EVENTS } from 'Components/Arcanoid/Game/types';

export interface IBallProps extends IBaseObjectProps {
  radius: number
  speedX: number
  speedY: number
}

// объект шарика
export class Ball extends BaseObject {
  private static instance : Ball;

  radius: number;

  speedX = 0;

  speedY = 0;

  fireball: boolean = false;

  fireballFinish: number = 0;

  constructor(props: IBallProps, single = false) {
    super(props);
    if (single && Ball.instance) {
      return Ball.instance;
    }
    this.radius = props.radius;
    this.speedX = props.speedX;
    this.speedY = props.speedY;

    if (single) {
      Ball.instance = this;
    }
  }

  render() { // отрисовка
    super.render();
    this.checkFireball();
    this.checkMinSpeed();
    const { ctx, gameWindow } = gameProperties;
    if (!ctx || !gameWindow) {
      return;
    }
    drawBall(ctx, gameWindow, this.x, this.y, this.radius, this.fireball, this.speed());
  }

  speed(): number {
    return Math.max(Math.abs(this.speedX), Math.abs(this.speedY));
  }

  checkFireball() {
    if (this.fireballFinish === 0) {
      return;
    }
    const now = Date.now();
    if (now > this.fireballFinish) {
      this.fireball = false;
      this.fireballFinish = 0;
    }
  }

  checkMinSpeed() {
    const absX = Math.abs(this.speedX);
    const absY = Math.abs(this.speedY);
    const min = Math.min(absX, absY);
    if (min < BALL_MIN_SPEED) {
      this.doubleSpeed();
    }
  }

  doubleSpeed() {
    const k = 1.2;
    if (this.speed() * k <= BALL_MAX_SPEED) {
      this.speedX *= k;
      this.speedY *= k;
    }
  }

  setFireball() {
    this.fireballFinish = Date.now() + FIREBALL_TIME;
    this.fireball = true;
  }

  changeXSpeed(speed: number, fromCurrent = false): void { // изменение скорости по оси Х
    if (fromCurrent) { // относительная скорость
      this.speedX += speed;
    } else { // абсолютная
      this.speedX = Math.abs(speed) * (this.speedX < 0 ? -1 : 1);
    }
  }

  changeYSpeed(speed: number, fromCurrent = false): void { // изменение скорости по оси У
    if (fromCurrent) { // относительная скорость
      this.speedY += speed;
    } else { // абсолютная
      this.speedY = Math.abs(speed) * (this.speedY < 0 ? -1 : 1);
    }
  }

  invertXDirection(needInvert = true): void { // инверсия направления по оси Х
    this.speedX = needInvert ? -this.speedX : this.speedX;
  }

  invertYDirection(needInvert = true): void { // инверсия направления по оси У
    this.speedY = needInvert ? -this.speedY : this.speedY;
  }

  nextMove(): void { // обсчет кадра
    if (gameProperties.onRocket) {
      return;
    }

    const { gameWindow } = gameProperties;

    let needInvert = false;
    if (
      !gameProperties.moved
      || !gameWindow
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
    const upOfRocket = gameWindow.height
      - ROCKET_HEIGHT; // верхняя грань рокетки
    const leftOfRocket = rocket.x;
    const rightOfRocket = leftOfRocket + rocket.width;

    if (this.speedY > 0) { // есть движение по оси вниз проверка ракетки или нижней кромки
      if (bottomOfBall > upOfRocket) { // шарик опустиля ниже верхней грани ракетки
        if (rightOfBall < leftOfRocket || leftOfBall > rightOfRocket) { // не попали в ракетку
          globalBus.emit(EVENTS.GOAL, this); // эмит события гол
          this.y = upOfRocket;
          this.invertYDirection(true);
          return;
        }
        // попали в ракетку
        const ballOnRocketPosition = this.x - leftOfRocket;
        const partSize = (rocket.width + this.radius * 2) / ROCKET_PARTS;
        // на какую часть ракетки упал
        const onPart = Math.round(ballOnRocketPosition / partSize) + 1;

        if (onPart <= ROCKET_PART_SPEED_CHANGER) { // если на край, меняем скорость
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

    this.x += this.speedX; // перемещаем шарик по Х
    if (this.speedX > 0) { // летит вправо
      if (rightOfBall >= gameWindow.width) { // если долетел до края
        this.x = gameWindow.width - this.radius; //
        needInvert = true; // поменяем направление по оси Х
      }
    } else if (leftOfBall < 0) { // летит влево и долетел до края
      this.x = this.radius;
      needInvert = true; // поменяем направление по оси Х
    }
    this.invertXDirection(needInvert);
    if (needInvert) {
      gameObjects.playSound(SOUND_WALL);
    }
    needInvert = false;

    this.y += this.speedY; // перемещаем по оси У
    if (this.speedY > 0) { // летит вниз
      if (bottomOfBall >= gameWindow.height) { // долетел до края
        this.y = gameWindow.height - this.radius;
        needInvert = true; // меняем направление
      }
    } else if (topOfBall < 0) { // долетел до верхнего края
      this.y = this.radius;
      needInvert = true; // разворачиваем
    }
    if (needInvert) {
      gameObjects.playSound(SOUND_WALL);
    }
    this.invertYDirection(needInvert);
  }
}
