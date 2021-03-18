import React, { useRef, useEffect } from 'react';
import { CANVAS_MARGIN, RENDER_TIME, ROCKET_MOVE_STEP } from './settings';
import CanvasObjects from './draws/CanvasObjects';
import { Brick } from './draws/Brick';
import DrawObject from './draws/DrawObject';
import { Ball } from './draws/Ball';
import random from '../../util/random';
import { rocket } from './draws/Rocket';

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
  let leftPressed = false;
  let rightPressed = false;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  const objects = new CanvasObjects();
  objects.setCanvasSize(width, height);
  const ball = new Ball({
    x: 800,
    y: 700,
    radius: 15,
    style: 'rgba(20, 220, 110, 0.9)',
    ballSpeed: { x: 0, y: 0 },
  });

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const { key } = e;
    switch (key) {
      case ' ':
        // ball.changeXSpeed(random(6) - 3);
        // ball.changeYSpeed(random(6) - 3);
        ball.moving = !ball.moving;
        break;
      case 'ArrowLeft':
        leftPressed = true;
        break;
      case 'ArrowRight':
        rightPressed = true;
        break;
    }
  });
  window.addEventListener('keyup', (e: KeyboardEvent) => {
    const { key } = e;
    switch (key) {
      case 'ArrowLeft':
        leftPressed = false;
        break;
      case 'ArrowRight':
        rightPressed = false;
        break;
    }
  });

  const brick: DrawObject[] = [];
  brick.push(new Brick({
    x: 10, y: 10, width: 100, height: 30, style: 'rgba(200, 0, 0, 1)',
  }).move(0, 40));
  brick.push(new Brick({
    x: 120, y: 10, width: 100, height: 30, style: 'rgba(0, 200, 0, 1)',
  }));
  brick.push(new Brick({
    x: 230, y: 10, width: 100, height: 30, style: 'rgba(0, 0, 2000, 1)',
  }).move(0, 40));

  brick.push(new Brick({
    x: 340, y: 10, width: 100, height: 30, style: 'rgba(100, 200, 0, 1)',
  }));

  brick.push(new Brick({
    x: 450, y: 10, width: 100, height: 30, style: 'rgba(200, 200, 100, 1)',
  }).move(0, 40));

  ball.ballSpeed.x = -3;
  ball.ballSpeed.y = 2;
  ball.moving = true;

  brick.forEach((b: DrawObject) => {
    objects.addObject(b, 'brick');
  });

  objects.addObject(ball, 'ball');
  objects.addObject(rocket, 'rocket');

  let ctx;

  useEffect(() => {
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      ctx = canvasCtxRef.current;
      if (ctx) {
        objects.setCanvas(ctx);
        ctx.clearRect(0, 0, width, height);
        objects.render();
      }
    }
  }, []);
  setInterval(() => {
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      ctx.rect(0, 0, width, height);
      ctx.stroke();
    }
    if (leftPressed) {
      rocket.moveRocket(-ROCKET_MOVE_STEP);
    }
    if (rightPressed) {
      rocket.moveRocket(ROCKET_MOVE_STEP);
    }
    ball.nextMove();
    objects.render();
    objects.data.filter((x) => x.type === 'brick').forEach((x) => (x.object as Brick).intersect(ball));
  }, RENDER_TIME);

  return <canvas ref={canvasRef} width={width} height={height} style={{ left, top }} />;
};

Canvas.defaultProps = {
  width: window.innerWidth - (CANVAS_MARGIN * 2),
  height: window.innerHeight - (CANVAS_MARGIN * 2),
  left: CANVAS_MARGIN,
  top: CANVAS_MARGIN,
};

export default Canvas;
