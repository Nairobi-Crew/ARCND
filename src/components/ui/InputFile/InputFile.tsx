import React from 'react';
import { InputFileProps } from 'UI/InputFile/types';
import './InputFile.scss';

const InputFile: InputFileProps = ({
  label, errorMessage, onChange,
}) => (
  <div className="input">
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label className="input__label">
      <input
        className="input__input"
        type="file"
        accept="images/png"
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
      />
      <span className="input__label-text">{label}</span>
    </label>
    <span className="input__error-message">{errorMessage}</span>
  </div>
);

export default InputFile;
