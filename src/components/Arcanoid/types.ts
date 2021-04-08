import { FC } from 'react';

export type OwnGameScreenProps = {
  margin?: number
  fullScreen?: boolean
}

export type GameScreenProps = FC<OwnGameScreenProps>;
