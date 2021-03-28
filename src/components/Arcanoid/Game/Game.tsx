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
  let canvasId;

  const getWidth = () => { // ширина канваса
    if (canvasId) {
      return canvasId.width;
    }
    canvasId = document.getElementById(GAME_CANVAS_ID) as HTMLCanvasElement;
    if (canvasId) {
      return canvasId.width;
    }
    return 0;
  };

  const getHeight = () => { // высота канваса
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

  useEffect(() => { // при изменении контекста канваса, меняем его у
    gameObjects.setContext(ctx);
    ball.setContext(ctx);
    rocket.setContext(ctx);
  }, [ctx]);

  // устанавливаем размер игрового поля
  const getGameContext = (): GameWindowProps => ({
    top: 30,
    left: 2,
    width: getWidth() - 4,
    height: getHeight() - 60,
    right: getWidth() - 30,
    bottom: getHeight() - 30,
  });

  gameObjects.gameWindow = getGameContext(); // для кирпичей устанавливаем размер поля

  const toggleFullScreen = () => { // переключатель в полноэкранный режим
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // проверка установлен ли канвас в объектах для отрисовки и установка его
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

  const drawGame = () => { // отрисовка кадра игры
    if (!checkContext()) { // проверка канваса
      return;
    }

    // функция проверки шарика на столкновение с кирпичами
    // и уменьшение уровня кирпича на 1 при столкновении
    gameObjects.data // фильтр на кирпичи с уровнем < 1
      .filter((item) => item.type === 'brick' && (item.object as Brick).level > 0)
      .forEach((item) => (item.object as Brick).intersect());

    // удаление кирпичей с уровнем 0
    gameObjects.data = gameObjects.data.filter(
      (item) => item.type !== 'brick' || (item.object as Brick).level > 0,
    );

    if (gameObjects.brickCount <= 0) { // если количество кирпичей = 0, то уровень пройден
      gameProperties.gameStarted = false; // игра на паузу
      gameProperties.onRocket = true; // шарик на рокетку
      gameProperties.level += 1; // увеличение уровня
      gameObjects.generateLevel(levels[gameProperties.level - 1]); // генерация уровня
    }
    ball.nextMove(); // перемещение шарика на следующий кадр
    rocket.nextMove(); // перемещение рокетки на следующий кадр
    const context = gameObjects.ctx;
    const gameContext = getGameContext();
    context.beginPath();
    context.clearRect(0, 0, getWidth(), getHeight()); // очистка игрового поля
    gameObjects.render(); // отрисовка кирпичей
    ball.render(gameContext); // шарика
    rocket.render(gameContext); // рокетки

    drawFrame(gameContext); // рамки
    drawHelp(gameContext); // строки состояния
    drawScore(gameContext); // счета
    drawLevel(gameContext); // уровня
    drawLives(gameContext); // жизней
    if (gameProperties.menuMode) { // если режим меню
      drawMenu(gameContext); // то меню рисуем
    }
  };

  let now; // для текущего времени
  let then = Date.now(); // текущее время
  const interval = 1000 / FPS; // интервал в мс для обновления согласно нужного ФПС
  let delta;

  function loop() { // обработка отрисовки кадра анимации
    requestAnimationFrame(loop);
    now = Date.now();
    delta = now - then; // сколько прошло времени

    if (delta > interval) { // больше, чем интервал с ФПС
      then = now - (delta % interval);
      drawGame(); // рисуем кадр
    }
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { // обработчик нажатия клавиши
      const { key, keyCode } = e;
      if (keyCode === 13) { // Энтер - переключение полноэкранного режима
        toggleFullScreen();
      }

      if (keyCode === 27) { // ESC переключение режима меню
        gameProperties.gameStarted = !gameProperties.gameStarted; // переключение режима паузы
        gameProperties.menuMode = !gameProperties.menuMode; // переключение режима меню
      }
      if (key === ' ') { // пробул
        if (!gameProperties.gameStarted) { // если игра на паузе
          gameProperties.gameStarted = true; // снимаем с паузы
          gameProperties.onRocket = false; // отвязка шарика от рокетки
          if (ball.speedY > 0) { // если шарик летит вниз, то меняем направление
            ball.invertYDirection();
          }
        }
      } else if (key === 'y' || key === 'Y' || key === 'д' || key === 'Д') { // если нажат Y или Д
        if (gameProperties.menuMode) { // если режим меню
          history.goBack(); // то идем НАЗАД
          // history.push('/leaderboard');
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

    const onGoal = () => { // Обработка события ГОЛ
      if (gameProperties.lives === 1) { // если жизнь последняя
        // эмит события КОНЕЦ ИГРЫ, передача очков и уровня
        globalBus.emit(EVENTS.GAME_OVER, gameProperties.score, gameProperties.level);
        gameProperties.lives = 3; // теперь жизней 3
        gameProperties.onRocket = true; // шарик приклеен к рокетке
        gameProperties.gameStarted = false; // игра на паузе
        gameProperties.score = 0; // счет 0
        gameProperties.level = 1; // уровень 1
        gameObjects.generateLevel(levels[gameProperties.level - 1]); // генерация уровня
      } else { // если не последняя
        gameProperties.lives -= 1; // уменьшаем количество жизней
        gameProperties.onRocket = true; // шарик на рокетке
        gameProperties.gameStarted = false; // на паузу
      }
    };

    const onBallReturn = () => { // если шарик отбит ракеткой
      gameProperties.score += 1; // счет увеличивается
    };
    // получаем размер поля
    gameObjects.gameWindow = getGameContext();
    // генерируем уровень
    gameObjects.generateLevel(levels[gameProperties.level - 1]);

    // события на нажатие клавиши
    window.addEventListener('keydown', onKeyDown);
    // события на отпускание клавиши
    window.addEventListener('keyup', onKeyUp);
    // события на ГОЛ
    globalBus.on(EVENTS.GOAL, onGoal);
    // события на отбивание шарика
    globalBus.on(EVENTS.BALL_RETURN, onBallReturn);
    loop(); // запуск игрового цикла
    return () => { // очистка обработчиков события
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
