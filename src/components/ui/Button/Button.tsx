import React from 'react';
import { ButtonProps } from 'UI/Button/types';
import './Button.scss';

const Button: ButtonProps = ({ children, ...restProps }) => {
  const className = '.button';
  return (
    <button type="button" className={className} {...restProps}>{children}</button>
  );
};

export default Button;
