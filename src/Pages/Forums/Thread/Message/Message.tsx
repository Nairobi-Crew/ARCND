import React from 'react';
import { MessageProps } from 'Pages/Forums/Thread/Message/types';
import './Message.scss';
import dateFormat from 'Util/dateFormat';

const Message: MessageProps = ({ message }) => {
  const messageClickHandler = () => {
    console.log('Message clicked', message.id);
  };
  return (
    <div className="message" onClick={messageClickHandler}>
      <div className="message__header">
        <div className="message__header_author">
          {message.author}
        </div>
        <div className="message__header_time">
          {dateFormat(message.time)}
        </div>
      </div>
      <div className="message__body">
        <div className="message__body_header">
          {message.header}
        </div>
        <div className="message__body_text">
          {message.message}
        </div>
      </div>
    </div>
  );
};

export default Message;
