import React, { useState } from 'react';
import { MessageProps } from 'Pages/Forums/Thread/Message/types';
import './Message.scss';
import dateFormat from 'Util/dateFormat';
import odd from 'Util/odd';
import Button from 'UI/Button/Button';
import { EAuthState } from 'Reducers/auth/types';
import { useAuthReselect } from 'Store/hooks';
import EditMessage from 'Pages/Forums/Thread/EditMessage/EditMessage';

const Message: React.FC<MessageProps> = ({ message, index }) => {
  const classes: string[] = ['message', odd(index) ? 'half_opacity' : ''];
  const auth = useAuthReselect();
  const [formReplyVisible, setFormReplyVisible] = useState(false);
  return (
    <div className={classes.join(' ')}>
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
          {auth.state === EAuthState.LOGGED
            ? (
              <>
                <Button onClick={() => setFormReplyVisible((prevState) => !prevState)}>{formReplyVisible ? 'Отменить' : 'Ответить' }</Button>
                <EditMessage parentMessage={message.id} topicId={message.topic} messageId="" visible={formReplyVisible} />
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
