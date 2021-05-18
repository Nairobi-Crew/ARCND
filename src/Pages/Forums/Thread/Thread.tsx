import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Message from 'Pages/Forums/Thread/Message/index';
import Button from 'UI/Button/index';
import './Thread.scss';
import { useForumMessages, useForumTopics } from 'Store/hooks';
import { fetchMessages } from 'Reducers/forum/actions';
import { useDispatch } from 'react-redux';
import EditMessage from 'Pages/Forums/Thread/EditMessage/index';
import { IMessagesItem } from 'Reducers/forum/types';

const Thread: React.FC = () => {
  const threadId = parseInt(useParams<{ threadId: string }>().threadId, 10);
  // console.log('Thread ID', threadId);
  const [messagesList, setMessagesList] = useState<IMessagesItem[]>([]);
  const history = useHistory();
  const messages = useForumMessages();
  const topics = useForumTopics();
  const dispatch = useDispatch();
  const [topicDescription, setTopicDescription] = useState('');

  useEffect(() => {
    if (messages.messagesLoaded === threadId) {
      setMessagesList(messages.messages);
    } else {
      dispatch(fetchMessages(threadId));
    }
    const found = topics.topics.find((item) => item.id === threadId);
    if (found) {
      setTopicDescription(found.description);
    } else {
      setTopicDescription('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (messages.messagesLoaded === threadId) {
      setMessagesList(messages.messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);
  return (
    <div className="thread" key={`${threadId}-${Date.now()}`}>
      <div className="thread_title">
        <div>
          <Button onClick={() => history.goBack()}>На форумы</Button>
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
