import React, {useEffect, useState} from 'react';
import {LeaderboardProps} from 'Pages/Leaderboard/types';
import Leader from "Pages/Leaderboard/Leader/Leader";
import './Leaderboard.scss'

const Leaderboard: LeaderboardProps = ({...props}) => {
  const leaders = [
    {
      name: 'name1',
      index: '1',
      avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
      score: '1000',
    },

    {
      name: 'name2',
      index: '2',
      avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
      score: '1000',
    },

    {
      name: 'name3',
      index: '3',
      avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
      score: '1000',
    },

    {
      name: 'name4',
      index: '4',
      avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
      score: '1000',
    },
    {
      name: 'name5',
      index: '5',
      avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
      score: '1000',
    },
    {
      name: 'name6',
      index: '6',
      avatar: 'https://i.ytimg.com/vi/nXiAosV4zpU/sddefault.jpg',
      score: '1000',
    },

  ]
  return (
    <ul className="leaderboard">
      {leaders.map(({name, index, avatar, score}) =>
        <Leader key={name} name={name} index={index} avatar={avatar} score={score} />)
      }

    </ul>
  );
}

export default Leaderboard;
