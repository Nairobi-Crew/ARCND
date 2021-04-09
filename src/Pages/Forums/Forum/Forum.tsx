import React from 'react';
import { ForumProps } from 'Pages/Forums/Forum/types';
import TopicList from 'Pages/Forums/TopicList/TopicList';
import Button from 'UI/Button/Button';
import './Forum.scss';
import { EAuthState } from 'Reducers/auth/types';
import { useAuthReselect } from 'Store/hooks';
import { data } from '../sampleData';

const Forum: React.FC<ForumProps> = ({ caption }) => {
  const auth = useAuthReselect();
  return (
    <div className="forum">
      <div className="forum_tools">
        <div className="forum_tools_item">
          {auth.state === EAuthState.LOGGED ? <Button>Новая тема</Button> : null}
        </div>
      </div>
      <div className="forum__header">{caption}</div>
      <TopicList topics={data} />
    </div>
  );
};

export default Forum;
