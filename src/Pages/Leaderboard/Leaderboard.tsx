import React, {useEffect} from 'react';
import {LeaderboardProps} from 'Pages/Leaderboard/types';
import Leader from 'Pages/Leaderboard/Leader/Leader';
import './Leaderboard.scss';
import {useDispatch} from "react-redux";
import {getLeaders} from 'Reducers/leaderboard/actions';
import {useLeaderboardLeaders} from "Store/hooks";
import {ELeaderboardAction} from "Reducers/leaderboard/types";

const Leaderboard: LeaderboardProps = ({...props}) => {

  const dispatch = useDispatch();

  const leaders = useLeaderboardLeaders();
  useEffect(() => {
    if (leaders.state === ELeaderboardAction.UNKNOWN) {
      dispatch(getLeaders({cursor: 0, limit: 10}))
    }
  }, [leaders]);


  return (
    <ul className="leaderboard">
      {leaders.map(({
        name, avatar, score_arcnd,
      }, index) => (
        <Leader
          key={`${name}-${score_arcnd}`}
          name={name}
          index={((index + 1) as unknown) as string}
          avatar={avatar}
          score={score_arcnd}
        />
      ))}

    </ul>
  );
};

export default Leaderboard;
