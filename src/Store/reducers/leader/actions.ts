import { ILeaderUser } from 'Reducers/leader/leader';
import { API_PATH, LEADER_PATH } from 'Config/config';
import { ELeaderAction } from 'Reducers/leader/types';
import { ThunkAction } from 'redux-thunk';
import { IAppState } from 'Store/types';
import { Action } from 'redux';

const API = `${API_PATH}${LEADER_PATH}`;
export const addLeader = (leader: ILeaderUser): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
  try {
    const response = await fetch(`${API}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: leader, ratingFieldName: 'score_arcnd' }),
    });
    if (response.status === 200) {
      dispatch({ type: ELeaderAction.LEADER_ADD, payload: { user: leader } });
    } else {
      dispatch({ type: ELeaderAction.LEADER_UNKNOWN });
    }
  } catch (e) {
    dispatch({ type: ELeaderAction.LEADER_UNKNOWN });
  }
};

export const getLeaders = (): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
  try {
    const response = await fetch(`${API}/all`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ratingFieldName: 'score_arcnd', cursor: 0, limit: 10 }),
    });
    if (response.status === 200) {
      try {
        const list = await response.json();
        const leaders: ILeaderUser[] = [];
        list.forEach((item: any) => {
          leaders.push(item.data as ILeaderUser);
        });
        dispatch({ type: ELeaderAction.LEADER_GET, payload: { users: leaders } });
      } catch (e) {
        dispatch({ type: ELeaderAction.LEADER_UNKNOWN });
      }
    } else {
      dispatch({ type: ELeaderAction.LEADER_UNKNOWN });
    }
  } catch (e) {
    dispatch({ type: ELeaderAction.LEADER_UNKNOWN });
  }
};
