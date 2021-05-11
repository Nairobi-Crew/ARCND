import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import {
  SHOOT_HEIGHT, SHOOT_SPEED, SHOOT_WIDTH, THING_HEIGHT, THING_WIDTH,
} from 'Components/Arcanoid/settings';
import drawShoot from 'Components/Arcanoid/UI/drawShoot';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

export interface IShootProps extends IBaseObjectProps {
  width?: number
  height?: number
}

/**
 * Выстрел из пушки
 */
class Shoot extends BaseObject {
  width: number;

  height: number;

  constructor(props: IShootProps) {
    super(props);
    this.width = props.width || SHOOT_WIDTH;
    this.height = props.height || SHOOT_HEIGHT;
  }

  /**
   * Отрисовка выстрела
   * @param {GameWindowProps | undefined} gw
   */
  render() {
    super.render();
    const {
      x, y, width, height,
    } = this;
    const { ctx, gameWindow } = gameProperties;
    if (!ctx || !gameWindow) {
      return;
    }
    drawShoot(ctx, gameWindow, x, y, width, height);
  }

  /**
   * Расчет следующего положения выстрела
   */
  nextMove() {
    this.y -= SHOOT_SPEED;
  }

  /**
   * Проверка пересечения выстрела с прямоугольником
   * @param {number} x игровые координаты
   * @param {number} y
   * @param {number} width
   * @param {number} height
   * @return {boolean} пересекается?
   */
  intersect(x: number, y: number, width: number, height: number): boolean {
    const intersectX = (this.x + THING_WIDTH >= x && this.x <= x + width);
    const intersectY = (this.y + THING_HEIGHT >= y && this.y <= y + height);
    return intersectX && intersectY;
  }
}

export default Shoot;
