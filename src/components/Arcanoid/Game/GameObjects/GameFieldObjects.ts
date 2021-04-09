import { GameWindowProps, IGameFieldObjectProps } from 'Components/Arcanoid/Game/types';
import padString from 'Components/Arcanoid/util/padString';
import {
  EVENTS,
  LEVEL_BLOCK_SPACE,
  LEVEL_BLOCKS_HEIGHT,
  LEVEL_BLOCKS_WIDTH,
  LEVEL_STRING_LENGTH,
} from 'Components/Arcanoid/settings';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import { typeData } from 'Components/Arcanoid/levels/levelData';
import Thing from 'Components/Arcanoid/Game/GameObjects/Thing';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { globalBus } from 'Util/EventBus';
import Shoot from 'Components/Arcanoid/Game/GameObjects/Shoot';

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
    const { gameWindow, ctx } = this;
    this.data
      .forEach((item) => {
        if (item.type === 'brick') {
          count += 1;
          const brick = item.object as Brick;
          const shoots = this.getObjectsByType('shoot');
          shoots.forEach(({ object }) => {
            const shoot = object as Shoot;
            if (shoot.intersect(brick.x, brick.y, brick.width, brick.height)) {
              brick.level -= 1;
              this.removeShoot(shoot);
            }
          });
        }
        if (item.type === 'thing') {
          const thing = item.object as Thing;
          if (!thing.gameWindow || !thing.ctx) {
            thing.gameWindow = gameWindow;
            thing.ctx = ctx;
          }
          thing.nextMove();
          if (
            thing.intersect(
              rocket.x,
              gameWindow.bottom - rocket.height - gameWindow.top,
              rocket.width,
              rocket.height,
            )
          ) {
            let e = '';
            switch (thing.thingType) {
              case 'compress':
                e = EVENTS.COMPRESS;
                break;
              case 'expand':
                e = EVENTS.EXPAND;
                break;
              case 'glue':
                e = EVENTS.GLUE;
                break;
              case 'gun':
                e = EVENTS.GUN;
                break;
              default:
                break;
            }
            if (e !== '') {
              globalBus.emit(e, thing);
              this.removeThing(thing);
            }
          }
        }
        if (item.type === 'shoot') {
          (item.object as Shoot).nextMove();
        }
        item.object.setContext(this.ctx);
        item.object.render(this.gameWindow);
      });
    this.brickCount = count;
    this.removeThings(false);
  }

  removeThings(all: boolean) {
    this.data = this.data.filter((item) => !(item.type === 'thing' && (!(item.object as Thing).active || all)));
  }

  removeThing(thing: Thing) {
    this.data = this.data.filter((item) => !(item.type === 'thing' && (item.object as Thing) === thing));
  }

  removeShoot(shoot: Shoot) {
    this.data = this.data.filter((item) => !(item.type === 'shoot' && (item.object as Shoot) === shoot));
  }

  getObjectsByType(itemType: string): IGameFieldObjectProps[] {
    return this.data.filter((item) => item.type === itemType);
  }

  generateLevel(levelData: string[] | null): void { // генерация уровня
    if (!levelData) {
      return;
    }
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
