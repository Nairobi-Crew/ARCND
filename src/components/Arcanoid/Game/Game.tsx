import React, { useEffect } from 'react';
import { GameProps, GameWindowProps } from 'Components/Arcanoid/Game/types';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import { globalBus } from 'Util/EventBus';
import { EVENTS, FPS } from 'Components/Arcanoid/settings';
import drawFrame from 'Components/Arcanoid/UI/drawFrame';
import drawHelp from 'Components/Arcanoid/UI/drawHelp';
import drawScore from 'Components/Arcanoid/UI/drawScore';
import drawLevel from 'Components/Arcanoid/UI/drawLevel';
import drawLives from 'Components/Arcanoid/UI/drawLives';
import { levels } from 'Components/Arcanoid/levels/levelData';

const Game: GameProps = ({ ctx, width, height }) => {
  const getGameContext = (): GameWindowProps => ({
    top: 30,
    left: 30,
    width: width - 60,
    height: height - 60,
    right: width - 30,
    bottom: height - 30,
  });

  let animationFrameId;

  gameObjects.gameWindow = getGameContext();

  useEffect(() => {
    gameObjects.setContext(ctx);
    ball.setContext(ctx);
    rocket.setContext(ctx);
  }, [ctx]);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  let firstLoading = true;

  const checkContext = (): boolean => {
    if (!gameObjects.ctx) {
      if (ctx) {
        gameObjects.ctx = ctx;
        return true;
      }
      return false;
    }
    return true;
  };

  const drawGame = () => {
    if (!checkContext()) {
      return;
    }

    const context = gameObjects.ctx;

    const gameContext = getGameContext();

    if (firstLoading) {
      gameObjects.generateLevel(levels[ball.level - 1]);
      firstLoading = false;
    }
    gameObjects.data
      .filter((item) => item.type === 'brick' && (item.object as Brick).level > 0)
      .forEach((item) => (item.object as Brick).intersect());
    gameObjects.data = gameObjects.data.filter(
      (item) => item.type !== 'brick' || (item.object as Brick).level > 0,
    );
    if (gameObjects.brickCount <= 0) {
      ball.gameStarted = false;
      ball.onRocket = true;
      ball.level += 1;
      gameObjects.generateLevel(levels[ball.level - 1]);
    }
    ball.nextMove();
    rocket.nextMove();
    context.beginPath();
    context.clearRect(0, 0, width, height);
    gameObjects.render();
    ball.render(gameContext);
    rocket.render(gameContext);

    drawFrame(gameContext);
    drawHelp(gameContext);
    drawScore(gameContext);
    drawLevel(gameContext);
    drawLives(gameContext);
  };

  let now;
  let then = Date.now();
  const interval = 1000 / FPS;
  let delta;

  function loop() {
    animationFrameId = requestAnimationFrame(loop);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      drawGame();
    }
  }

  // loop();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key, keyCode } = e;
      if (keyCode === 13) {
        toggleFullScreen();
      }
      if (key === ' ') {
        if (!ball.gameStarted) {
          ball.gameStarted = true;
          ball.onRocket = false;
          if (ball.speedY > 0) {
            ball.invertYDirection();
          }
        }
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

    const onGoal = () => {
      if (ball.lives === 1) {
        globalBus.emit(EVENTS.GAME_OVER, ball.score, ball.level);
        ball.lives = 3;
        ball.onRocket = true;
        ball.gameStarted = false;
        ball.score = 0;
        ball.level = 1;
        gameObjects.generateLevel(levels[ball.level - 1]);
      } else {
        ball.lives -= 1;
        ball.onRocket = true;
        ball.gameStarted = false;
      }
    };

    const onBallReturn = () => {
      ball.score += 1;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    globalBus.on(EVENTS.GOAL, onGoal);
    globalBus.on(EVENTS.BALL_RETURN, onBallReturn);
    // loop();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      globalBus.off(EVENTS.GOAL, onGoal);
      globalBus.off(EVENTS.BALL_RETURN, onBallReturn);
    };
  }, []);

  useEffect(() => {
    console.log('Effect width');
    window.cancelAnimationFrame(animationFrameId);
    const gameContext = getGameContext();
    ball.setGameWindow(gameContext);
    rocket.setGameWindow(gameContext);
    gameObjects.gameWindow = gameContext;
    loop();
  }, [width, height]);

  return (
    <></>
  );
};

export default Game;
