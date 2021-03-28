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

// синглтон объектов игры
export default class GameFieldObjects {
  private static instance: GameFieldObjects;

  data: IGameFieldObjectProps[] = [];

  gameWindow: GameWindowProps = null; // игровое поле

  ctx: CanvasRenderingContext2D; // контекст канваса

  brickCount: number = 0; // количество кирпичей

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
    let count = 0;
    this.data
      .forEach((item) => {
        if (item.type === 'brick') {
          count += 1;
        }
        item.object.setContext(this.ctx);
        item.object.render(this.gameWindow);
      });
    this.brickCount = count;
  }

  generateLevel(levelData: string[]): void { // генерация уровня
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
            res.level = parseInt(char, 10);
            const nextChar = s.substr(currentPos, 1);
            currentPos += 1;
            if (nextChar) {
              res.type = parseInt(nextChar, 10);
            }
            if (Number.isNaN(res.level) || Number.isNaN(res.type)) {
              return undefined;
            }
            return res;
          }
          if (Number.isNaN(res.level) || Number.isNaN(res.type)) {
            return undefined;
          }
          return res;
        }
        return undefined;
      };
    };

    const ld = [...levelData];
    const blockHeight = Math.round((this.gameWindow.height / 100) * LEVEL_BLOCKS_HEIGHT);
    const blockWidth = Math.round((this.gameWindow.width / 100) * LEVEL_BLOCKS_WIDTH);
    const spaceWidth = Math.round(blockWidth * LEVEL_BLOCK_SPACE);
    let y = 0;
    this.brickCount = 0;
    for (let i = 0; i < ld.length; i += 1) {
      const item = padString(ld[i], LEVEL_STRING_LENGTH, ' ');
      const nextItem = getNextItem(item);
      let blockItem = nextItem();
      let x = 0;
      while (blockItem) {
        const { block, level, type } = blockItem;
        if (block === 'space') {
          x += spaceWidth;
        } else if (block === 'brick') {
          const { strokeStyle, fillStyle } = typeData[level];
          this.brickCount += 1;
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
