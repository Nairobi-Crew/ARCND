import { GameWindowProps } from 'Components/Arcanoid/Game/types';

export interface IGameProperties {
  moved: boolean
  gameStarted: boolean
  onRocket: boolean
  score: number
  lives: number
  level: number
  ctx: CanvasRenderingContext2D
  gameWindow: GameWindowProps;
  menuMode: boolean
}

/**
 * Синглтон для хранения текущих параметров игры
 */
export class GameProperties {
  private static instance;

  moved = false; //

  gameStarted = false; // игра началась

  onRocket = true; // шарик на рокетке

  score = 0; // счет

  lives = 3; // жизни

  level = 1; // текущий уровень

  lastShoot = null; // время последнего выстрела

  ctx: CanvasRenderingContext2D; // контекст канваса

  gameWindow: GameWindowProps;

  menuMode = false; // режим отображения меню

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
  }
}

export const gameProperties = new GameProperties({
  ctx: null,
  gameStarted: false,
  level: 1,
  lives: 3,
  menuMode: false,
  moved: true,
  score: 0,
  onRocket: true,
  gameWindow: undefined,
});
