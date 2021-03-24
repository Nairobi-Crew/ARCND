import { FC, InputHTMLAttributes } from 'react';

export type TOnValueChange = (value: string) => void;

export type OwnInputProps = {
  label?: string
  onValueChanged?: TOnValueChange
  errorMessage?: string
} & InputHTMLAttributes<HTMLInputElement>;

export type InputProps = FC<OwnInputProps>;
