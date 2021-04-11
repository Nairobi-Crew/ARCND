import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import {
  EVENTS,
  ROCKET_FILL_STYLE,
  ROCKET_HEIGHT,
  ROCKET_MOVE_STEP,
  ROCKET_STROKE_STYLE,
  ROCKET_WIDTH,
} from 'Components/Arcanoid/settings';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import drawRocket from 'Components/Arcanoid/UI/drawRocket';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import { globalBus } from 'Util/EventBus';

export interface IRocketProps extends IBaseObjectProps {
  width: number,
  height: number,
}

export class Rocket extends BaseObject {
  private static instance: Rocket;

  height: number;

  width: number;

  movedLeft: boolean;

  movedRight: boolean;

  gun = false;

  glue = false;

  constructor(props: IRocketProps) {
    super(props);
    if (Rocket.instance) {
      return Rocket.instance;
    }

    this.width = props.width;
    this.height = props.height;

    Rocket.instance = this;
    globalBus.on(EVENTS.EXPAND, () => {
      this.changeWidth(1.1);
      this.glue = false;
      this.gun = false;
      gameProperties.onRocket = false;
    });
    globalBus.on(EVENTS.COMPRESS, () => {
      this.glue = false;
      this.gun = false;
      gameProperties.onRocket = false;
      this.changeWidth(0.9);
    });
    globalBus.on(EVENTS.GLUE, () => {
      this.glue = true;
      this.gun = false;
    });
    globalBus.on(EVENTS.GUN, () => {
      this.gun = true;
      this.glue = false;
    });
  }

  changeWidth(q: number) {
    this.width = Math.round(this.width * q);
  }

  render(gameWindow: GameWindowProps | undefined = undefined): void {
    super.render(gameWindow);
    if (!this.gameWindow || !this.ctx) {
      return;
    }
    const { ctx } = this;
    drawRocket(ctx, this.gameWindow, this.x, this.y, this.width, this.glue, this.gun);
  }

  moveRocket(delta: number): void { // перемещение рактки
    this.x += delta;
    if (delta > 0) {
      if (this.x + this.width > this.gameWindow.width) { // не пускать за край вправо
        this.x = this.gameWindow.width - this.width;
      }
    } else if (this.x < 0) { // не пускать за край влево
      this.x = 0;
    }
  }

  nextMove(): void { // следующий кадр ракетки
    // если шарик на ракетке, то перемещаем и шарик
    if (this.gameWindow && this.ctx && gameProperties.onRocket) {
      ball.x = this.x + Math.round(this.width / 2);
      ball.y = this.gameWindow.height - this.height - ball.radius;
    }
    if (this.movedLeft) { // если двигается влево
      this.moveRocket(-ROCKET_MOVE_STEP);
    } else if (this.movedRight) { // или если вправо
      this.moveRocket(ROCKET_MOVE_STEP);
    }
  }
}

export const rocket = new Rocket({
  x: Math.round(window.innerWidth / 2),
  y: window.innerHeight - ROCKET_HEIGHT,
  width: ROCKET_WIDTH,
  height: ROCKET_HEIGHT,
  fillStyle: ROCKET_FILL_STYLE,
  strokeStyle: ROCKET_STROKE_STYLE,
});
