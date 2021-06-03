import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Message from 'Pages/Forums/Thread/Message/index';
import Button from 'UI/Button/index';
import './Thread.scss';
import { useForumMessages, useForumTopics } from 'Store/hooks';
import { fetchMessages, fetchTopicsAction } from 'Reducers/forum/actions';
import { useDispatch } from 'react-redux';
import EditMessage from 'Pages/Forums/Thread/EditMessage/index';
import { EForumState, IMessagesItem } from 'Reducers/forum/types';

const Thread: React.FC = () => {
  const threadId = parseInt(useParams<{ threadId: string }>().threadId, 10);
  const [messagesList, setMessagesList] = useState<IMessagesItem[]>([]);
  const history = useHistory();
  const messages = useForumMessages();
  const topics = useForumTopics();
  const dispatch = useDispatch();
  const [topicDescription, setTopicDescription] = useState('');

  const setDescription = () => {
    const found = topics.topics.find((item) => item.id.toString() === threadId.toString());
    setTopicDescription(found ? found.description : '');
  };

  useEffect(() => {
    dispatch(fetchMessages(threadId));
    if (!topics.topics || topics.topics.length === 0) {
      dispatch(fetchTopicsAction());
    }
    setDescription();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (topics.state === EForumState.FETCHED_TOPICS) {
      setDescription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics]);

  useEffect(() => {
    if (messages.state === EForumState.WRONG_THREAD) {
      history.push('/forum');
    } else if (messages.state === EForumState.FETCHED_MESSAGES) {
      setMessagesList(messages.messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  return (
    <div className="thread" key={`${threadId}-${Date.now()}`}>
      <div className="thread_title">
        <div className="align-left">
          <Button onClick={() => history.push('/forum')}>На форумы</Button>
        </div>
        <div className="align-right">
          <Button onClick={() => history.push('/')}>На главную</Button>
        </div>
        { topicDescription }
      </div>
      <div className="thread_header">
        <div className="thread_header_description">Заголовок</div>
        <div className="thread_header_author">Автор</div>
        <div className="thread_header_time">Время</div>
      </div>
      <div className="thread_body">
        {
          messagesList
            .filter((item: IMessagesItem) => (item.parentMessage as number) === 0)
            .map(
              (message: IMessagesItem) => (
                <div key={message.id}>
                  <Message message={message} key={`messageKey-${message.id}`} />
                  <div className="parent_messages">
                    {messagesList.filter(
                      (parentMessage: IMessagesItem) => (parentMessage.parentMessage || '-1') === message.id,
                    )
                      .map(
                        (identMessage: IMessagesItem) => (
                          <Message message={identMessage} key={`parentMessageKey-${identMessage.id}`} />
                        ),
                      )}
                  </div>
                </div>
              ),
            )
        }
      </div>
      <EditMessage parentMessage={0} topicId={threadId} messageId={0} key={`editMessageKey-${threadId}`} />
    </div>
  );
};

export default Thread;
