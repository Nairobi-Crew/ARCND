import React, { useEffect, useRef, useState } from 'react';
import { CanvasProps } from 'Components/Arcanoid/Canvas/types';
import Game from 'Components/Arcanoid/Game/index';
import { GAME_CANVAS_ID } from 'Components/Arcanoid/settings';
import './Canvas.scss';

const Canvas: React.FC<CanvasProps> = () => { // компонент канваса
  const [gameContext, setGameContext] = useState<CanvasRenderingContext2D | undefined>(undefined); // контекст канваса
  const canvasRef = useRef<HTMLCanvasElement>(null); // ссылка на канвас

  useEffect(() => { // эффект для первой отрисовки
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    if (ctx) {
      setGameContext(ctx);
    }
  }, []);

  return (
    <canvas id={GAME_CANVAS_ID} ref={canvasRef}>
      <Game ctx={gameContext} />
    </canvas>
  );
};

export default Canvas;
