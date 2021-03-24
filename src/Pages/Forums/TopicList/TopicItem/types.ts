import { FC } from 'react';
import { ITopicsItem } from 'Pages/Forums/types';

export type OwnTopicProps = {
  topic: ITopicsItem
};

export type TopicProps = FC<OwnTopicProps>;
