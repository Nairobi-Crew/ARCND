import { ButtonHTMLAttributes, FC } from 'react';

export type OwnButtonProps = {
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = FC<OwnButtonProps>;
