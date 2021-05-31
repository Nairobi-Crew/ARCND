import { GameFieldObjectType, IGameFieldObjectProps } from 'Components/Arcanoid/Game/types';
import padString from 'Components/Arcanoid/util/padString';
import {
  EVENTS,
  LEVEL_BLOCK_SPACE,
  LEVEL_BLOCKS_HEIGHT,
  LEVEL_BLOCKS_WIDTH,
  LEVEL_STRING_LENGTH, THING_TYPE_CLEAR,
} from 'Components/Arcanoid/settings';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import Thing, { ThingType } from 'Components/Arcanoid/Game/GameObjects/Thing';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { globalBus } from 'Util/EventBus';
import Shoot from 'Components/Arcanoid/Game/GameObjects/Shoot';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import { Ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { randomRange } from 'Components/Arcanoid/util/random';
import isClient from 'Util/isClient';

// синглтон объектов игры
export default class GameFieldObjects {
  private static instance: GameFieldObjects;

  data: IGameFieldObjectProps[] = [];

  brickCount: number = 0; // количество кирпичей

  audio: AudioContext;

  sounds: AudioBuffer[] = [];

  constructor() {
    if (GameFieldObjects.instance) {
      return GameFieldObjects.instance;
    }

    GameFieldObjects.instance = this;
    if (isClient()) {
      this.audio = new AudioContext();
      for (let i = 1; i < 10; i += 1) {
        fetch(`/sounds/0${i}.mp3`, { method: 'GET' }).then(async (response) => {
          const buffer = await response.arrayBuffer();
          const audioBuffer = await this.audio.decodeAudioData(buffer);
          this.sounds.push(audioBuffer);
        });
      }
    }
  }

  playSound(n: number) {
    if (n < 0 || n > 9) {
      return;
    }
    if (this.sounds[n]) {
      const sound = this.sounds[n];
      const player = this.audio.createBufferSource();
      player.connect(this.audio.destination);
      player.buffer = sound;
      player.start();
    }
  }

  add(item: IGameFieldObjectProps): void {
    this.data.push(item);
  }

  getList(filter: GameFieldObjectType): IGameFieldObjectProps[] {
    return this.data.filter(
      (item) => (filter === 'brick'
        ? item.type === filter && (item.object as Brick).level > 0
        : item.type === filter),
    );
  }

  removeEmptyBricks(): void {
    this.data = this.data.filter(
      (item) => item.type !== 'brick' || (item.object as Brick).level > 0,
    );
  }

  render(): void {
    let count = 0;
    const { gameWindow } = gameProperties;
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
              globalBus.emit(EVENTS.BRICK_CRASH);
              this.removeShoot(shoot);
            }
          });
        }
        if (item.type === 'thing') {
          const thing = item.object as Thing;
          thing.nextMove();
          if (gameWindow && thing.intersect(
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
              case 'split':
                e = EVENTS.SPLIT;
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
          const shot = (item.object as Shoot);
          shot.nextMove();
        }
        item.object.render();
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

  removeBall(ball: Ball) {
    this.data = this.data.filter((item) => !(item.type === 'ball' && (item.object) === ball));
  }

  removeBalls() {
    this.data = this.data.filter((item) => !(item.type === 'ball'));
  }

  removeShoot(shoot: Shoot) {
    this.data = this.data.filter((item) => !(item.type === 'shoot' && (item.object as Shoot) === shoot));
  }

  removeShoots() {
    this.data = this.data.filter((item) => !(item.type === 'shoot'));
  }

  getObjectsByType(itemType: string): IGameFieldObjectProps[] {
    return this.data.filter((item) => item.type === itemType);
  }

  generateLevel(levelData: string[] | null): void { // генерация уровня
    if (!levelData) {
      return;
    }
    this.data = this.data.filter((x) => x.type !== 'brick');
    const getNextItem = (s: string) => {
      let currentPos = 0;
      return () => {
        // noinspection LoopStatementThatDoesntLoopJS
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
    const { gameWindow } = gameProperties;
    if (!gameWindow) {
      return;
    }
    const blockHeight = Math.round((gameWindow.height / 100) * LEVEL_BLOCKS_HEIGHT);
    const blockWidth = Math.round((gameWindow.width / 100) * LEVEL_BLOCKS_WIDTH);
    const spaceWidth = Math.round(blockWidth * LEVEL_BLOCK_SPACE);
    let y = 0;
    this.brickCount = 0;
    for (let i = 0; i < ld.length; i += 1) {
      const item = padString(ld[i].split(' ').join(''), LEVEL_STRING_LENGTH, ' ');
      const nextItem = getNextItem(item);
      let blockItem = nextItem();
      let x = 0;
      while (blockItem) {
        const { block, level, type } = blockItem;
        if (block === 'space') {
          x += spaceWidth;
        } else if (block === 'brick') {
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

  addBall(onRocket: boolean): void {
    if (onRocket) {
      gameProperties.onRocket = true;
      gameProperties.gameStarted = false;
    }
    this.add({
      object: new Ball({
        x: 950, // координаты по умолчанию
        y: 500,
        radius: 15, // радиус
        speedX: 5, // сророст и по осям
        speedY: 5,
      }),
      type: 'ball',
    });
  }

  crashBlock(block: Brick): void {
    let thingType: ThingType = 'none';
    let blockType = block.type;
    if (blockType === 9) {
      blockType = randomRange(1, 8);
    }
    switch (blockType) {
      case 2:
        thingType = 'gun';
        break;
      case 3:
        thingType = 'glue';
        break;
      case 4:
        thingType = 'expand';
        break;
      case 5:
        thingType = 'compress';
        break;
      case 6:
        thingType = 'split';
        break;
      default:
    }
    switch (THING_TYPE_CLEAR) {
      case 'if_random':
        if (blockType !== 9) {
          block.type = 1;
        }
        break;
      case 'yes':
        block.type = 1;
        break;
      case 'random':
        if (randomRange(0, 1) === 0) {
          block.type = 1;
        }
        break;
      default:
        //
    }
    if (thingType !== 'none') {
      const x = block.x + Math.round(block.width / 2);
      const y = block.y + Math.round(block.height / 2);
      this.add({ object: new Thing({ x, y, thingType }), type: 'thing' });
    }
  }
}

export const gameObjects = new GameFieldObjects();
