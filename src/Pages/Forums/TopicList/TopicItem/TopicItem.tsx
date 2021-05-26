import React from 'react';
import { Link } from 'react-router-dom';
import { TopicProps } from 'Pages/Forums/TopicList/TopicItem/types';
import dateFormat from 'Util/dateFormat';
import './TopicItem.scss';

const TopicItem: TopicProps = ({ topic }) => {
  const topicLink = `/thread/${topic.id}`;
  return (
    <div className="topic__item">
      <div className="topic__item_header">
        <div className="topic__item_header_description"><Link to={topicLink}>{topic.description}</Link></div>
        <div className="topic__item_header_created"><Link to={topicLink}>{topic.author}</Link></div>
        <div className="topic__item_header_time"><Link to={topicLink}>{dateFormat(topic.createTime)}</Link></div>
        <div className="topic__item_header_count"><Link to={topicLink}>{topic.messageCount}</Link></div>
      </div>
      <div className="topic__item_message">
        <Link to={topicLink}>
          {dateFormat(topic.lastDate as number)}
          {' '}
          <b>
            {topic.lastAuthor}
          </b>
          {' '}
          написал:
          {' '}
          <i>
            {topic.lastTitle}
            ,
            {' '}
            {topic.lastMessage}
          </i>
        </Link>
      </div>
    </div>
  );
};

export default TopicItem;
