import { FC } from 'react';

export type OwnProfileProps = {
  caption?: string
  id? : number
}

export type ProfileProps = FC<OwnProfileProps>;
