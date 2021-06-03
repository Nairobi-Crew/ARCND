import { FC, InputHTMLAttributes } from 'react';

export type TonValueChanged = (value: boolean) => void;

export type OwnSwitchProps = {
  name?: string
  checked?: boolean
  firstValue? : string
  secondValue?: string
  classes?: string[]
  onValueChanged?:TonValueChanged
} & InputHTMLAttributes<HTMLInputElement>;

export type SwitchProps = FC<OwnSwitchProps>;
