import React from "react";
import '../../common/styles/common.scss'

import './Input.scss'

interface IInputProps {
  type?: string;
  label?: string;
  errorMessage?: string;
  name?: string;
  value?: string;
}

export default function Input({type, label, errorMessage, name, value}:IInputProps) {
  return (
    <div className="input">
      <label className="input__label">
        <input type={type}
               className="input__input"
               name={name}
               value={value}
               placeholder={label}/>
          <span className="input__label-text">{label}</span>
      </label>
      <span className="input__error-message">{errorMessage}</span>
    </div>
  )
}
