import React, { useEffect, useRef } from 'react';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import { GameProps } from 'Components/Arcanoid/Game/types';
import { Ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import { globalBus } from 'Util/EventBus';
import {
  EVENTS,
  FPS,
  GAME_CANVAS_ID,
  GUN_HEIGHT,
  SHOOT_HEIGHT,
  SHOOT_INTERVAL,
  SHOOT_WIDTH,
  SPLIT_ALL_BALLS,
  SPLIT_QTY,
} from 'Components/Arcanoid/settings';
import drawFrame from 'Components/Arcanoid/UI/drawFrame';
import drawHelp from 'Components/Arcanoid/UI/drawHelp';
import drawScore from 'Components/Arcanoid/UI/drawScore';
import drawLevel from 'Components/Arcanoid/UI/drawLevel';
import drawLives from 'Components/Arcanoid/UI/drawLives';
import levels from 'Components/Arcanoid/levels/levelData';
import drawMenu from 'Components/Arcanoid/UI/drawMenu';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  decLive, endGame, go, incLevel, incScore,
} from 'Reducers/game/actions';
import { randomRange } from 'Components/Arcanoid/util/random';
import Shoot from 'Components/Arcanoid/Game/GameObjects/Shoot';
import isClient from 'Util/isClient';
import { addLeader } from 'Reducers/leader/actions';
import { useAuthReselect } from 'Store/hooks';
import { getAvatar, getDisplayName } from 'Store/util';
import { getUserData } from 'Reducers/auth/actions';
import { getGameContext, getHeight, getWidth } from 'Components/Arcanoid/util/canvas';

