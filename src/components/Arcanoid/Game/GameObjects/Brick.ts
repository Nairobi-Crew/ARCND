import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import drawBrick from 'Components/Arcanoid/UI/drawBrick';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

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
    drawBrick(ctx, gameWindow, this.x, this.y, this.width, this.height, this.level, this.type);
  }

  intersect():void { // проверка пересечения кирпича и шарика
    if (ball.x - ball.radius > this.x + this.width // не перекрываются по оси Х
      || ball.x + ball.radius < this.x) {
      return;
    }
    if (ball.y - ball.radius > this.y + this.height // не перекрываются по оси У
      || ball.y + ball.radius < this.y) {
      return;
    }

    if (ball.speedX < 0) { // если шарик летит влево
      if (Math.abs(this.x + this.width - ball.x) < ball.radius) { // удар по грани
        ball.invertXDirection(); // инвертирование направления
        this.level -= 1; // уменьшение уровня блока
        gameProperties.score += 2; // увеличение счета
        return;
      }
    } else if (Math.abs(this.x - ball.x) < ball.radius) { // летит враво и удар по грани
      ball.invertXDirection();
      this.level -= 1;
      gameProperties.score += 2;
      return;
    }
    if (ball.speedY < 0) { // летит вверх
      if (Math.abs(this.y + this.height - ball.y) < ball.radius) { // удар по грани
        this.level -= 1;
        ball.invertYDirection();
      }
    } else if (Math.abs(this.y - ball.y) < ball.radius) { // вниз и удар по грания
      this.level -= 1;
      ball.invertYDirection();
    }
  }
}
