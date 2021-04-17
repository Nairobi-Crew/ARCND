import {ELeaderboardAction, ILeaderResult} from 'Reducers/leaderboard/types';
import { IUser, Nullable } from 'Store/types';

export interface ILeaderboardReducer {
  state: ELeaderboardAction
  leaders: {data:ILeaderResult}[]
}

export const defaultLeaderboardReducer: ILeaderboardReducer = {
  leaders: [],
  state: ELeaderboardAction.UNKNOWN,
};

export function leaderboardReducer(
  state: ILeaderboardReducer = defaultLeaderboardReducer,
  action,
): ILeaderboardReducer {
  switch (action.type) {
    case ELeaderboardAction.LEADER_GET_STATS:
      return { ...state, state: ELeaderboardAction.LEADER_GET_STATS, leaders: action.payload };
    default:
      return state;
  }
}
