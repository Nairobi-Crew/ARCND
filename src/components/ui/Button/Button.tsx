import React from 'react';
import { ButtonProps } from 'UI/Button/types';
import './Button.scss';

const Button: ButtonProps = ({ children, ...restProps }) => (
  // eslint-disable-next-line react/button-has-type
  <button className="button" {...restProps}>{children}</button>
);

export default Button;
