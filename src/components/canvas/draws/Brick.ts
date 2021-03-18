import CanvasObject, { ICanvasObject } from './CanvasObject';

export interface BrickProp extends ICanvasObject{
  x: number
  y: number
  width: number
  height: number
  style?: string
  context?: CanvasRenderingContext2D | null;
}

export class Brick extends CanvasObject {
  get context(): CanvasRenderingContext2D | null {
    return this.canvasContext;
  }

  set context(value: CanvasRenderingContext2D | null) {
    this.canvasContext = value;
  }

  private readonly width: number;

  private readonly height: number;

  private canvasContext: CanvasRenderingContext2D | null = null;

  private readonly style: string = '';

  constructor(prop: BrickProp) {
    super(prop);
    this.x = prop.x;
    this.y = prop.y;
    this.width = prop.width;
    this.height = prop.height;
    this.canvasContext = prop.context;
    this.style = prop.style;
    this.render();
  }

  setContext(context: CanvasRenderingContext2D): void {
    this.canvasContext = context;
    this.render();
  }

  setCoords(x: number, y: number, draw = false): void {
    this.x = x;
    this.y = y;
    if (draw) {
      this.render();
    }
  }

  render(canvas: CanvasRenderingContext2D | null = null): void {
    if (canvas) {
      this.canvasContext = canvas;
    }
    if (!this.canvasContext) {
      return;
    }
    if (this.style) {
      this.canvasContext.fillStyle = this.style;
    }
    this.canvasContext.fillRect(this.x, this.y, this.width, this.height);
  }
}
