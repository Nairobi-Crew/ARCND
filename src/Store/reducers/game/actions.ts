import { EGameAction } from 'Reducers/game/types';
import { Dispatch } from 'react';
import { GameAction } from 'Reducers/game/game';

export const incScore = (score: number) => (dispatch: Dispatch<GameAction>) => {
  dispatch({ type: EGameAction.INC_SCORE, payload: { score } });
};

export const decLive = () => (dispatch: Dispatch<GameAction>) => {
  dispatch({ type: EGameAction.DEC_LIVE });
};

// export const startGame = () => (dispatch: Dispatch<GameAction>) => {
//   dispatch({ type: EGameAction.START_GAME });
// };
//
export const endGame = () => (dispatch: Dispatch<GameAction>) => {
  dispatch({ type: EGameAction.END_GAME });
};

export const incLevel = () => (dispatch: Dispatch<GameAction>) => {
  dispatch({ type: EGameAction.INC_LEVEL });
};

export const go = () => (dispatch: Dispatch<GameAction>) => {
  dispatch({ type: EGameAction.GO });
};
