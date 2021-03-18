import React, { useRef, useEffect } from 'react';
import { CANVAS_MARGIN } from './settings';
import CanvasObjects from './draws/CanvasObjects';
import { Brick } from './draws/Brick';
import CanvasObject from './draws/CanvasObject';
import { Ball } from './draws/Ball';

interface CanvasProps {
  width?: number
  height?: number
  left?: number
  top?: number
}

type Props = CanvasProps;

const Canvas: React.FC<Props> = ({
  width, height, left, top,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const objects = new CanvasObjects();
  objects.setCanvasSize(width, height);

  const brick: CanvasObject[] = [];
  brick.push(new Brick({
    x: 10, y: 10, width: 100, height: 30, style: 'rgba(200, 100, 0, 1)',
  }).move(0, 40));
  brick.push(new Brick({
    x: 120, y: 10, width: 100, height: 30, style: 'rgba(200, 100, 0, 1)',
  }));
  brick.push(new Brick({
    x: 230, y: 10, width: 100, height: 30, style: 'rgba(200, 200, 0, 1)',
  }).move(0, 40));

  brick.push(new Brick({
    x: 340, y: 10, width: 100, height: 30, style: 'rgba(100, 200, 0, 1)',
  }));

  brick.push(new Brick({
    x: 450, y: 10, width: 100, height: 30, style: 'rgba(200, 200, 100, 1)',
  }).move(0, 40));

  const ball = new Ball({
    x: 800,
    y: 700,
    radius: 15,
    style: 'rgba(20, 220, 110, 0.9)',
    ballSpeed: { x: 0, y: 0 },
  });
  brick.push(ball);
  ball.ballSpeed.x = 2;
  ball.ballSpeed.y = 2;
  ball.moving = true;

  brick.forEach((b: CanvasObject) => {
    objects.addObject(b);
  });

  let ctx;

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      ctx = canvasCtxRef.current;
      if (ctx) {
        objects.setCanvas(ctx);
        ctx.fillStyle = 'rgba(200, 100, 200, 0.2)';
        ctx.fillRect(0, 0, width, height);
        // ctx!.beginPath();
        // ctx!.stroke();
        objects.render();
      }
    }
  }, []);
  setInterval(() => {
    if (ctx) {
      ctx.fillStyle = 'rgba(200, 100, 200, 0.2)';
      ctx.fillRect(0, 0, width, height);
    }
    ball.nextMove();
    objects.render();
  }, 5);

  return <canvas ref={canvasRef} width={width} height={height} style={{ left, top }} />;
};

Canvas.defaultProps = {
  width: window.innerWidth - (CANVAS_MARGIN * 2),
  height: window.innerHeight - (CANVAS_MARGIN * 2),
  left: CANVAS_MARGIN,
  top: CANVAS_MARGIN,
};

export default Canvas;
