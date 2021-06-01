import { FC, InputHTMLAttributes } from 'react';

export type TOnValueChange = (value: string) => void;

export type OwnTextareaProps = {
  label?: string
  onValueChanged?: TOnValueChange
  errorMessage?: string
} & InputHTMLAttributes<HTMLTextAreaElement>;

export type TextareaProps = FC<OwnTextareaProps>;
