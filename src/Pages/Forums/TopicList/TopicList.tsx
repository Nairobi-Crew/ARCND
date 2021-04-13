import React from 'react';
import { TopicListProps } from 'Pages/Forums/TopicList/types';
import TopicItem from 'Pages/Forums/TopicList/TopicItem/index';
import './TopicList.scss';

const TopicList: React.FC<TopicListProps> = ({ topics }) => (
  <>
    <div className="topic_list">
      <div className="topic_list_header">
        <div className="topic_list_header_description">Тема</div>
        <div className="topic_list_header_created">Автор</div>
        <div className="topic_list_header_time">Время создания</div>
        <div className="topic_list_header_count">Сообщений</div>
      </div>
      <div className="topic_list_message">Последнее сообщение</div>
    </div>
    {
      topics ? topics.map((topic, idx) => (
        <TopicItem topic={topic} key={topic.id} index={idx} />
      )) : null
    }
  </>
);

export default TopicList;
