import { EGameAction } from 'Reducers/game/types';

export const incScore = (score: number) => (dispatch) => {
  dispatch({ type: EGameAction.INC_SCORE, payload: { score } });
};

export const decLive = () => (dispatch) => {
  dispatch({ type: EGameAction.DEC_LIVE });
};

export const startGame = () => (dispatch) => {
  dispatch({ type: EGameAction.START_GAME });
};

export const endGame = () => (dispatch) => {
  dispatch({ type: EGameAction.END_GAME });
};

export const incLevel = () => (dispatch) => {
  dispatch({ type: EGameAction.INC_LEVEL });
};

export const go = () => (dispatch) => {
  dispatch({ type: EGameAction.GO });
};
