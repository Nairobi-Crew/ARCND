import React, { useEffect, useState } from 'react';
import { TextareaProps } from 'UI/Textarea/types';
import 'UI/Input/Input.scss';

const Textarea: TextareaProps = ({
  label, value, onValueChanged, errorMessage, ...restProps
}) => {
  const [inputValue, setInputValue] = useState<string>(value as string || '');
  useEffect(() => {
    setInputValue(value as string);
  }, [value]);
  const onInputHandler = (e: React.FormEvent<HTMLTextAreaElement>): void => {
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
        <textarea
          className={`input__input${errorMessage ? ` input__input_error`: '' }`}
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

export default Textarea;
