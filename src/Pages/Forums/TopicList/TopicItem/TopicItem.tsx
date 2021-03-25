import React from 'react';
import { useHistory } from 'react-router-dom';
import { TopicProps } from 'Pages/Forums/TopicList/TopicItem/types';
import dateFormat from 'Util/dateFormat';
import './TopicItem.scss';
import odd from 'Util/odd';

const TopicItem: TopicProps = ({ topic, index }) => {
  const history = useHistory();
  const classes = ['topic__item', odd(index) ? 'half_opacity' : ''];
  const topicClickHandler = () => {
    history.push(`/thread/${topic.id}`);
  };
  return (
    <div className={classes.join(' ')} onClick={topicClickHandler}>
      <div className="topic__item_header">
        <div className="topic__item_header_description">{topic.description}</div>
        <div className="topic__item_header_created">{topic.author}</div>
        <div className="topic__item_header_time">{dateFormat(topic.createTime)}</div>
        <div className="topic__item_header_count">{topic.messageCount}</div>
      </div>
      <div className="topic__item_message">{topic.lastMessage}</div>
    </div>
  );
};

export default TopicItem;
