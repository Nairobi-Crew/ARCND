import React from 'react';

export type TouchPoint = {
  x: number
  y:number
}

export type TouchDirection = 'up' | 'down' | 'left' | 'right' | 'none';

export type OwnTouchProps = {
  onMove?: (direction?: TouchDirection, point?: TouchPoint) => void
  onCancel?: (e?: TouchEvent) => void
  onTouch?: (e?: TouchEvent) => void
  onEnd?: (e?: TouchEvent) => void
  onStart?: (e?: TouchEvent, point?: TouchPoint | null) => void
  id?: string
};

export type TouchProps = React.FC<OwnTouchProps>;
