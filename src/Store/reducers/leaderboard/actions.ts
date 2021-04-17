import {API_URL, SORT_NAME} from 'Config/config';
import {ELeaderboardAction, ILeaderResult} from 'Reducers/leaderboard/types';
import {ILeaderboardStatsData} from './types';

export const getLeaders = (data: ILeaderboardStatsData) => async (dispatch) => {
  const response = await fetch(`${API_URL}leaderboard/all`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ratingFieldName: SORT_NAME,
        ...data,
      }),
    });

  const leaders = await response.json();
  if (response.status === 200) {
    dispatch({type: ELeaderboardAction.LEADER_GET_STATS, payload: leaders});
  }
};

export const pushResult = ({score,name,avatar,level}: ILeaderResult) => async (dispatch) => {
  console.warn('pushResult')
  const response = await fetch(`${API_URL}leaderboard`,
    {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          [SORT_NAME]: score,
          name,level,avatar
        },
        ratingFieldName: SORT_NAME
      }),
    });
  if (response.status === 200) {
    dispatch({type: ELeaderboardAction.LEADER_PUSH_RESULT, payload: response.json()});
  }
};
