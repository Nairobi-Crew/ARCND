import { FC, InputHTMLAttributes } from 'react';

export type TOnValueChange = (value: string) => void;

export type OwnInputProps = {
  id: string
  label?: string
  type?: string
  labelClasses?: string[]
  inputClasses?: string[]
  onValueChanged?: TOnValueChange
} & InputHTMLAttributes<HTMLInputElement>;

export type InputProps = FC<OwnInputProps>;
