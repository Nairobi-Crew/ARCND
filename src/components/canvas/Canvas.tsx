import React, { useRef, useEffect } from 'react';
import { CANVAS_MARGIN } from './settings';
import CanvasObjects from './draws/CanvasObjects';
import { Brick } from './draws/Brick';
import CanvasObject from './draws/CanvasObject';

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

  const brick: Brick[] = [];
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

  brick.forEach((b: CanvasObject) => {
    objects.addObject(b);
  });

  useEffect(() => {
    // Initialize
    if (canvasRef.current) {
      canvasCtxRef.current = canvasRef.current.getContext('2d');
      const ctx = canvasCtxRef.current;
      if (ctx) {
        objects.setCanvas(ctx);
        ctx.fillStyle = 'rgba(100, 100, 200, 0.5)';
        ctx.fillRect(0, 0, width, height);
        ctx.createLinearGradient(0, 0, width, height);
        ctx!.beginPath();
        ctx!.stroke();
        objects.render();
      }
    }
  }, []);

  return <canvas ref={canvasRef} width={width} height={height} style={{ left, top }} />;
};

Canvas.defaultProps = {
  width: window.innerWidth - (CANVAS_MARGIN * 2),
  height: window.innerHeight - (CANVAS_MARGIN * 2),
  left: CANVAS_MARGIN,
  top: CANVAS_MARGIN,
};

export default Canvas;
