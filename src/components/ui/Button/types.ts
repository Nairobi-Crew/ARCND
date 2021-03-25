import { ButtonHTMLAttributes, FC } from 'react';

export type OwnButtonProps = {
  buttonType?: 'round' | 'rect'
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = FC<OwnButtonProps>;
