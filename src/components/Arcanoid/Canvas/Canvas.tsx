import React, { useEffect, useRef, useState } from 'react';
import { CanvasProps } from 'Components/Arcanoid/Canvas/types';
import Game from 'Components/Arcanoid/Game/index';

const Canvas: CanvasProps = ({
  top, left, width, height,
}) => {
  const [gameContext, setGameContext] = useState(null);

  const canvasRef = useRef<HTMLCanvasElement | null>();

  useEffect(() => {
    const ctx = canvasRef.current ? canvasRef.current.getContext('2d') : null;
    if (ctx) {
      setGameContext(ctx);
    }
  }, []);

  return (
    <canvas ref={canvasRef} style={{ left, top }} width={width} height={height}>
      <Game ctx={gameContext} width={width} height={height} />
    </canvas>
  );
};

export default Canvas;
