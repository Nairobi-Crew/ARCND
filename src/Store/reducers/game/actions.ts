import { EGameAction } from 'Reducers/game/types';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from 'Store/types';
import { Action } from 'redux';

export const incScore = (score: number): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EGameAction.INC_SCORE, payload: { score } });
};

export const decLive = (): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EGameAction.DEC_LIVE });
};

export const endGame = (): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EGameAction.END_GAME });
};

export const incLevel = (): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EGameAction.INC_LEVEL });
};

export const go = (): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EGameAction.GO });
};
