import React from 'react';
import { Link } from 'react-router-dom';
import { TopicProps } from 'Pages/Forums/TopicList/TopicItem/types';
import dateFormat from 'Util/dateFormat';
import './TopicItem.scss';

const TopicItem: TopicProps = ({ topic }) => {
  const topicLink = `/thread/${topic.id}`;
  const userLink = `/userinfo/${topic.authorId}`;
  return (
    <div className="topic__item">
      <div className="topic__item_header">
        <div className="topic__item_header_description"><Link to={topicLink}>{topic.description}</Link></div>
        <div className="topic__item_header_created"><Link to={userLink}>{topic.author}</Link></div>
        <div className="topic__item_header_time"><Link to={topicLink}>{dateFormat(topic.createTime)}</Link></div>
        <div className="topic__item_header_count"><Link to={topicLink}>{topic.messageCount}</Link></div>
      </div>
      <div className="topic__item_message">
        {
          topic.messageCount > 0
            ? (
              <>
                <Link to={topicLink}>
                  {dateFormat(topic.lastDate as number)}
                  {' '}
                </Link>
                <Link to={topic.lastAuthorId?.toString() || '0'}>
                  <b>
                    {topic.lastAuthor}
                  </b>
                </Link>
                {' '}
                написал:
                {' '}
                <Link to={topicLink}>
                  <i>
                    {topic.lastTitle}
                    ,
                    {' '}
                    {topic.lastMessage}
                  </i>
                </Link>
              </>
            )
            : null
        }
      </div>
    </div>
  );
};

export default TopicItem;
