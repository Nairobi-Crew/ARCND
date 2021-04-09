import BaseObject, { IBaseObjectProps } from 'Components/Arcanoid/Game/GameObjects/BaseObject';
import {
  SHOOT_HEIGHT, SHOOT_SPEED, SHOOT_WIDTH, THING_HEIGHT, THING_WIDTH,
} from 'Components/Arcanoid/settings';
import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import drawShoot from 'Components/Arcanoid/UI/drawShoot';

export interface IShootProps extends IBaseObjectProps {
  width?: number
  height?: number
}

class Shoot extends BaseObject {
  width: number;

  height: number;

  constructor(props: IShootProps) {
    super(props);
    this.width = props.width || SHOOT_WIDTH;
    this.height = props.height || SHOOT_HEIGHT;
  }

  render(gw: GameWindowProps | undefined = undefined) {
    super.render(gw);
    const {
      ctx, gameWindow, x, y, width, height,
    } = this;
    drawShoot(ctx, gameWindow, x, y, width, height);
  }

  nextMove() {
    this.y -= SHOOT_SPEED;
  }

  intersect(x: number, y: number, width: number, height: number): boolean {
    const intersectX = (this.x + THING_WIDTH >= x && this.x <= x + width);
    const intersectY = (this.y + THING_HEIGHT >= y && this.y <= y + height);
    return intersectX && intersectY;
  }
}

export default Shoot;
