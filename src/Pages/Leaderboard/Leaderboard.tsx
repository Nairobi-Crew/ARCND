import React, { useEffect, useState } from 'react';
import { LeaderboardProps } from 'Pages/Leaderboard/types';
import Leader from 'Pages/Leaderboard/Leader/Leader';
import './Leaderboard.scss';
import { useLeaderReselect } from 'Store/hooks';
import { ELeaderState } from 'Reducers/leader/types';
import { useDispatch } from 'react-redux';
import { getLeaders } from 'Reducers/leader/actions';
import { ILeaderUser } from 'Reducers/leader/leader';

const Leaderboard: LeaderboardProps = () => {
  // const leaders = [
  //   {
  //     name: 'name1',
  //     index: '1',
  //     avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
  //     score: '1000',
  //   },
  //
  //   {
  //     name: 'name2',
  //     index: '2',
  //     avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
  //     score: '1000',
  //   },
  //
  //   {
  //     name: 'name3',
  //     index: '3',
  //     avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
  //     score: '1000',
  //   },
  //
  //   {
  //     name: 'name4',
  //     index: '4',
  //     avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
  //     score: '1000',
  //   },
  //   {
  //     name: 'name5',
  //     index: '5',
  //     avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
  //     score: '1000',
  //   },
  //   {
  //     name: 'name6',
  //     index: '6',
  //     avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
  //     score: '1000',
  //   },
  //
  // ];

  const [leaders, setLeaders] = useState<ILeaderUser[]>([]);
  const leaderboard = useLeaderReselect();
  const dispatch = useDispatch();

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
