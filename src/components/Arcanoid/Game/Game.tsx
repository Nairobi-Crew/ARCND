import React, { useEffect } from 'react';
import { GameProps, GameWindowProps } from 'Components/Arcanoid/Game/types';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import { globalBus } from 'Util/EventBus';
import { EVENTS, RENDER_TIME } from 'Components/Arcanoid/settings';
import drawFrame from 'Components/Arcanoid/UI/drawFrame';
import drawHelp from 'Components/Arcanoid/UI/drawHelp';
import drawScore from 'Components/Arcanoid/UI/drawScore';
import drawLevel from 'Components/Arcanoid/UI/drawLevel';
import drawLives from 'Components/Arcanoid/UI/drawLives';
import { levels } from 'Components/Arcanoid/levels/levelData';

// const Game: GameProps = ({ ctx, width, height }) => {
const Game: GameProps = ({ ctx, width, height }) => {
  const gameContext: GameWindowProps = {
    top: 30,
    left: 30,
    width: width - 60,
    height: height - 60,
    right: width - 30,
    bottom: height - 30,
  };

  gameObjects.gameWindow = gameContext;

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

  // (function loop() {
  //   drawGame();
  //   requestAnimationFrame(loop);
  // }());

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
        // ball.moved = !ball.moved;
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
      } else {
        ball.lives -= 1;
        ball.onRocket = true;
        ball.gameStarted = false;
      }
    };

    const onBallReturn = () => {
      ball.score += 1;
    };

    const interval = setInterval(() => {
      drawGame();
    }, RENDER_TIME);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    globalBus.on(EVENTS.GOAL, onGoal);
    globalBus.on(EVENTS.BALL_RETURN, onBallReturn);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      globalBus.off(EVENTS.GOAL, onGoal);
      globalBus.off(EVENTS.BALL_RETURN, onBallReturn);
      clearInterval(interval);
    };
  }, []);

  return (
    <></>
  );
};

export default Game;
