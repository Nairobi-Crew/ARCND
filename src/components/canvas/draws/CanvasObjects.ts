import CanvasObject from './CanvasObject';

export default class CanvasObjects {
  data: CanvasObject[];

  canvas: CanvasRenderingContext2D | undefined = undefined;

  constructor() {
    this.data = [];
  }

  addObject(co : CanvasObject): boolean {
    if (!this.data) {
      return false;
    }
    this.data.push(co);
    return true;
  }

  removeObject(co: CanvasObject): boolean {
    const count = this.data.length;
    this.data = this.data.filter((x: CanvasObject) => x === co);
    return this.data.length === count;
  }

  clear(): void {
    this.data = [];
  }

  setCanvas(canvas: CanvasRenderingContext2D): void {
    this.canvas = canvas;
  }

  render(): void {
    this.data.forEach((x) => {
      x.render(this.canvas);
    });
  }
}
