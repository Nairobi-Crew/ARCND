import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ThreadProps } from 'Pages/Forums/Thread/types';
import Message from 'Pages/Forums/Thread/Message/Message';
import { data, messages as sampleMessages } from 'Pages/Forums/sampleData';
import Button from 'UI/Button/Button';
import './Thread.scss';

const Thread: ThreadProps = ({ messages }) => {
  const { threadId } = useParams<{ threadId: string }>();
  const [topics, setTopics] = useState(messages || []);
  const history = useHistory();
  useEffect(() => {
    const list = sampleMessages.filter((msg) => msg.topic === threadId);
    setTopics(list);
    console.log('onChange', list);
  }, [messages]);

  useEffect(() => {
    const list = (messages || sampleMessages).filter((msg) => msg.topic === threadId);
    setTopics(list);
    console.log('onStart', list);
  }, []);
  return (
    <div className="thread">
      <div className="thread_title">
        <div>
          <Button onClick={() => history.goBack()}>На форумы</Button>
        </div>
        {data.find((x) => x.id === threadId)?.description}
      </div>
      <div className="thread_header">
        <div className="thread_header_description">Заголовок</div>
        <div className="thread_header_author">Автор</div>
        <div className="thread_header_time">Время</div>
      </div>
      <div className="thread_body">
        {
          topics.map(
            (message, index) => <Message key={message.id} message={message} index={index} />,
          )
        }
      </div>
    </div>
  );
};

export default Thread;
