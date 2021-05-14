import React, { useEffect } from 'react';
import { ForumProps } from 'Pages/Forums/Forum/types';
import TopicList from 'Pages/Forums/TopicList/index';
import Button from 'UI/Button/index';
import './Forum.scss';
import { EAuthState } from 'Reducers/auth/types';
import { useAuthReselect, useForumTopics } from 'Store/hooks';
import { useDispatch } from 'react-redux';
import { getUserData } from 'Reducers/auth/actions';
import { useHistory } from 'react-router-dom';
import { clearState, fetchTopicsAction } from 'Reducers/forum/actions';

const Forum: React.FC<ForumProps> = ({ caption }) => {
  const auth = useAuthReselect();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useForumTopics();
  useEffect(() => {
    dispatch(getUserData());
    dispatch(fetchTopicsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newTopicHandler = () => {
    dispatch(clearState());
    history.push('/newtopic');
  };

  return (
    <div className="forum">
      <div className="forum_tools">
        <div className="forum_tools_item">
          <div className="buttons">
            <div className="align-left">
              {
                auth.state === EAuthState.LOGGED
                  ? <Button onClick={newTopicHandler}>Новая тема</Button>
                  : null
              }
            </div>
            <div className="align-right">
              <Button onClick={() => history.push('/')}>На главную</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="forum__header">{caption}</div>
      <TopicList topics={data.topics} />
    </div>
  );
};

export default Forum;
