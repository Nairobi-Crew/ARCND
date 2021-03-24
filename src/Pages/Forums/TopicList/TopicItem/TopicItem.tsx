import React from 'react';
import { TopicProps } from 'Pages/Forums/TopicList/TopicItem/types';
import dateFormat from 'Util/dateFormat';
import './TopicItem.scss';

const TopicItem: TopicProps = ({ topic }) => {
  const topicClickHandler = () => {
    console.log('Go to topic', topic.id);
  };
  return (
    <div className="forum__topics_topic">
      <div className="forum__topics_topic_header" onClick={topicClickHandler}>
        <div className="forum__topics_topic_header_description">{topic.description}</div>
        <div className="forum__topics_topic_header_author">
          Created by:
          {topic.author}
        </div>
        <div className="forum__topics_topic_header_time">
          Created time:
          {dateFormat(topic.createTime, 'HH:MM:SS dd-mm-yy')}
        </div>
        <div className="forum__topics_topic_header_count">{topic.messageCount}</div>
      </div>
      <div className="forum__topics_topic_message" onClick={topicClickHandler}>{topic.lastMessage}</div>
    </div>
  );
};

export default TopicItem;
