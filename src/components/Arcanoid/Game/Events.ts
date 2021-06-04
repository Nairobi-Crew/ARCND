import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import {
  GUN_HEIGHT,
  ROCKET_WIDTH,
  SCORES_BLOCK,
  SCORES_ROCKET, SHOOT_HEIGHT, SHOOT_INTERVAL, SHOOT_WIDTH,
  SOUND_BLOCK,
  SOUND_BLOCK_SHOOT, SOUND_GOAL, SOUND_LIVES,
  SOUND_ROCKET, SOUND_SHOOT, SOUND_SPLIT, SPLIT_ALL_BALLS, SPLIT_QTY,
} from 'Components/Arcanoid/settings';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { gameObjects } from 'Components/Arcanoid/Game/GameObjects/GameFieldObjects';
import { globalBus } from 'Util/EventBus';
import { Brick } from 'Components/Arcanoid/Game/GameObjects/Brick';
import { Ball } from 'Components/Arcanoid/Game/GameObjects/Ball';
import { randomRange } from 'Components/Arcanoid/util/random';
import { EVENTS } from 'Components/Arcanoid/Game/types';
import Shoot from 'Components/Arcanoid/Game/GameObjects/Shoot';

export const onBallReturn = () => { // если шарик отбит ракеткой
  gameProperties.score += SCORES_ROCKET; // счет увеличивается
  if (rocket.glue) {
    gameProperties.onRocket = true;
  }
  gameObjects.playSound(SOUND_ROCKET);
  globalBus.emit(EVENTS.INC_SCORE, SCORES_ROCKET);
};

export const onBlockCrash = (score: number, block: Brick) => {
  navigator.vibrate(100);
  globalBus.emit(EVENTS.INC_SCORE, score);
  gameObjects.crashBlock(block);
  gameObjects.playSound(SOUND_BLOCK);
  gameProperties.setLastEvent();
};

export const onBlockShoot = () => {
  gameProperties.score += SCORES_BLOCK;
  globalBus.emit(EVENTS.INC_SCORE, SCORES_BLOCK);
  gameObjects.playSound(SOUND_BLOCK_SHOOT);
  gameProperties.setLastEvent();
};

export const onFireball = () => {
  const balls = gameObjects.getList('ball');
  balls.forEach((ball) => (ball.object as Ball).setFireball());
  gameProperties.setLastEvent();
};

export const onRocketMax = () => {
  rocket.setMax();
  gameProperties.setLastEvent();
};

export const onSplitBall = () => {
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
  gameObjects.playSound(SOUND_SPLIT);
  if (SPLIT_ALL_BALLS) {
    balls.forEach((ball) => splitBall(ball.object as Ball));
  } else {
    splitBall(balls[0].object as Ball);
  }
  gameProperties.setLastEvent();
};

export const onGoal = (ball: Ball) => { // Обработка события ГОЛ
  const balls = gameObjects.getList('ball');
  rocket.gun = 0;
  rocket.glue = 0;
  rocket.width = ROCKET_WIDTH;
  gameObjects.removeBall(ball);
  if (balls.length <= 1) {
    navigator.vibrate(500);
    gameObjects.removeThings(true);
    gameObjects.removeShoots();
    if (gameProperties.lives === 1) { // если жизнь последняя
      // эмит события КОНЕЦ ИГРЫ, передача очков и уровня
      gameProperties.resetParams()
        .then(
          ({ score, level }) => globalBus.emit(EVENTS.GAME_OVER, { score, level }),
        );
    } else { // если не последняя
      globalBus.emit(EVENTS.DEC_LIVE);
      gameProperties.lives -= 1; // уменьшаем количество жизней
      gameObjects.addBall(true);
      gameObjects.playSound(SOUND_LIVES);
    }
  } else {
    gameObjects.playSound(SOUND_GOAL);
  }
  gameProperties.setLastEvent();
};

export const onShootOrStart = () => {
  gameProperties.neverStarted = false;
  if (!gameProperties.gameStarted) { // если игра на паузе
    gameProperties.gameStarted = true; // снимаем с паузы
    globalBus.emit(EVENTS.START);
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
            - SHOOT_HEIGHT - rocket.height - gameProperties.gameWindow.top
            - GUN_HEIGHT * 2;
          const object = new Shoot({ x, y });
          gameObjects.add({ object, type: 'shoot' });
          gameObjects.playSound(SOUND_SHOOT);
        }
      }
    }
  }
};
