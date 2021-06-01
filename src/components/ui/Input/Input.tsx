import React, { useEffect, useState } from 'react';
import { InputProps } from 'UI/Input/types';
import './Input.scss';

const Input: InputProps = ({
  label, value, onValueChanged, errorMessage, ...restProps
}) => {
  const [inputValue, setInputValue] = useState<string>(value as string || '');
  useEffect(() => {
    if (value) {
      if ('type' in restProps) {
        const t = restProps.type;
        if (t === 'file') {
          return;
        }
      }
      setInputValue(value as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="input">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="input__label">
        <input
          className="input__input"
          value={inputValue}
          placeholder={label}
          onInput={onInputHandler}
          {...restProps}
        />
        <span className="input__label-text">{label}</span>
      </label>
      <span className="input__error-message">{errorMessage}</span>
    </div>
  );
};

export default Input;
