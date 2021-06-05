import React, { useEffect, useRef } from 'react';
import { GamePadProps } from 'Components/Arcanoid/Game/GamePad/types';
import { isEqual } from 'Util/objectsIsEqual';

const GamePad: GamePadProps = ({ children, onChange }) => {
  const frame = useRef<number>(0);
  const gamepadList = () => {
    const list: Gamepad[] = [];
    try {
      if (navigator.getGamepads) {
        const gp = navigator.getGamepads();
        if (gp) {
          Object.values(gp).forEach((pad) => {
            if (pad) { list.push(pad); }
          });
        }
      }
    } catch (e) {
      //
    }
    return list;
  };

  let pads: Gamepad[] = gamepadList();

  const onConnect = (e: GamepadEvent) => {
    const { gamepad } = e;
    const found = pads.find((item) => item.id === gamepad.id);
    if (found) {
      return;
    }

    pads.push(gamepad);
  };

  const onDisconnect = (e: GamepadEvent) => {
    const { gamepad } = e;
    pads = pads.filter((item) => item !== gamepad);
  };

  function updateStatus() {
    frame.current = requestAnimationFrame(updateStatus);
    const currentList = gamepadList();
    const changed: Gamepad[] = [];
    const newState: Gamepad[] = [];
    pads.forEach((pad) => {
      const found = currentList.find((item) => item.id === pad.id);
      if (found) {
        if (!isEqual(pad.axes, found.axes) || !isEqual(pad.buttons, found.buttons)) {
          changed.push(found);
        }
        newState.push(found);
      }
    });

    if (changed.length > 0) {
      pads = [...newState];
    }
    if (onChange && changed.length > 0) {
      onChange(changed);
    }
  }

  useEffect(() => {
    window.addEventListener('gamepadconnected', onConnect);
    window.addEventListener('gamepaddisconnected', onDisconnect);
    updateStatus();
    return () => {
      window.removeEventListener('gamepadconnected', onConnect);
      window.removeEventListener('gamepaddisconnected', onDisconnect);
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default GamePad;
