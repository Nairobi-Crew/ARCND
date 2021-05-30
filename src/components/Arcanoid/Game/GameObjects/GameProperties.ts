import { GameWindowProps } from 'Components/Arcanoid/Game/types';
import isClient from 'Util/isClient';
import { NO_SHADOWS, ROCKET_WIDTH } from 'Components/Arcanoid/settings';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import levels from 'Components/Arcanoid/levels/levelData';

export interface IGameProperties {
  moved: boolean
  gameStarted: boolean
  onRocket: boolean
  score: number
  lives: number
  level: number
  ctx: CanvasRenderingContext2D | undefined
  gameWindow: GameWindowProps | undefined
  menuMode: boolean
}

/**
 * Синглтон для хранения текущих параметров игры
 */
export class GameProperties {
  private static instance: GameProperties;

  moved = false; //

  gameStarted = false; // игра началась

  onRocket = true; // шарик на рокетке

  score = 0; // счет

  lives = 3; // жизни

  level = 1; // текущий уровень

  lastShoot = 0; // время последнего выстрела

  ctx: CanvasRenderingContext2D | undefined; // контекст канваса

  gameWindow: GameWindowProps | undefined;

  menuMode = false; // режим отображения меню

  useShadows = true;

  constructor(props: IGameProperties) {
    if (GameProperties.instance) {
      return GameProperties.instance;
    }
    this.ctx = props.ctx;
    this.gameStarted = props.gameStarted;
    this.level = props.level;
    this.lives = props.lives;
    this.menuMode = props.menuMode;
    this.moved = props.moved;
    this.score = props.score;
    this.onRocket = props.onRocket;
    this.gameWindow = props.gameWindow;
    GameProperties.instance = this;
    if (isClient()) {
      if (NO_SHADOWS) {
        this.useShadows = false;
      } else {
        const isFirefox = typeof (global as any).InstallTrigger !== 'undefined';
        this.useShadows = !isFirefox;
      }
    }
  }

  newLevel(level: number): Promise<void> {
    return new Promise((resolve) => {
      this.gameStarted = false;
      this.onRocket = true; // шарик на рокетку
      this.level += 1; // увеличение уровня
      gameObjects.removeShoots();
      gameObjects.removeBalls();
      gameObjects.removeThings(true);
      rocket.gun = 0;
      rocket.glue = 0;
      rocket.width = ROCKET_WIDTH;
      gameObjects.generateLevel(
        levels[level],
      ); // генерация уровня
      resolve();
    });
  }

  resetParams(): Promise<{score: number, level: number}> {
    return new Promise((resolve) => {
      const { score, level } = this;

      gameObjects.removeThings(true);
      rocket.width = ROCKET_WIDTH;
      rocket.glue = 0;
      rocket.gun = 0;
      gameObjects.removeShoots();
      this.lives = 3;
      this.onRocket = true;
      this.score = 0;
      this.level = 1;
      gameObjects.generateLevel(levels[this.level - 1]); // генерация уровня
      resolve({ score, level });
    });
  }
}

export const gameProperties = new GameProperties({
  ctx: undefined,
  gameStarted: false,
  level: 1,
  lives: 3,
  menuMode: false,
  moved: true,
  score: 0,
  onRocket: true,
  gameWindow: undefined,
});
