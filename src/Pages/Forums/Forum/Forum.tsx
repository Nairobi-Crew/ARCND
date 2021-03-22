import React from 'react';
import { ForumProps } from 'Pages/Forums/Forum/types';
import TopicList from 'Pages/Forums/TopicList/TopicList';
import { data } from '../sampleData';
import './Forum.scss';

const Forum: ForumProps = ({ caption }) => (
  <div className="forum">
    <div className="forum__header">{caption}</div>
    <TopicList topics={data} />
  </div>
);

export default Forum;
