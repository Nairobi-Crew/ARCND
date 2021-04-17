import React, {useEffect, useState} from 'react';
import {LeaderboardProps} from 'Pages/Leaderboard/types';
import Leader from 'Pages/Leaderboard/Leader/Leader';
import './Leaderboard.scss';
import {useDispatch} from "react-redux";
import {getLeaders} from 'Reducers/leaderboard/actions';
import {useLeaderboardLeaders} from "Store/hooks";
import {getUserData} from "Reducers/auth/actions";
import {EForumState} from "Reducers/forum/types";
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
      {leaders.leaders.map(({
                      name, avatar, score,
                    },i) =>
        <Leader key={name} name={name} index={i} avatar={avatar} score={score} />)}

    </ul>
  );
};

export default Leaderboard;
