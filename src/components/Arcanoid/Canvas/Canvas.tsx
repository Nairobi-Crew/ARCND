import React, { useEffect, useRef, useState } from 'react';
import { CanvasProps } from 'Components/Arcanoid/Canvas/types';
import Game from 'Components/Arcanoid/Game/index';
import { GAME_CANVAS_ID } from 'Components/Arcanoid/settings';
import './Canvas.scss';

const Canvas: React.FC<CanvasProps> = () => {
  const [gameContext, setGameContext] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const canvasRef = useRef<HTMLCanvasElement | null>();

  useEffect(() => {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    if (ctx) {
      setGameContext(ctx);
    }

    const onResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas id={GAME_CANVAS_ID} ref={canvasRef} width={width} height={height}>
      <Game ctx={gameContext} />
    </canvas>
  );
};

export default Canvas;
