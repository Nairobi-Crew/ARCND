import { globalBus } from 'Util/EventBus';
import { EVENTS } from 'Components/Arcanoid/Game/types';
import { gameProperties } from 'Components/Arcanoid/Game/GameObjects/GameProperties';
import { rocket } from 'Components/Arcanoid/Game/GameObjects/Rocket';
import { TouchDirection, TouchPoint } from 'Components/Arcanoid/Game/Touch/types';

const goLeft = () => {
  if (gameProperties.menuMode) { // не режим меню
    return;
  }
  rocket.movedLeft = true; // перемещать ракетку влево
  rocket.movedRight = false; // остановить перемещение ракетки вправо
};

const goRight = () => {
  if (gameProperties.menuMode) { // не режим меню
    return;
  }
  rocket.movedRight = true; // перемещать ракетку вправо
  rocket.movedLeft = false; // остановить перемещение влево
};

const stop = () => {
  if (gameProperties.menuMode) { // не режим меню
    return;
  }
  rocket.movedRight = false; // остановить перемещение ракетки вправо
  rocket.movedLeft = false; // остановить перемещение влево
};

export const onGamepadChange = (list: Gamepad[]) => {
  if (list.length <= 0) {
    return;
  }
  if (list[0]) {
    const pad = list[0];
    const buttonPressed = pad.buttons.find((button) => button.pressed);
    if (buttonPressed) {
      globalBus.emit(EVENTS.SHOOT_START);
    }
    const axes = pad.axes.find((axe) => axe !== 0);
    if (axes !== undefined) {
      if (axes < -0.3) {
        goLeft();
      } else if (axes > 0.3) {
        goRight();
      } else {
        stop();
      }
    } else {
      stop();
    }
  }
};

export const onTouchMove = (direction: TouchDirection) => {
  if (direction === 'up') {
    globalBus.emit(EVENTS.SHOOT_START);
  }
};

export const onTouchCancel = () => {
  stop();
};

export const onTouchStart = (_e: TouchEvent, point: TouchPoint) => {
  if (!point) {
    return;
  }
  if (gameProperties?.gameWindow?.width) {
    const half = gameProperties.gameWindow.width / 2;
    if (point.x < half) {
      goLeft();
    } else {
      goRight();
    }
  }
};

export const onKeyDown = (e: KeyboardEvent) => { // обработчик нажатия клавиши
  const { key, keyCode } = e;
  if (keyCode === 13) { // Энтер - переключение полноэкранного режима
    globalBus.emit(EVENTS.TOGGLE_FULL_SCREEN);
  }

  if (keyCode === 27) { // ESC переключение режима меню
    gameProperties.gameStarted = !gameProperties.gameStarted; // переключение режима паузы
    gameProperties.menuMode = !gameProperties.menuMode; // переключение режима меню
  }
  if (key === ' ') { // пробел
    globalBus.emit(EVENTS.SHOOT_START);
  } else if (key === 'y' || key === 'Y' || key === 'д' || key === 'Д') { // если нажат Y или Д
    if (gameProperties.menuMode) { // если режим меню
      gameProperties.resetParams().then(({ level, score }) => globalBus.emit(EVENTS.GAME_OVER, { score, level }));
    }
  } else if (key === 'ArrowLeft') { // если стрелка ВЛЕВО
    goLeft();
  } else if (key === 'ArrowRight') { // если стрелка ВПРАВО
    goRight();
  }
};

export const onKeyUp = (e: KeyboardEvent) => { // обработчик отпускания клавиши
  const { key } = e;
  if (key === 'ArrowLeft') { // срелка влево
    rocket.movedLeft = false; // останавливаем перемещение
  } else if (key === 'ArrowRight') { // стрелка вправо
    rocket.movedRight = false; // отсанавливаем перемещение
  }
};
