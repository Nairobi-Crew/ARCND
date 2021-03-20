import React, { useEffect, useRef } from 'react';
import { CANVAS_MARGIN, RENDER_TIME } from './settings';
import CanvasObjects from './draws/CanvasObjects';
import { bird } from './draws/Bird';
import { Gate } from './draws/Gate';

export interface ICanvasProps {
  width?: number
  height?: number
  left?: number
  top?: number
}

type CanvasProps = ICanvasProps;

export const FlyBirds: React.FC<CanvasProps> = ({
  width, height, top, left,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContext = useRef<CanvasRenderingContext2D>(null);
  let spacePressed = false;
  let ctx;
  const objects = new CanvasObjects();
  objects.setCanvasSize(width, height);

  const keyDownHandler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === ' ') {
      spacePressed = true;
    }
  };

  const keyUpHandler = (e: KeyboardEvent) => {
    const { key } = e;
    if (key === ' ') {
      spacePressed = false;
    }
  };

  const sampleGate = new Gate({
    x: 500,
    canvas: ctx,
    canvasWidth: width,
    canvasHeight: height,
  });

  useEffect(() => {
    if (canvasRef.current) {
      canvasContext.current = canvasRef.current.getContext('2d');
      ctx = canvasContext.current;
      if (ctx) {
        ctx.clearRect(0, 0, width, height);
        objects.setCanvas(ctx);
      }

      sampleGate.setCanvas(ctx);
      sampleGate.setCanvasSize(width, height);

      objects.addObject(bird, 'bird');
      objects.addObject(sampleGate, 'gate');
      objects.render();
      document.addEventListener('keydown', keyDownHandler);
      document.addEventListener('keyup', keyUpHandler);
      return () => {
        document.removeEventListener('keydown', keyDownHandler);
        document.removeEventListener('keyup', keyUpHandler);
      };
    }
  }, []);


  setInterval(() => {
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
    }
    bird.nextPosition(spacePressed);
    sampleGate.nextMove();
    objects.render();
  }, RENDER_TIME);

  return <canvas ref={canvasRef} width={width} height={height} style={{ left, top }} />;
};

FlyBirds.defaultProps = {
  width: window.innerWidth - (CANVAS_MARGIN * 2),
  height: window.innerHeight - (CANVAS_MARGIN * 2),
  left: CANVAS_MARGIN,
  top: CANVAS_MARGIN,
};
