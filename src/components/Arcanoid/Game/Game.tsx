import React, { useEffect } from 'react';
import { GameProps } from 'Components/Arcanoid/Game/types';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import GameFieldObjects from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
// import { ROCKET_HEIGHT } from 'Components/Arcanoid/settings';

const Game: GameProps = ({ ctx, width, height }) => {
  const gameContext = {
    top: 50,
    left: 50,
    width: width - 100,
    height: height - 100,
    right: width - 50,
    bottom: height - 50,
    ctx,
  };

  const gameObjects = new GameFieldObjects();
  gameObjects.add({
    type: 'brick',
    object: new Brick({
      x: 10, y: 10, width: 100, height: 25, fillStyle: 'red',
    }),
  });
  gameObjects.add({
    type: 'brick',
    object: new Brick({
      x: 10, y: 100, width: 100, height: 25, fillStyle: 'red',
    }),
  });
  // rocket.y = gameContext.bottom - ROCKET_HEIGHT;

  const checkContext = (): boolean => {
    if (!ctx) {
      return false;
    }
    if (!gameContext.ctx) {
      gameContext.ctx = ctx;
    }
    return true;
  };

  const drawGame = () => {
    if (!checkContext()) {
      return;
    }
    gameObjects.data
      .filter((item) => item.type === 'brick' && (item.object as Brick).level > 0)
      .forEach((item) => (item.object as Brick).intersect());
    gameObjects.data = gameObjects.data.filter(
      (item) => item.type !== 'brick' || (item.object as Brick).level > 0,
    );
    ball.nextMove();
    rocket.nextMove();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    gameObjects.render(gameContext);
    ball.render(gameContext);
    rocket.render(gameContext);

    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    // noinspection JSSuspiciousNameCombination
    ctx.rect(gameContext.top, gameContext.left, gameContext.width, gameContext.height);
    ctx.stroke();
  };

  (function loop() {
    drawGame();
    requestAnimationFrame(loop);
  }());

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === ' ') {
        ball.moved = !ball.moved;
      } else if (key === 'ArrowLeft') {
        rocket.movedLeft = true;
        rocket.movedRight = false;
      } else if (key === 'ArrowRight') {
        rocket.movedRight = true;
        rocket.movedLeft = false;
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === 'ArrowLeft') {
        rocket.movedLeft = false;
      } else if (key === 'ArrowRight') {
        rocket.movedRight = false;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <></>
  );
};

export default Game;
