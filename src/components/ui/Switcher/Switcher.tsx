import React from 'react';
import { SwitchProps } from 'UI/Switcher/types';
import './Switcher.scss';

const Switcher: SwitchProps = ({
  firstValue, secondValue, name = '', onValueChanged, checked = false,
  classes = [],
}) => {
  const onInputHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.target) {
      const v = (e.target as HTMLInputElement).checked as boolean;
      if (onValueChanged) {
        onValueChanged(v);
      }
    }
  };
  return (
    <div className={`switch ${classes.join(' ')}`}>
      <span>{firstValue}</span>
      <label>
        <input
          className="switch__input"
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onInputHandler}
        />
        <span className="switch__switcher" />
      </label>
      <span>{secondValue}</span>
    </div>
  );
};

export default Switcher;
