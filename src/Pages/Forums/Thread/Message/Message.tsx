import React, { useState } from 'react';
import { MessageProps } from 'Pages/Forums/Thread/Message/types';
import './Message.scss';
import dateFormat from 'Util/dateFormat';
import Button from 'UI/Button/index';
import { EAuthState } from 'Reducers/auth/types';
import { useAuthReselect } from 'Store/hooks';
import EditMessage from 'Pages/Forums/Thread/EditMessage/index';

const Message: React.FC<MessageProps> = ({ message }) => {
  const auth = useAuthReselect();
  const [formReplyVisible, setFormReplyVisible] = useState(false);
  const onSaveHandler = () => {
    setFormReplyVisible(false);
  };

  return (
    <div className="message">
      <div className="message__header">
        <div className="message__header_description">
          {message.header}
        </div>
        <div className="message__header_author">
          {message.author}
        </div>
        <div className="message__header_time">
          {dateFormat(message.time)}
        </div>
      </div>
      <div className="message_tools">
        <div className="message_tools_item">
          {auth.state === EAuthState.LOGGED && message.parentMessage === 0
            ? (
              <>
                <Button onClick={() => setFormReplyVisible((prevState) => !prevState)}>{formReplyVisible ? 'Отменить' : 'Ответить' }</Button>
                <EditMessage parentMessage={message.id} topicId={message.topic} messageId={0} visible={formReplyVisible} onSave={onSaveHandler} />
              </>
            )
            : null}
        </div>
      </div>

      <div className="message__body">
        {message.message}
      </div>
    </div>
  );
};

export default Message;
