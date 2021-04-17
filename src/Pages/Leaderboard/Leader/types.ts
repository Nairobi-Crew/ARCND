import { FC } from 'react';

export type OwnLeaderProps = {
  avatar?: string;
  name?: string;
  score?: number;
  index?: number;
}

export type LeaderProps = FC<OwnLeaderProps>;
