import { FC, FormHTMLAttributes } from 'react';

export type TOnSubmit = () => void;

export type OwnFormProps = {
  onSubmit?: TOnSubmit
  classList?: string[]
  caption?: string
  visible?: boolean
  header?: boolean
  maxHeight?: boolean
} & FormHTMLAttributes<HTMLFormElement>;

export type FormProps = FC<OwnFormProps>;
