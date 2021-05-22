import { FC, InputHTMLAttributes } from 'react';

export type TonValueChanged = (value: boolean) => void;

export type OwnSwitchProps = {
  name?: string
  value?: boolean
  firstValue? : string
  secondValue?: string
  onValueChanged?:TonValueChanged
} & InputHTMLAttributes<HTMLInputElement>;

export type SwitchProps = FC<OwnSwitchProps>;
