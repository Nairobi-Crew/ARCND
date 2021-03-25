import React from 'react';
import { ButtonProps } from 'UI/Button/types';
import './Button.scss';
import arrayRemoveDuplicates from 'Util/arrayRemoveDuplicates';

const Button: ButtonProps = ({
  children, className, buttonType, ...restProps
}) => {
  const classNameParam: string[] = className ? className.toString().split(' ') : [];
  const classes: string[] = ['button', ...classNameParam];
  if (buttonType && buttonType === 'rect') {
    classes.push('button_type_rect');
  } else if (!classes.includes('button_type_rounded')) {
    classes.push('button_type_rounded');
  }
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={arrayRemoveDuplicates(classes).join(' ')} {...restProps}>{children}</button>
  );
};

export default Button;
