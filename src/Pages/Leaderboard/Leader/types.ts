import { FC } from 'react';

export type OwnLeaderProps = {
  avatar?: string;
  name?: string;
  score?: string;
  index?: string;
}

export type LeaderProps = FC<OwnLeaderProps>;
