import React, { useEffect, useRef } from 'react';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import { EVENTS, GameProps } from 'Components/Arcanoid/Game/types';
import { Ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import { globalBus } from 'Util/EventBus';
import {
  FPS,
  GAME_CANVAS_ID,
  SOUND_GAME_OVER,
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
import isClient from 'Util/isClient';
import { addLeader } from 'Reducers/leader/actions';
import { useAuthReselect } from 'Store/hooks';
import { getAvatar, getDisplayName } from 'Store/util';
import { getUserData } from 'Reducers/auth/actions';
import { getGameContext, getHeight, getWidth } from 'Components/Arcanoid/util/canvas';
import GamePad from 'Components/Arcanoid/Game/GamePad';
import Touch from 'Components/Arcanoid/Game/Touch';
import drawDebugInfo from 'Components/Arcanoid/UI/drawDebugInfo';
import {
  onBallReturn,
  onBlockCrash,
  onBlockShoot,
  onFireball, onGoal,
  onRocketMax, onShootOrStart, onSplitBall,
} from 'Components/Arcanoid/Game/Events';
import {
  onGamepadChange,
  onKeyDown,
  onKeyUp,
  onTouchCancel,
  onTouchMove,
  onTouchStart,
} from 'Components/Arcanoid/Game/Control';
import drawStartMessage from 'Components/Arcanoid/UI/drawStart';

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

  gameProperties.debug = '';

  const doResizeCanvas = (): boolean => {
    if (isClient()) {
      const canvas = document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement;
      if (!canvas) {
        return false;
      }
      canvas.onclick = () => {
        canvas.requestPointerLock();
      };
      const { width, height } = canvas;
      const firstRender = ((width || 300) + (height || 150)) === 450;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gameProperties.gameWindow = getGameContext();
      return firstRender;
    }
    return false;
  };

  const onResize = () => {
    if (doResizeCanvas()) {
      // loop();
    }
  };

  type GameOverProperties = {
    score: number
    level: number
  }

  const onGameOver = (params: GameOverProperties) => {
    const { level, score } = params;
    navigator.vibrate([200, 100, 200, 200, 200]);
    dispatch(addLeader({
      name: getDisplayName(auth.user) as string,
      avatar: getAvatar(auth.user),
      level,
      score_arcnd: score,
    }));
    dispatch(endGame());
    gameObjects.playSound(SOUND_GAME_OVER);
    history.push({
      pathname:'/leaderboard',
      state: { score }
    });
  };

  const drawGame = () => { // отрисовка кадра игры
    if (!checkContext()) { // проверка канваса
      return;
    }

    if (!gameProperties.gameStarted) {
      gameProperties.lastEvent = 0;
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
    drawDebugInfo();
    drawStartMessage();
  };

  function loop() { // обработка отрисовки кадра анимации
    frameId.current = requestAnimationFrame(loop);

    const now = Math.round((FPS * Date.now()) / 1000);
    if (now === prevTick) return;
    prevTick = now;
    drawGame();
  }

  useEffect(() => {
    dispatch(getUserData());

    const onIncScore = (inc: number) => {
      dispatch(incScore(inc));
    };

    const onDecLives = () => {
      dispatch(decLive());
    };

    const onToggleFullScreen = async () => {
      await toggleFullScreen();
    };

    const onGameStart = () => {
      dispatch(go());
    };

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
    globalBus.on(EVENTS.FIREBALL, onFireball);
    globalBus.on(EVENTS.ROCKETMAX, onRocketMax);
    globalBus.on(EVENTS.INC_SCORE, onIncScore);
    globalBus.on(EVENTS.TOGGLE_FULL_SCREEN, onToggleFullScreen);
    globalBus.on(EVENTS.DEC_LIVE, onDecLives);
    globalBus.on(EVENTS.GAME_OVER, onGameOver);
    globalBus.on(EVENTS.SHOOT_START, onShootOrStart);
    globalBus.on(EVENTS.START, onGameStart);
    gameObjects.data = [];
    if (isClient()) {
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
      globalBus.off(EVENTS.FIREBALL, onFireball);
      globalBus.off(EVENTS.ROCKETMAX, onRocketMax);
      globalBus.off(EVENTS.INC_SCORE, onIncScore);
      globalBus.off(EVENTS.TOGGLE_FULL_SCREEN, onToggleFullScreen);
      globalBus.off(EVENTS.DEC_LIVE, onDecLives);
      globalBus.off(EVENTS.GAME_OVER, onGameOver);
      globalBus.off(EVENTS.SHOOT_START, onShootOrStart);
      globalBus.off(EVENTS.START, onGameStart);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <GamePad onChange={onGamepadChange} />
      <Touch
        id={GAME_CANVAS_ID}
        onMove={onTouchMove}
        onCancel={onTouchCancel}
        onEnd={onTouchCancel}
        onStart={onTouchStart}
      />
    </>
  );
};

export default Game;
