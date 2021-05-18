import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import {
  EVENTS, GLUE_QTY,
  ROCKET_HEIGHT,
  ROCKET_MOVE_STEP,
  ROCKET_WIDTH, SHOOT_QTY,
} from 'Components/Arcanoid/settings';
import drawRocket from 'Components/Arcanoid/UI/drawRocket';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import { globalBus } from 'Util/EventBus';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { Ball } from 'Components/Arcanoid/Game/GameObjects/Ball';

export interface IRocketProps extends IBaseObjectProps {
  width: number,
  height: number,
}

/**
 * Объект ракетки для игры
 */
export class Rocket extends BaseObject {
  private static instance: Rocket;

  height: number; // высота

  width: number; // ширина

  movedLeft: boolean; // движется влево?

  movedRight: boolean; // движется вправо?

  gun = 0; // выстрелов у пушки

  glue = 0; // количество клея

  constructor(props: IRocketProps) {
    super(props);
    if (Rocket.instance) {
      return Rocket.instance;
    }

    this.width = props.width;
    this.height = props.height;

    Rocket.instance = this;
    // Шина событий для бонусов
    globalBus.on(EVENTS.EXPAND, () => { // бонус расширения ракетки
      this.glue = 0; // отмена бонуса клея
      this.gun = 0; // отмена бонуса пушки
      gameProperties.onRocket = false; // сбрасывание шарика, если он приклеен
      if (gameObjects.getList('ball').length > 1) {
        return;
      }
      this.changeWidth(1.1); // увеличение ширина на 10%
    });
    globalBus.on(EVENTS.COMPRESS, () => { // бонус сужения ракетки
      this.glue = 0; // отмена бонуса клея
      this.gun = 0; // отмена бонуса пушки
      gameProperties.onRocket = false; // сбрасывание шарика, если он приклеен
      if (gameObjects.getList('ball').length > 1) {
        return;
      }
      this.changeWidth(0.9); // уменьшение ширины до 90%
    });
    globalBus.on(EVENTS.GLUE, () => { // бонус клея
      this.gun = 0; // отмена бонуса пушки
      if (gameObjects.getList('ball').length > 1) {
        return;
      }
      this.glue = GLUE_QTY;
    });
    globalBus.on(EVENTS.GUN, () => { // бонус пушки
      this.glue = 0; // отмена бонуса клея
      gameProperties.onRocket = false; // сбрасывание шарика, если он приклеен
      if (gameObjects.getList('ball').length > 1) {
        return;
      }
      this.gun = SHOOT_QTY; // установка бонуса пушки на количество выстрелов
    });

    globalBus.on(EVENTS.SPLIT, () => {
      this.gun = 0;
      this.glue = 0;
    });
  }

  /**
   * изменение ширины ракетки
   * @param {number} q - коеффициент
   */
  changeWidth(q: number) {
    this.width = Math.round(this.width * q);
  }

  /**
   * Отрисовка ракетки
   */
  render(): void {
    super.render();
    super.render();
    const { ctx, gameWindow } = gameProperties;
    if (!ctx || !gameWindow) {
      return;
    }
    drawRocket(ctx, gameWindow, this.x, this.y, this.width, this.glue, this.gun);
  }

  /**
   * Перемещение ракетки
   * @param {number} delta величина смещения +/-
   * - влево, + вправо
   */
  moveRocket(delta: number): void {
    this.x += delta;
    const { gameWindow } = gameProperties;
    if (!gameWindow) {
      return;
    }
    if (delta > 0) {
      if (this.x + this.width > gameWindow.width) { // не пускать за край вправо
        this.x = gameWindow.width - this.width;
      }
    } else if (this.x < 0) { // не пускать за край влево
      this.x = 0;
    }
  }

  /**
   *Покадровое определение следующего положения ракетки
   */
  nextMove(): void {
    const { gameWindow, ctx } = gameProperties;
    // если шарик на ракетке, то перемещаем и шарик
    const balls = gameObjects.getList('ball');
    if (gameWindow && ctx && gameProperties.onRocket && balls.length === 1) {
      const ball = balls[0].object as Ball;
      ball.x = this.x + Math.round(this.width / 2);
      ball.y = gameWindow.height - this.height - ball.radius;
    }
    if (this.movedLeft) { // если двигается влево
      this.moveRocket(-ROCKET_MOVE_STEP);
    } else if (this.movedRight) { // или если вправо
      this.moveRocket(ROCKET_MOVE_STEP);
    }
  }
}

export const rocket = new Rocket({
  x: Math.round(typeof window !== 'undefined' ? window.innerWidth / 2 : 0),
  y: typeof window !== 'undefined' ? window.innerHeight - ROCKET_HEIGHT : 0,
  width: ROCKET_WIDTH,
  height: ROCKET_HEIGHT,
});
