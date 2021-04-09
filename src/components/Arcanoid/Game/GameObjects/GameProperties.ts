export interface IGameProperties {
  moved: boolean
  gameStarted: boolean
  onRocket: boolean
  glue: boolean
  gun: boolean
  score: number
  lives: number
  level: number
  ctx: CanvasRenderingContext2D
  menuMode: boolean
}

export class GameProperties {
  private static instance;

  moved = false;

  gameStarted = false;

  onRocket = true;

  glue = false;

  gun = false;

  score = 0;

  lives = 3;

  level = 1;

  lastShoot = null;

  ctx: CanvasRenderingContext2D;

  menuMode = false;

  constructor(props: IGameProperties) {
    if (GameProperties.instance) {
      return GameProperties.instance;
    }
    this.ctx = props.ctx;
    this.gameStarted = props.gameStarted;
    this.glue = props.glue;
    this.gun = props.gun;
    this.level = props.level;
    this.lives = props.lives;
    this.menuMode = props.menuMode;
    this.moved = props.moved;
    this.score = props.score;
    this.onRocket = props.onRocket;
    GameProperties.instance = this;
  }
}

export const gameProperties = new GameProperties({
  ctx: null,
  gameStarted: false,
  glue: false,
  gun: false,
  level: 1,
  lives: 3,
  menuMode: false,
  moved: true,
  score: 0,
  onRocket: true,
});
