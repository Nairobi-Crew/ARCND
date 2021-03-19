import React, { useRef, useEffect } from 'react';
import {
  CANVAS_MARGIN, EVENTS, RENDER_TIME, ROCKET_MOVE_STEP,
} from './settings';
import CanvasObjects from './draws/CanvasObjects';
import { Brick } from './draws/Brick';
import DrawObject from './draws/DrawObject';
import { Ball } from './draws/Ball';
import { rocket } from './draws/Rocket';
import { globalBus } from '../../util/EventBus';

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
  let goals = 0;
  let ballsReturn = 0;

  globalBus.on(EVENTS.BALL_RETURN, () => {
    // eslint-disable-next-line no-plusplus
    ballsReturn++;
  });

  globalBus.on(EVENTS.GOAL, () => {
    // eslint-disable-next-line no-plusplus
    goals++;
  });

  const objects = new CanvasObjects();
  objects.setCanvasSize(width, height);
  const ball = new Ball({
    x: Math.round(width / 2),
    // y: 300,
    y: 200,
    radius: 10,
    style: 'rgba(20, 220, 110, 0.9)',
    ballSpeed: { x: -2, y: 2 },
  });

  ball.moving = true;

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
    x: 50, y: 50, width: 90, height: 20, style: 'rgba(200, 0, 0, 1)',
  }));
  brick.push(new Brick({
    x: 50, y: 200, width: 90, height: 20, style: 'rgba(0, 200, 0, 1)',
  }));
  brick.push(new Brick({
    x: 200, y: 50, width: 90, height: 20, style: 'rgba(0, 0, 2000, 1)',
  }));

  brick.push(new Brick({
    x: 200, y: 200, width: 100, height: 30, style: 'rgba(100, 200, 0, 1)',
  }));

  brick.push(new Brick({
    x: 400, y: 50, width: 100, height: 30, style: 'rgba(200, 200, 100, 1)',
  }).move(0, 40));

  brick.push(new Brick({
    x: 400, y: 200, width: 100, height: 30, style: 'rgba(200, 200, 100, 1)',
  }).move(0, 40));

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
    objects.data.filter(
      (x) => x.type === 'brick',
    )
      .forEach(
        (x) => (x.object as Brick).intersect(ball),
      );
    ball.nextMove();
    objects.render();
    ctx.fillStyle = '#000';
    ctx.fillText(`Goals: ${goals}`, 50, 100);
    ctx.fillText(`Success: ${ballsReturn}`, 50, 140);
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
