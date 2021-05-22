import { EGameAction } from 'Reducers/game/types';

export interface IGameReducer {
  score: number,
  level: number,
  live: number,
  state: 'end' | 'start' | 'unknown'
}

export const defaultGameReducer: IGameReducer = {
  score: 0,
  level: 1,
  live: 3,
  state: 'unknown',
};

export type GameAction = {
  type: string
  payload?: any
  score?: number
  live?: number
  state?: 'end' | 'start' | 'unknown'
}

export function gameReducer(state = defaultGameReducer, action: GameAction): IGameReducer {
  switch (action.type) {
    case EGameAction.DEC_LIVE:
      return { ...state, live: state.live - 1 };
    case EGameAction.INC_SCORE:
      return { ...state, score: state.score + action.payload.score };
    case EGameAction.START_GAME:
      return {
        ...state, score: 0, live: 3, state: 'start',
      };
    case EGameAction.END_GAME:
      return { ...state, state: 'end' };
    case EGameAction.INC_LEVEL:
      return { ...state, level: state.level + 1 };
    case EGameAction.GO:
      return { ...state, state: 'start' };
    default:
      return state;
  }
}
