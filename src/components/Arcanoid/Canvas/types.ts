import { FC } from 'react';

export type OwnCanvasProps = {
  left: number
  top: number
  width: number
  height: number
};

export type CanvasProps = FC<OwnCanvasProps>;
