import { FC, InputHTMLAttributes } from 'react';


export type OwnLayoutProps = {
  children?: FC | InputHTMLAttributes<HTMLInputElement>
};

export type LayoutProps = FC<OwnLayoutProps>;
