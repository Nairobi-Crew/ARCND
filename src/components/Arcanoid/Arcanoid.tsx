import React, { useRef, useEffect } from 'react';
import { globalBus } from 'Util/EventBus';
import {
  BALL_SPEED_UNIT,
  CANVAS_MARGIN, EVENTS, ROCKET_MOVE_STEP,
} from './settings';
import CanvasObjects from './objects/CanvasObjects';
import { Brick } from './objects/Brick';
import DrawObject from './objects/DrawObject';
import { Ball } from './objects/Ball';
import { rocket } from './objects/Rocket';

interface CanvasProps {
  width?: number
  height?: number
  left?: number
  top?: number
}

type Props = CanvasProps;

const Arcanoid: React.FC<Props> = ({
  width, height, left, top,
}: Props) => {
  let leftPressed = false;
  let rightPressed = false;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
  let goals = 0;
  let ballsReturn = 0;

  globalBus.on(EVENTS.BALL_RETURN, () => {
    ballsReturn += 1;
  });

  globalBus.on(EVENTS.GOAL, () => {
    goals += 1;
  });

  const objects = new CanvasObjects();
  objects.setCanvasSize(width, height);
  const ball = new Ball({
    x: Math.round(width / 2) - 1,
    // y: 300,
    y: 800,
    radius: 10,
    style: 'rgba(20, 220, 110, 0.9)',
    ballSpeed: { x: -BALL_SPEED_UNIT, y: BALL_SPEED_UNIT },
  });

  ball.moving = true;

  window.addEventListener('keydown', (e: KeyboardEvent) => {
    const { key } = e;
    if (key === ' ') {
      ball.moving = !ball.moving;
    }
    leftPressed = (key === 'ArrowLeft');
    rightPressed = (key === 'ArrowRight');
  });

  window.addEventListener('keyup', (e: KeyboardEvent) => {
    const { key } = e;
    if (key === 'ArrowLeft') {
      leftPressed = false;
    } else if (key === 'ArrowRight') {
      rightPressed = false;
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
  }));
  brick.push(new Brick({
    x: 400, y: 200, width: 100, height: 30, style: 'rgba(200, 200, 100, 1)',
  }));
  brick.forEach((b: DrawObject) => {
    objects.addObject(b, 'brick');
  });
  objects.addObject(ball, 'ball');
  objects.addObject(rocket, 'rocket');

  let ctx;

  const draw = () => {
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
      (x) => x.type === 'brick' && (x.object as Brick).level > 0,
    )
      .forEach(
        (x) => (x.object as Brick).intersect(ball),
      );
    ball.nextMove();
    objects.render().then(() => {
      ctx.beginPath();
      ctx.fillStyle = '#ff0';
      ctx.strokeStyle = '#fff';
      ctx.font = '30px arial';
      ctx.fillText(`Goals: ${goals}`, 50, 100);
      ctx.fillText(`Success: ${ballsReturn}`, 50, 140);
    });
  };

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
    (function loop() {
      draw();
      requestAnimationFrame(loop);
    }());
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} style={{ left, top }} />;
};

Arcanoid.defaultProps = {
  width: window.innerWidth - (CANVAS_MARGIN * 2),
  height: window.innerHeight - (CANVAS_MARGIN * 2),
  left: CANVAS_MARGIN,
  top: CANVAS_MARGIN,
};

export default Arcanoid;
