import { memo } from 'react';
import TopicItem from 'Pages/Forums/TopicList/TopicItem/TopicItem';
import { OwnTopicProps } from 'Pages/Forums/TopicList/TopicItem/types';

export default memo<OwnTopicProps>(TopicItem);
