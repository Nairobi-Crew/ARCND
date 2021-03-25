import { FC } from 'react';
import { ITopicsItem } from 'Pages/Forums/types';

export type OwnTopicProps = {
  topic: ITopicsItem
  index?: number
};

export type TopicProps = FC<OwnTopicProps>;
