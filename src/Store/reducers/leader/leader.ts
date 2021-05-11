import { ELeaderAction, ELeaderState } from 'Reducers/leader/types';

export interface ILeaderUser {
  level: number
  score_arcnd: number
  avatar: string
  name: string
}

export interface ILeaderReducer {
  state: ELeaderState
  users: ILeaderUser[]
}

export const defaultLeaderReducer: ILeaderReducer = {
  state: ELeaderState.UNKNOWN,
  users: [],
};

export type LeaderAction = {
  state?: ELeaderState
  type: string
  payload?: any
}

export function leaderReducer(
  state: ILeaderReducer = defaultLeaderReducer,
  action: LeaderAction,
): ILeaderReducer {
  const newState = { ...state };
  switch (action.type) {
    case ELeaderAction.LEADER_ADD:
      newState.state = ELeaderState.READY;
      newState.users.push(action.payload.user);
      return newState;
    case ELeaderAction.LEADER_GET:
      newState.state = ELeaderState.READY;
      newState.users = action.payload.users;
      return newState;
    case ELeaderAction.LEADER_PENDING:
      newState.state = ELeaderState.PENDING;
      return newState;
    case ELeaderAction.LEADER_UNKNOWN:
      newState.state = ELeaderState.UNKNOWN;
      return newState;
    default:
      return state;
  }
}
