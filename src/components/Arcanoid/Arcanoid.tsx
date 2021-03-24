import React, { useEffect, useState } from 'react';
import Canvas from 'Components/Arcanoid/Canvas/Canvas';
import { GameScreenProps } from 'Components/Arcanoid/types';

export const Arcanoid: GameScreenProps = ({ margin }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    });
  });

  return (
    <Canvas
      left={margin || 0}
      top={margin || 0}
      width={screenWidth - (margin || 0) * 2}
      height={screenHeight - (margin || 0) * 2}
    />
  );
};

export default Arcanoid;
