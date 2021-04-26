import React, { useEffect, useRef, useState } from 'react';
import { CanvasProps } from 'Components/Arcanoid/Canvas/types';
import Game from 'Components/Arcanoid/Game/index';
import { GAME_CANVAS_ID } from 'Components/Arcanoid/settings';
import './Canvas.scss';

const Canvas: React.FC<CanvasProps> = () => { // компонент канваса
  const [gameContext, setGameContext] = useState(null); // контекст канваса
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0); // размер канваса по умолчанию
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  const canvasRef = useRef<HTMLCanvasElement | null>(); // ссылка на канвас

  useEffect(() => { // эффект для первой отрисовки
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    if (ctx) {
      setGameContext(ctx);
    }

    const onResize = () => { // на ресайз окна обработчик
      setWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
      setHeight(typeof window !== 'undefined' ? window.innerHeight : 0);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onResize); // подписывание на ресайз
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize); // отписывание от события
      }
    };
  }, []);

  return (
    <canvas id={GAME_CANVAS_ID} ref={canvasRef} width={width} height={height}>
      <Game ctx={gameContext} />
    </canvas>
  );
};

export default Canvas;
