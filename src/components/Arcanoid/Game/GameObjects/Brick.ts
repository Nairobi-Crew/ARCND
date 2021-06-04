import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import { Ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import drawBrick from 'Components/Arcanoid/UI/drawBrick';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import { globalBus } from 'Util/EventBus';
import { SCORES_BLOCK } from 'Components/Arcanoid/settings';
import { EVENTS } from 'Components/Arcanoid/Game/types';

export interface IBrickProps extends IBaseObjectProps {
  width: number
  height: number
  level?: number // уровень. Сколько раз нужно выбить блок, чтобы он исчез
  type?: number // тип блока, без бонуса или с бонусом, и каким именно бонусом
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

  /**
   * Отрисовка блока
   */
  render(): void {
    super.render();
    super.render();
    const { ctx, gameWindow } = gameProperties;
    if (!ctx || !gameWindow) {
      return;
    }
    drawBrick(ctx, gameWindow, this.x, this.y, this.width, this.height, this.level, this.type);
  }

  /**
   * Проверка пересечения, шарика и блока
   */
  intersect(ball: Ball):void { // проверка пересечения кирпича и шарика
    if (ball.x - ball.radius > this.x + this.width // не перекрываются по оси Х
      || ball.x + ball.radius < this.x) {
      return;
    }
    if (ball.y - ball.radius > this.y + this.height // не перекрываются по оси У
      || ball.y + ball.radius < this.y) {
      return;
    }

    const fireball = () => {
      const incScore = SCORES_BLOCK * this.level;
      gameProperties.score += incScore; // увеличение счета
      this.level = 0; // уменьшение уровня блока
      globalBus.emit(EVENTS.BLOCK, incScore, this);
    };

    if (ball.speedX < 0) { // если шарик летит влево
      if (Math.abs(this.x + this.width - ball.x) < ball.radius) { // удар по грани
        if (ball.fireball) {
          fireball();
        } else {
          ball.invertXDirection(); // инвертирование направления
          this.level -= 1; // уменьшение уровня блока
          gameProperties.score += SCORES_BLOCK; // увеличение счета
          globalBus.emit(EVENTS.BLOCK, SCORES_BLOCK, this);
        }
        return;
      }
    } else if (Math.abs(this.x - ball.x) < ball.radius) { // летит враво и удар по грани
      if (ball.fireball) {
        fireball();
      } else {
        ball.invertXDirection();
        this.level -= 1;
        gameProperties.score += SCORES_BLOCK;
        globalBus.emit(EVENTS.BLOCK, SCORES_BLOCK, this);
      }
      return;
    }
    if (ball.speedY < 0) { // летит вверх
      if (Math.abs(this.y + this.height - ball.y) < ball.radius) { // удар по грани
        if (ball.fireball) {
          fireball();
        } else {
          this.level -= 1;
          gameProperties.score += SCORES_BLOCK;
          globalBus.emit(EVENTS.BLOCK, SCORES_BLOCK, this);
          ball.invertYDirection();
        }
      }
    } else if (Math.abs(this.y - ball.y) < ball.radius) { // вниз и удар по грани
      if (ball.fireball) {
        fireball();
      } else {
        this.level -= 1;
        gameProperties.score += SCORES_BLOCK;
        ball.invertYDirection();
        globalBus.emit(EVENTS.BLOCK, SCORES_BLOCK, this);
      }
    }
  }
}
