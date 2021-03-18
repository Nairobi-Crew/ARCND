export interface ICanvasObject {
  x?: number
  y?: number
  canvas?: CanvasRenderingContext2D;
}

export default class CanvasObject {
  private canvas: CanvasRenderingContext2D;

  canvasWidth: number;

  canvasHeight: number;

  x: number;

  y: number;

  constructor(props: ICanvasObject) {
    this.x = props.x;
    this.y = props.y;
    this.canvas = props.canvas;
  }

  render(canvas: CanvasRenderingContext2D | undefined = undefined): void {
    if (canvas) {
      this.canvas = canvas;
      // this.canvasWidth = canvas.wi
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
