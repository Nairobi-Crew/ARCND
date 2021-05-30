import React, { useEffect } from 'react';
import { TouchPoint, TouchProps } from 'Components/Arcanoid/Game/Touch/types';
import isClient from 'Util/isClient';

const Touch: TouchProps = ({
  id, onMove, onCancel, onTouch, onEnd, onStart,
}) => {
  const touchPoint: TouchPoint = { x: 0, y: 0 };

  let el: HTMLElement | null;
  if (id && isClient()) {
    el = document.getElementById(id);
  }

  const getTouch = (e: TouchList): TouchPoint | null => {
    if (!e || !e[0]) {
      return null;
    }
    return { x: e[0].clientX, y: e[0].clientY };
  };

  const onTouchMoveHandler = (e: TouchEvent) => {
    const prevState = {
      x: touchPoint.x,
      y: touchPoint.y,
    };

    const touch = getTouch(e.touches);
    if (!touch) {
      return;
    }
    if (prevState.x !== 0 && prevState.y !== 0 && touch && onMove) {
      const toX = -(prevState.x - touch.x);
      const toY = -(prevState.y - touch.y);
      const isVertical = (Math.abs(toX) <= Math.abs(toY));
      if (isVertical) {
        onMove(toY < 0 ? 'up' : 'down', touch);
      } else {
        onMove(toX < 0 ? 'left' : 'right', touch);
      }
    }
    touchPoint.x = touch.x;
    touchPoint.y = touch.y;
  };

  const onTouchCancelHandler = (e: TouchEvent) => {
    if (onCancel) {
      onCancel(e);
    }
  };

  const onTouchHandler = (e: TouchEvent) => {
    if (onTouch) {
      onTouch(e);
    }
  };

  const onTouchEndHandler = (e: TouchEvent) => {
    if (onEnd) {
      onEnd(e);
    }
  };

  const onTouchStartHandler = (e: TouchEvent) => {
    if (onStart) {
      onStart(e, getTouch(e.touches));
    }
  };

  useEffect(() => {
    if (el) {
      el.addEventListener('touchmove', onTouchMoveHandler);
      el.addEventListener('touchcancel', onTouchCancelHandler);
      el.addEventListener('touchstart', onTouchHandler);
      el.addEventListener('touchend', onTouchEndHandler);
      el.addEventListener('touchstart', onTouchStartHandler);
    }
    return () => {
      if (el) {
        el.removeEventListener('touchmove', onTouchMoveHandler);
        el.removeEventListener('touchcancel', onTouchCancelHandler);
        el.removeEventListener('touchstart', onTouchHandler);
        el.removeEventListener('touchend', onTouchEndHandler);
        el.removeEventListener('touchstart', onTouchStartHandler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    </>
  );
};

export default Touch;
