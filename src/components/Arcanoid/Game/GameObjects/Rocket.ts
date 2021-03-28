import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import {
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

  constructor(props: IRocketProps) {
    super(props);
    if (Rocket.instance) {
      return Rocket.instance;
    }

    this.width = props.width;
    this.height = props.height;

    Rocket.instance = this;
  }

  render(gameWindow: GameWindowProps | undefined = undefined): void {
    super.render(gameWindow);
    if (!this.gameWindow || !this.ctx) {
      return;
    }
    const { ctx } = this;
    drawRocket(ctx, this.gameWindow, this.x, this.y, this.width, this.strokeStyle, this.fillStyle);
  }

  moveRocket(delta: number): void {
    this.x += delta;
    if (delta > 0) {
      if (this.x + this.width > this.gameWindow.width) {
        this.x = this.gameWindow.width - this.width;
      }
    } else if (this.x < 0) {
      this.x = 0;
    }
  }

  nextMove(): void {
    if (this.gameWindow && this.ctx && gameProperties.onRocket) {
      ball.x = this.x + Math.round(this.width / 2);
      ball.y = this.gameWindow.height - this.height - ball.radius;
    }
    if (this.movedLeft) {
      this.moveRocket(-ROCKET_MOVE_STEP);
    } else if (this.movedRight) {
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
