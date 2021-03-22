import React from 'react';
import { TopicListProps } from 'Pages/Forums/TopicList/types';
import TopicItem from 'Pages/Forums/TopicList/TopicItem/TopicItem';

const TopicList: TopicListProps = ({ topics }) => (
  <div className="forum__topics">
    {
        topics.map((topic) => (
          <TopicItem topic={topic} key={topic.id} />
        ))
      }
  </div>
);

export default TopicList;
