import DrawObject from './DrawObject';

export interface CanvasObjectItem {
  object: DrawObject;
  type: string
}

export default class CanvasObjects {
  data: CanvasObjectItem[];

  canvas: CanvasRenderingContext2D | undefined = undefined;

  canvasWidth: number = 0;

  canvasHeight: number = 0;

  constructor() {
    this.data = [];
  }

  addObject(co : DrawObject, type: string): boolean {
    if (!this.data) {
      return false;
    }
    co.canvasWidth = this.canvasWidth;
    co.canvasHeight = this.canvasHeight;
    this.data.push({ object: co, type });
    return true;
  }

  removeObject(co: DrawObject): boolean {
    const count = this.data.length;
    this.data = this.data.filter((x: CanvasObjectItem) => x.object === co);
    return this.data.length === count;
  }

  clear(): void {
    this.data = [];
  }

  setCanvas(canvas: CanvasRenderingContext2D): void {
    this.canvas = canvas;
  }

  setCanvasSize(width: number, height: number):void {
    this.canvasWidth = width;
    this.canvasHeight = height;
  }

  render(): void {
    this.canvas.beginPath();
    this.data.forEach((x) => {
      x.object.render(this.canvas);
    });
    // this.canvas.
  }
}
