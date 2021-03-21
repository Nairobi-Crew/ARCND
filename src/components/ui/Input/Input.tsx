import React, { useEffect, useState } from 'react';
import { InputProps } from 'UI/Input/types';
import './Input.scss';

const Input: InputProps = ({
  id, label, type, value, labelClasses, inputClasses, onValueChanged,
}) => {
  const [inputValue, setInputValue] = useState(value || '');
  useEffect(() => {
    setInputValue(value);
  }, [value]);
  const onInputHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    if (e.target) {
      const v = (e.target as HTMLInputElement).value;
      setInputValue(v);
      if (onValueChanged) {
        onValueChanged(v);
      }
    }
  };

  return (
    <div>
      <label htmlFor={id} className={labelClasses ? labelClasses.join(' ') : ''}>{label}</label>
      <input type={type} value={inputValue} onChange={onInputHandler} className={inputClasses ? inputClasses.join(' ') : ''} />
    </div>
  );
};

export default Input;
