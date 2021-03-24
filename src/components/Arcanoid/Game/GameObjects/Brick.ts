import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { globalBus } from 'Util/EventBus';
import { EVENTS } from 'Components/Arcanoid/settings';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';

export interface IBrickProps extends IBaseObjectProps {
  width: number
  height: number
  level?: number
  type?: number
}

export class Brick extends BaseObject {
  width: number;

  height: number;

  level: number;

  type: number;

  constructor(props: IBrickProps) {
    super(props);
    this.width = props.width;
    this.height = props.height;
    this.level = props.level || 1;
    this.type = props.type || 1;
  }

  render(gameWindow: GameWindowProps | undefined = undefined): void {
    super.render(gameWindow);
    if (!this.gameWindow) {
      return;
    }
    const { ctx } = this;
    if (ctx) {
      ctx.beginPath();
      this.stylesByLevelType();
      ctx.fillStyle = this.fillStyle;
      ctx.strokeStyle = this.strokeStyle;
      ctx.fillRect(this.x + this.gameWindow.left,
        this.y + this.gameWindow.top,
        this.width,
        this.height);
    }
  }

  intersect():void {
    if (ball.x - ball.radius > this.x + this.width
      || ball.x + ball.radius < this.x) {
      return;
    }
    if (ball.y - ball.radius > this.y + this.height
      || ball.y + ball.radius < this.y) {
      return;
    }

    if (ball.speedX < 0) {
      if (Math.abs(this.x + this.width - ball.x) < ball.radius) {
        ball.invertXDirection();
        this.level -= 1;
        return;
      }
    } else if (Math.abs(this.x - ball.x) < ball.radius) {
      ball.invertXDirection();
      this.level -= 1;
      return;
    }
    if (ball.speedY < 0) {
      if (Math.abs(this.y + this.height - ball.y) < ball.radius) {
        this.level -= 1;
        ball.invertYDirection();
      }
    } else if (Math.abs(this.y - ball.y) < ball.radius) {
      globalBus.emit(EVENTS.BRICK, 'TOP', this, ball.x, ball.y);
      this.level -= 1;
      ball.invertYDirection();
    }
  }

  stylesByLevelType(): void {
    if (this.level === 1) {
      this.strokeStyle = 'red';
      this.fillStyle = 'white';
    } else if (this.level === 2) {
      this.strokeStyle = 'red';
      this.fillStyle = 'yellow';
    } else if (this.level === 3) {
      this.strokeStyle = 'red';
      this.fillStyle = 'green';
    } else {
      this.strokeStyle = 'red';
      this.fillStyle = 'blue';
    }
  }
}
