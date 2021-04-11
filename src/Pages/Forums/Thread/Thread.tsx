import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Message from 'Pages/Forums/Thread/Message/Message';
import Button from 'UI/Button/Button';
import './Thread.scss';
import { useForumMessages, useForumTopics } from 'Store/hooks';
import { fetchMessages } from 'Reducers/forum/actions';
import { useDispatch } from 'react-redux';
import EditMessage from 'Pages/Forums/Thread/EditMessage/index';

const Thread: React.FC = () => {
  const { threadId } = useParams<{ threadId: string }>();
  const [messagesList, setMessagesList] = useState([]);
  const history = useHistory();
  const messages = useForumMessages();
  const topics = useForumTopics();
  const dispatch = useDispatch();

  useEffect(() => {
    if (messages.messagesLoaded === threadId) {
      setMessagesList(messages.messages);
    } else {
      dispatch(fetchMessages(threadId));
    }
  }, []);

  useEffect(() => {
    if (messages.messagesLoaded === threadId) {
      setMessagesList(messages.messages);
    }
  }, [messages]);

  return (
    <div className="thread">
      <div className="thread_title">
        <div>
          <Button onClick={() => history.goBack()}>На форумы</Button>
        </div>
        { topics.topics ? topics.topics.find((x) => x.id === threadId)?.description : null}
      </div>
      <div className="thread_header">
        <div className="thread_header_description">Заголовок</div>
        <div className="thread_header_author">Автор</div>
        <div className="thread_header_time">Время</div>
      </div>
      <div className="thread_body">
        {
          messagesList.map(
            (message, index) => <Message key={message.id} message={message} index={index} />,
          )
        }
      </div>
      <EditMessage parentMessage="" topicId={threadId} messageId="" />
    </div>
  );
};

export default Thread;
