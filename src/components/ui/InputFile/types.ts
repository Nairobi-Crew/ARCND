import { ChangeEvent, FC, InputHTMLAttributes } from 'react';

export type TOnValueChange = (value: string) => void;

export type OwnInputFileProps = {
  label?: string
  errorMessage?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
} & InputHTMLAttributes<HTMLInputElement>;

export type InputFileProps = FC<OwnInputFileProps>;
