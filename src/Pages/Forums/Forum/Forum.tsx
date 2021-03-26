import React from 'react';
import { ForumProps } from 'Pages/Forums/Forum/types';
import TopicList from 'Pages/Forums/TopicList/TopicList';
import Button from 'UI/Button/Button';
import { data } from '../sampleData';
import './Forum.scss';

const Forum: React.FC<ForumProps> = ({ caption }) => (
  <div className="forum">
    <div className="forum_tools">
      <div className="forum_tools_item">
        <Button>Новая тема</Button>
      </div>
    </div>
    <div className="forum__header">{caption}</div>
    <TopicList topics={data} />
  </div>
);

export default Forum;
