import React from 'react';
import { LeaderProps } from './types';
import './Leader.scss';

const Leader: LeaderProps = ({
  name, avatar, score, index,
}) => (
  <>
    <li className="leader">
      <span className="leader__index">{index}</span>
      {
        avatar
          ? <img src={avatar} alt={name || 'UNKNOWN'} className="leader__avatar" />
          : <p>&nbsp;No avatar&nbsp;</p>
      }
      <h3 className="leader__name">{name}</h3>
      <span className="leader__score">{score}</span>
    </li>
  </>
);

export default Leader;
