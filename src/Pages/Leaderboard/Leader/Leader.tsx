import React from 'react';
import { LeaderProps } from './types';
import './Leader.scss';

const Leader: LeaderProps = ({
  name, avatar, score, index = 0, level,
}) => (
  <>
    <li className="leader">
      <span className="leader__index">{index}</span>
      {
        avatar
          ? <img src={`/api/v2/avatar${avatar}`} alt={name || 'UNKNOWN'} className="leader__avatar" />
          : <p className="leader__avatar">&nbsp;No avatar&nbsp;</p>
      }
      <h3 className="leader__name">{name}</h3>
      <span className="leader__level">{level}</span>
      <span className="leader__score">{score}</span>
    </li>
  </>
);

export default Leader;
