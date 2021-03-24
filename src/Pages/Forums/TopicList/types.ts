import { FC } from 'react';
import { Topics } from 'Pages/Forums/types';

export type OwnTopicListProps = {
  caption?: string
  topics : Topics
}

export type TopicListProps = FC<OwnTopicListProps>;
