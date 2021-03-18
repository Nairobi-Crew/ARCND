import CanvasObject, { ICanvasObject } from './CanvasObject';

export interface IBrickProps extends ICanvasObject {
  width: number
  height: number
}

export type BrickProps = IBrickProps;

export class Brick extends CanvasObject {
  width: number;

  height: number;

  constructor(prop: BrickProps) {
    super(prop);
    this.x = prop.x;
    this.y = prop.y;
    this.width = prop.width;
    this.height = prop.height;
    this.render();
  }

  render(canvas: CanvasRenderingContext2D | null = null): void {
    super.render(canvas);
    if (canvas) {
      this.canvas.fillStyle = this.style;
      this.canvas.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}
