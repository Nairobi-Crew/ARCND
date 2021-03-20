import DrawObject, { IDrawObjectProps } from './DrawObject';
import random from '../../../util/random';
import {
  BIRDS_GATE_HEIGHT,
  BIRDS_GATE_HEIGHT_DEVIATION, BIRDS_GATE_HEIGHT_MIN, BIRDS_GATE_MOVE,
  BIRDS_GATE_WIDTH,
  BIRDS_GATE_X_DEVIATION,
} from '../settings';
import { Bird } from './Bird';

export interface IGateProps extends IDrawObjectProps{
  gate1?: number // height
  gate2?: number
  xdiff?: number // x differences between gates 1 and 2
  level?: number
}

export type GateProps = IGateProps;

export class Gate extends DrawObject {
  private gate1: number;

  private gate2: number;

  private xdiff: number;

  level: number = 0;

  constructor(props: GateProps) {
    super({ ...props });
    if (!props.gate1 || !props.gate2) {
      this.getRandomSize();
    }
    if (props.level) {
      this.level = props.level;
    }
  }

  getRandomSize(level = 1): void {
    const deviation = random(BIRDS_GATE_HEIGHT_DEVIATION);
    const windowSize = random(BIRDS_GATE_HEIGHT) + deviation + (10 - level) + BIRDS_GATE_HEIGHT_MIN;
    const base = random(99 - windowSize);
    this.gate1 = (this.canvasHeight / 100) * base;
    this.gate2 = (this.canvasHeight / 100) * (base + windowSize);
    this.xdiff = random(BIRDS_GATE_X_DEVIATION * 2) - BIRDS_GATE_X_DEVIATION;
    console.log('Gates', {
      deviation,
      windowSize,
      base,
      g1: this.gate1,
      g2: this.gate2,
      xdiff: this.xdiff,
    });
  }

  render(canvas: CanvasRenderingContext2D | undefined = undefined): void {
    super.render(canvas);
    const cnv = this.canvas;
    if (!cnv) {
      return;
    }

    if (this.gate1 + this.gate2 === 0) {
      return;
    }

    const width = Math.round(BIRDS_GATE_WIDTH / 2);
    cnv.beginPath();
    cnv.fillStyle = this.style;
    cnv.fillRect(this.x - width, 0, BIRDS_GATE_WIDTH, this.gate1);
    cnv.fillRect(
      this.x - width - this.xdiff,
      this.gate2,
      BIRDS_GATE_WIDTH,
      this.canvasHeight - this.gate2,
    );
  }

  nextMove(): void {
    this.x -= BIRDS_GATE_MOVE;
    if (this.x < 0) {
      // eslint-disable-next-line no-plusplus
      this.level++;
      this.getRandomSize(this.level);
      this.x = this.canvasWidth;
    }
  }

  intersection(bird: Bird): boolean {
    const res = false;
    const width = Math.round(BIRDS_GATE_WIDTH / 2);
    const birdWidth = Math.round(bird.width / 2);
    if (this.x + width + Math.abs(this.xdiff) < bird.x - birdWidth) {
      return res;
    }
    if (this.x - width - Math.abs(this.xdiff) > bird.x + birdWidth) {
      return res;
    }
  }
}
