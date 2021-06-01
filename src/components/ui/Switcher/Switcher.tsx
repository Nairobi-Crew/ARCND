import React, { useEffect, useState } from 'react';
import { SwitchProps } from 'UI/Switcher/types';
import './Switcher.scss';

const Switcher: SwitchProps = ({
  firstValue, secondValue, name = '', onValueChanged, value = false,
  classes = [],
}) => {
  const [inputValue, setInputValue] = useState(value);
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const onInputHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.target) {
      const v = (e.target as HTMLInputElement).checked as boolean;
      setInputValue(v);
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
          checked={inputValue}
          onChange={onInputHandler}
        />
        <span className="switch__switcher" />
      </label>
      <span>{secondValue}</span>
    </div>
  );
};

export default Switcher;
