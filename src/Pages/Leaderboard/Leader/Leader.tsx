import React, { useEffect, useState } from 'react';
import Form from 'UI/Form/Form';
import Input from 'UI/Input/Input';
import Button from 'UI/Button/Button';
import { LeaderProps } from './types';
import './Leader.scss';

const Leader: LeaderProps = ({
  name, avatar, score, index,
}) => (
  <>
    <li className="leader">
      <span className="leader__index">{index}</span>
      <img src={avatar} alt={name} className="leader__avatar" />
      <h3 className="leader__name">{name}</h3>
      <span className="leader__score">{score}</span>
    </li>
  </>
);

export default Leader;
