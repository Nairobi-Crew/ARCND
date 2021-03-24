import { GameWindowProps, IGameFieldObjectProps } from 'Components/Arcanoid/Game/types';
import padString from 'Components/Arcanoid/util/padString';
import {
  LEVEL_BLOCK_SPACE,
  LEVEL_BLOCKS_HEIGHT,
  LEVEL_BLOCKS_WIDTH,
  LEVEL_STRING_LENGTH,
} from 'Components/Arcanoid/settings';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import { typeData } from 'Components/Arcanoid/levels/levelData';

export default class GameFieldObjects {
  private static instance: GameFieldObjects;

  data: IGameFieldObjectProps[] = [];

  gameWindow: GameWindowProps = null;

  ctx: CanvasRenderingContext2D;

  constructor() {
    if (GameFieldObjects.instance) {
      return GameFieldObjects.instance;
    }

    GameFieldObjects.instance = this;
  }

  setContext(c: CanvasRenderingContext2D) {
    this.ctx = c;
  }

  add(item: IGameFieldObjectProps): void {
    this.data.push(item);
  }

  render(): void {
    this.data
      .forEach((item) => {
        item.object.setContext(this.ctx);
        item.object.render(this.gameWindow);
      });
  }

  generateLevel(levelData: string[]): void {
    this.data = this.data.filter((x) => x.type !== 'brick');
    const getNextItem = (s) => {
      let currentPos = 0;
      return () => {
        while (currentPos < s.length) {
          const char = s.substr(currentPos, 1);
          currentPos += 1;
          const res = { block: 'space', level: 0, type: 0 };
          if (char !== '0') {
            res.block = 'brick';
            res.level = parseInt(char);
            const nextChar = s.substr(currentPos, 1);
            currentPos += 1;
            if (nextChar) {
              res.type = parseInt(nextChar);
            }
            return res;
          }
          return res;
        }
        return undefined;
      };
    };

    const ld = [...levelData];
    const blockHeight = Math.round(this.gameWindow.height / 100 * LEVEL_BLOCKS_HEIGHT);
    const blockWidth = Math.round(this.gameWindow.width / 100 * LEVEL_BLOCKS_WIDTH);
    const spaceWidth = Math.round(blockWidth * LEVEL_BLOCK_SPACE);
    let y = 0;
    for (let item of ld) {
      item = padString(item, LEVEL_STRING_LENGTH, ' ');
      const nextItem = getNextItem(item);
      let blockItem = nextItem();
      let x = 0;
      while (blockItem) {
        const { block, level, type } = blockItem;
        if (block === 'space') {
          x += spaceWidth;
        } else if (block === 'brick') {
          const { strokeStyle, fillStyle } = typeData[level];
          this.data.push(
            {
              object:
                new Brick({
                  x,
                  y,
                  width: blockWidth,
                  height: blockHeight,
                  level,
                  type,
                  gameWindow: this.gameWindow,
                  ctx: this.ctx,
                  strokeStyle,
                  fillStyle,
                }),
              type: block,
            },
          );
          x += blockWidth;
        }
        blockItem = nextItem();
      }
      y += blockHeight;
    }
  }
}

export const gameObjects = new GameFieldObjects();