const Game: React.FC<GameProps> = ({ ctx }) => {
  let prevTick = 0;
  const frameId = useRef(0);
  const dispatch = useDispatch();
  const auth = useAuthReselect();

  const history = useHistory();

  useEffect(() => { // при изменении контекста канваса, меняем его у
    gameProperties.ctx = ctx;
  }, [ctx]);

  gameProperties.gameWindow = getGameContext(); // для кирпичей устанавливаем размер поля

  const toggleFullScreen = async () => { // переключатель в полноэкранный режим
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      await document.exitFullscreen();
    }
  };

  // проверка установлен ли канвас в объектах для отрисовки и установка его
  const checkContext = (): boolean => {
    if (!gameProperties.ctx) {
      if (ctx) {
        gameProperties.ctx = ctx;
        return true;
      }
      return false;
    }
    return true;
  };

  const doResizeCanvas = (): boolean => {
    if (isClient()) {
      const canvas = document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement;
      if (!canvas) {
        return false;
      }
      const { width, height } = canvas;
      const firstRender = ((width || 300) + (height || 150)) === 450;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameProperties.gameWindow = getGameContext();
      return firstRender;
    }
    return false;
  };

  const drawGame = () => { // отрисовка кадра игры
    if (!checkContext()) { // проверка канваса
      return;
    }

    // функция проверки шарика на столкновение с кирпичами
    // и уменьшение уровня кирпича на 1 при столкновении
    const bricks = gameObjects.getList('brick');

    const balls = gameObjects.getList('ball');

    // если шариков на поле 0, то приклеиваем новый на ракетку
    if (balls.length === 0) {
      gameObjects.addBall(true);
    }

    balls.forEach(
      (ball) => bricks.forEach(
        (item) => (
              item.object as Brick).intersect((ball.object as Ball)),
      ),
    );

    // удаление кирпичей с уровнем 0
    gameObjects.removeEmptyBricks();

    if (gameObjects.brickCount <= 0) { // если количество кирпичей = 0, то уровень пройден
      const level = Math.min(gameProperties.level - 1, levels.length - 1);
      gameProperties.newLevel(level).then(() => {
        dispatch(incLevel());
        doResizeCanvas();
      });
    }
    balls.forEach((ball) => (ball.object as Ball).nextMove());
    rocket.nextMove(); // перемещение ракетки на следующий кадр
    const context = gameProperties.ctx;
    const gameContext = getGameContext();
    if (!context || !gameContext) {
      return;
    }

    context.beginPath();
    context.clearRect(0, 0, getWidth(), getHeight()); // очистка игрового поля
    context.closePath();
    gameObjects.render(); // отрисовка кирпичей
    balls.forEach((ball) => (ball.object as Ball).render());
    rocket.render(); // рокетки

    drawFrame(gameContext); // рамки
    drawHelp(gameContext); // строки состояния
    drawScore(gameContext); // счета
    drawLevel(gameContext); // уровня
    drawLives(gameContext); // жизней
    if (gameProperties.menuMode) { // если режим меню
      drawMenu(gameContext); // то меню рисуем
    }
  };

  function loop() { // обработка отрисовки кадра анимации
    frameId.current = requestAnimationFrame(loop);

    const now = Math.round((FPS * Date.now()) / 1000);
    if (now === prevTick) return;
    prevTick = now;
    drawGame();
  }

  const onResize = () => {
    if (doResizeCanvas()) {
      // loop();
    }
  };

  type GameOverProperties = {
    score: number
    level: number
  }

  const gameOver = (params: GameOverProperties) => {
    const { level, score } = params;
    dispatch(addLeader({
      name: getDisplayName(auth.user) as string,
      avatar: getAvatar(auth.user),
      level,
      score_arcnd: score,
    }));
    dispatch(endGame());
    history.push('/leaderboard');
  };

  // onResize();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { // обработчик нажатия клавиши
      const { key, keyCode } = e;
      if (keyCode === 13) { // Энтер - переключение полноэкранного режима
        toggleFullScreen().then(() => {});
      }

      if (keyCode === 27) { // ESC переключение режима меню
        gameProperties.gameStarted = !gameProperties.gameStarted; // переключение режима паузы
        gameProperties.menuMode = !gameProperties.menuMode; // переключение режима меню
      }
      if (key === ' ') { // пробел
        if (!gameProperties.gameStarted) { // если игра на паузе
          gameProperties.gameStarted = true; // снимаем с паузы
          dispatch(go());
          gameProperties.onRocket = false; // отвязка шарика от рокетки
          const balls = gameObjects.getList('ball');
          balls.forEach((item) => {
            const ball = item.object as Ball;
            if (ball.speedY > 0) { // если шарик летит вниз, то меняем направление
              ball.invertYDirection();
            }
          });
        } else {
          gameProperties.onRocket = false;
          if (rocket.glue) {
            rocket.glue -= 1;
          }
          const shot = gameProperties.lastShoot || 0;
          if (rocket.gun) {
            rocket.gun -= 1;
            if (Date.now() - shot > SHOOT_INTERVAL) {
              if (gameProperties && gameProperties.gameWindow) {
                gameProperties.lastShoot = Date.now();
                const x = rocket.x + Math.round(rocket.width / 2 - SHOOT_WIDTH / 2);
                const y = gameProperties.gameWindow.bottom
                  - SHOOT_HEIGHT - rocket.height
                  - GUN_HEIGHT * 2;
                const object = new Shoot({ x, y });
                gameObjects.add({ object, type: 'shoot' });
              }
            }
          }
        }
      } else if (key === 'y' || key === 'Y' || key === 'д' || key === 'Д') { // если нажат Y или Д
        if (gameProperties.menuMode) { // если режим меню
          gameProperties.resetParams().then(({ level, score }) => gameOver({ level, score }));
        }
      } else if (key === 'ArrowLeft') { // если стрелка ВЛЕВО
        if (!gameProperties.menuMode) { // не режим меню
          rocket.movedLeft = true; // перемещать ракетку влево
          rocket.movedRight = false; // остановить перемещение ракетки вправо
        }
      } else if (key === 'ArrowRight') { // если стрелка ВПРАВО
        if (!gameProperties.menuMode) { // не режим меню
          rocket.movedRight = true; // перемещать ракетку вправо
          rocket.movedLeft = false; // остановить перемещение влево
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => { // обработчик отпускания клавиши
      const { key } = e;
      if (key === 'ArrowLeft') { // срелка влево
        rocket.movedLeft = false; // останавливаем перемещение
      } else if (key === 'ArrowRight') { // стрелка вправо
        rocket.movedRight = false; // отсанавливаем перемещение
      }
    };

    const onGoal = (ball: Ball) => { // Обработка события ГОЛ
      const balls = gameObjects.getList('ball');
      gameObjects.removeBall(ball);
      gameObjects.removeThings(true);
      gameObjects.removeShoots();
      if (balls.length <= 1) {
        // gameProperties.resetParams().then();
        if (gameProperties.lives === 1) { // если жизнь последняя
          // эмит события КОНЕЦ ИГРЫ, передача очков и уровня
          gameProperties.resetParams().then(({ score, level }) => gameOver({ score, level }));
        } else { // если не последняя
          dispatch(decLive());
          gameProperties.lives -= 1; // уменьшаем количество жизней
          gameObjects.addBall(true);
        }
      }
    };

    const onBallReturn = () => { // если шарик отбит ракеткой
      gameProperties.score += 1; // счет увеличивается
      if (rocket.glue) {
        gameProperties.onRocket = true;
      }
      dispatch(incScore(1));
    };

    const onBlockCrash = (score: number, block: Brick) => {
      dispatch(incScore(score));
      gameObjects.crashBlock(block);
    };

    const onBlockShoot = () => {
      gameProperties.score += 1;
      dispatch(incScore(1));
    };

    const onSplitBall = () => {
      const splitBall = (ball: Ball) => {
        for (let i = 0; i < SPLIT_QTY; i += 1) {
          let speedX = randomRange(-5, 5);
          if (speedX === 0) {
            speedX += 1;
          }
          let speedY = randomRange(-5, 5);
          if (speedY === 0) {
            speedY += 1;
          }
          speedX *= 2;
          speedY *= 2;
          gameObjects.add({
            object: new Ball({
              x: ball.x,
              y: ball.y,
              radius: ball.radius,
              speedX,
              speedY,
            }),
            type: 'ball',
          });
        }
      };
      const balls = gameObjects.getList('ball');
      if (SPLIT_ALL_BALLS) {
        balls.forEach((ball) => splitBall(ball.object as Ball));
      } else {
        splitBall(balls[0].object as Ball);
      }
    };
    dispatch(getUserData());

    // генерируем уровень
    gameProperties.level = -1;

    // события на нажатие клавиши
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', onKeyDown);
      // события на отпускание клавиши
      window.addEventListener('keyup', onKeyUp);
      window.addEventListener('resize', onResize);
    }
    // события на ГОЛ
    globalBus.on(EVENTS.GOAL, onGoal);
    // события на отбивание шарика
    globalBus.on(EVENTS.BALL_RETURN, onBallReturn);
    globalBus.on(EVENTS.BLOCK, onBlockCrash);
    globalBus.on(EVENTS.BRICK_CRASH, onBlockShoot);
    globalBus.on(EVENTS.SPLIT, onSplitBall);
    gameObjects.data = [];
    if (isClient()) {
      // onResize();
      loop(); // запуск игрового цикла
    }
    return () => { // очистка обработчиков события
      cancelAnimationFrame(frameId.current);
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
        window.removeEventListener('resize', onResize);
      }
      globalBus.off(EVENTS.GOAL, onGoal);
      globalBus.off(EVENTS.BALL_RETURN, onBallReturn);
      globalBus.off(EVENTS.BLOCK, onBlockCrash);
      globalBus.off(EVENTS.BRICK_CRASH, onBlockShoot);
      globalBus.off(EVENTS.SPLIT, onSplitBall);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <></>
  );
};

export default Game;
