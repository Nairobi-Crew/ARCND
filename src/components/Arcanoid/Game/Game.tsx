import React, { useEffect } from 'react';
import { GameProps, GameWindowProps } from 'Components/Arcanoid/Game/types';
import { ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import { globalBus } from 'Util/EventBus';
import { EVENTS, FPS, GAME_CANVAS_ID } from 'Components/Arcanoid/settings';
import drawFrame from 'Components/Arcanoid/UI/drawFrame';
import drawHelp from 'Components/Arcanoid/UI/drawHelp';
import drawScore from 'Components/Arcanoid/UI/drawScore';
import drawLevel from 'Components/Arcanoid/UI/drawLevel';
import drawLives from 'Components/Arcanoid/UI/drawLives';
import { levels } from 'Components/Arcanoid/levels/levelData';
import drawMenu from 'Components/Arcanoid/UI/drawMenu';
import { useHistory } from 'react-router-dom';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';

const Game: React.FC<GameProps> = ({ ctx }) => {
  // устанавливаем размер игрового поля с отступами в 30px
  let canvasId;
  const getWidth = () => {
    if (canvasId) {
      return canvasId.width;
    }
    canvasId = document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement;
    if (canvasId) {
      return canvasId.width;
    }
    return 0;
  };

  const getHeight = () => {
    if (canvasId) {
      return canvasId.height;
    }
    canvasId = document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement;
    if (canvasId) {
      return canvasId.height;
    }
    return 0;
  };

  const history = useHistory();

  // if (!canvasId) { // канваса нет - выходим
  //   return (<></>);
  // }

  useEffect(() => { // при изменении контекста канваса, меняем его у
    gameObjects.setContext(ctx);
    ball.setContext(ctx);
    rocket.setContext(ctx);
  }, [ctx]);

  const getGameContext = (): GameWindowProps => ({
    top: 30,
    left: 30,
    width: getWidth() - 60,
    height: getHeight() - 60,
    right: getWidth() - 30,
    bottom: getHeight() - 30,
  });

  gameObjects.gameWindow = getGameContext();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const checkContext = (): boolean => {
    if (!gameObjects.ctx) {
      if (ctx) {
        gameObjects.ctx = ctx;
        ball.setContext(ctx);
        rocket.setContext(ctx);
        return true;
      }
      return false;
    }
    if (!ball.ctx) {
      ball.setContext(gameObjects.ctx);
    }
    if (!rocket.ctx) {
      rocket.setContext(gameObjects.ctx);
    }
    return true;
  };

  const drawGame = () => {
    if (!checkContext()) {
      return;
    }
    const context = gameObjects.ctx;
    const gameContext = getGameContext();

    gameObjects.data
      .filter((item) => item.type === 'brick' && (item.object as Brick).level > 0)
      .forEach((item) => (item.object as Brick).intersect());
    gameObjects.data = gameObjects.data.filter(
      (item) => item.type !== 'brick' || (item.object as Brick).level > 0,
    );
    if (gameObjects.brickCount <= 0) {
      gameProperties.gameStarted = false;
      gameProperties.onRocket = true;
      gameProperties.level += 1;
      gameObjects.generateLevel(levels[gameProperties.level - 1]);
    }
    ball.nextMove();
    rocket.nextMove();
    context.beginPath();
    context.clearRect(0, 0, getWidth(), getHeight());
    gameObjects.render();
    ball.render(gameContext);
    rocket.render(gameContext);

    drawFrame(gameContext);
    drawHelp(gameContext);
    drawScore(gameContext);
    drawLevel(gameContext);
    drawLives(gameContext);
    if (gameProperties.menuMode) {
      drawMenu(gameContext);
    }
  };

  let now;
  let then = Date.now();
  const interval = 1000 / FPS;
  let delta;

  function loop() {
    requestAnimationFrame(loop);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      drawGame();
    }
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const { key, keyCode } = e;
      if (keyCode === 13) {
        toggleFullScreen();
      }

      if (keyCode === 27) {
        gameProperties.gameStarted = !gameProperties.gameStarted;
        gameProperties.menuMode = !gameProperties.menuMode;
      }
      if (key === ' ') {
        if (!gameProperties.gameStarted) {
          gameProperties.gameStarted = true;
          gameProperties.onRocket = false;
          if (ball.speedY > 0) {
            ball.invertYDirection();
          }
        }
      } else if (key === 'y' || key === 'Y') {
        if (gameProperties.menuMode) {
          history.goBack();
        }
      } else if (key === 'ArrowLeft') {
        if (!gameProperties.menuMode) {
          rocket.movedLeft = true;
          rocket.movedRight = false;
        }
      } else if (key === 'ArrowRight') {
        if (!gameProperties.menuMode) {
          rocket.movedRight = true;
          rocket.movedLeft = false;
        }
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
      if (gameProperties.lives === 1) {
        globalBus.emit(EVENTS.GAME_OVER, gameProperties.score, gameProperties.level);
        gameProperties.lives = 3;
        gameProperties.onRocket = true;
        gameProperties.gameStarted = false;
        gameProperties.score = 0;
        gameProperties.level = 1;
        gameObjects.generateLevel(levels[gameProperties.level - 1]);
      } else {
        gameProperties.lives -= 1;
        gameProperties.onRocket = true;
        gameProperties.gameStarted = false;
      }
    };

    const onBallReturn = () => {
      gameProperties.score += 1;
    };
    gameObjects.gameWindow = getGameContext();

    gameObjects.generateLevel(levels[gameProperties.level - 1]);

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    globalBus.on(EVENTS.GOAL, onGoal);
    globalBus.on(EVENTS.BALL_RETURN, onBallReturn);
    loop();
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      globalBus.off(EVENTS.GOAL, onGoal);
      globalBus.off(EVENTS.BALL_RETURN, onBallReturn);
    };
  }, []);

  return (
    <></>
  );
};

export default Game;
