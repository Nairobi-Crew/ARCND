import { FC } from 'react';

export type OwnLeaderProps = {
  avatar?: string;
  name?: string;
  score?: number;
  index?: string;
}

export type LeaderProps = FC<OwnLeaderProps>;
