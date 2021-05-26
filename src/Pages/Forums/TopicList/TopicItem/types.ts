import { FC } from 'react';
import { ITopicsItem } from 'Reducers/forum/types';

export type OwnTopicProps = {
  topic: ITopicsItem
  index?: number
};

export type TopicProps = FC<OwnTopicProps>;
