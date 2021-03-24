export interface IDrawObjectProps {
  x?: number
  y?: number
  canvasWidth?: number
  canvasHeight?: number
  canvas?: CanvasRenderingContext2D;
  style?: string
}

export type DrawObjectProps = IDrawObjectProps;

export default class DrawObject {
  canvas: CanvasRenderingContext2D;

  style: string;

  canvasWidth: number;

  canvasHeight: number;

  x: number;

  y: number;

  constructor(props: DrawObjectProps) {
    this.x = props.x ? props.x : 0;
    this.y = props.y ? props.y : 0;
    this.canvas = props.canvas;
    this.style = props.style ? props.style : '';
    if (props.canvasHeight) {
      this.canvasHeight = props.canvasHeight;
    }
    if (props.canvasWidth) {
      this.canvasWidth = props.canvasWidth;
    }
  }

  render(canvas: CanvasRenderingContext2D | undefined = undefined): void {
    if (canvas) {
      this.canvas = canvas;
    }
  }

  setCanvas(context: CanvasRenderingContext2D): void {
    this.canvas = context;
  }

  setCanvasSize(width: number, height: number): void {
    this.canvasHeight = height;
    this.canvasWidth = width;
  }

  setCoords(x: number, y: number, draw = false): void {
    this.x = x;
    this.y = y;
    if (draw) {
      this.render();
    }
  }

  offScreen(): boolean {
    return (
      this.x >= 0
      && this.x <= this.canvasWidth
      && this.y >= 0
      && this.y <= this.canvasHeight
    );
  }

  move(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
    return this;
  }
}
