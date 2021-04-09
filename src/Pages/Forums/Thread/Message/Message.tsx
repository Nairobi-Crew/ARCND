import React from 'react';
import { MessageProps } from 'Pages/Forums/Thread/Message/types';
import './Message.scss';
import dateFormat from 'Util/dateFormat';
import odd from 'Util/odd';
import Button from 'UI/Button/Button';
import { EAuthState } from 'Reducers/auth/types';
import { useAuthReselect } from 'Store/hooks';

const Message: React.FC<MessageProps> = ({ message, index }) => {
  const classes: string[] = ['message', odd(index) ? 'half_opacity' : ''];
  const auth = useAuthReselect();
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
          {auth.state === EAuthState.LOGGED ? <Button>Ответить</Button> : null}
        </div>
      </div>

      <div className="message__body">
        {message.message}
      </div>
    </div>
  );
};

export default Message;
