import React, { useEffect, useState } from 'react';
import { LeaderboardProps } from 'Pages/Leaderboard/types';
import Leader from 'Pages/Leaderboard/Leader/Leader';
import './Leaderboard.scss';
import { useLeaderReselect } from 'Store/hooks';
import { ELeaderState } from 'Reducers/leader/types';
import { useDispatch } from 'react-redux';
import { getLeaders } from 'Reducers/leader/actions';
import { ILeaderUser } from 'Reducers/leader/leader';
import Button from "UI/Button";
import {useHistory} from "react-router-dom";

const Leaderboard: LeaderboardProps = () => {
  const [sortParam, setSortParam] = useState('level');

  const [leaders, setLeaders] = useState<ILeaderUser[]>([]);
  const leaderboard = useLeaderReselect();
  const dispatch = useDispatch();
  const history = useHistory<any>();
  const sortParams = (params:'level'|'score_arcnd') => {
    const sortedLeader = [...leaders].customSort((first:ILeaderUser,second:ILeaderUser) => {
      return first[params] > second[params]
    })
    setSortParam(params)
    setLeaders(sortedLeader)
  }

  useEffect(() => {
    if (leaderboard.state === ELeaderState.READY) {
      setLeaders(leaderboard.users);
    }
  }, [leaderboard]);

  useEffect(() => {
    dispatch(getLeaders());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="leaderboard">
      <div className="leader">

        {history?.location?.state?.score ? (
          <>
            <div className="align-left">
              <Button onClick={() => history.push('/game')}>Еще раз</Button>
            </div>
            <p style={{
              margin: "auto",
            }}>Ваш счет: {history.location.state.score}</p>
          <div className="align-right">
            <Button onClick={() => history.push('/')}>На главную</Button>
          </div>
          </>
        ) : ''}

        <span className="leader__index">№</span>

        <p className="leader__avatar">&nbsp;</p>

        <h3 className="leader__name">Имя</h3>
        <span className={`leader__level ${sortParam==="level" ? 'active' : ''}`} onClick={()=>sortParams('level')}>Уровень</span>
        <span className={`leader__score  ${sortParam==="score_arcnd" ? 'active' : ''}`} onClick={()=>sortParams('score_arcnd')}>Очки</span>
      </div>
      <ul className="leaderboard__list">
        {leaders.map(({
          name, avatar, score_arcnd,level
        }, index) => (
          <Leader
            key={`${name}-${score_arcnd}`}
            name={name}
            index={(index + 1).toString()}
            avatar={avatar}
            score={score_arcnd}
            level={level}
          />
        ))}

      </ul>
    </div>
  );
};

export default Leaderboard;
