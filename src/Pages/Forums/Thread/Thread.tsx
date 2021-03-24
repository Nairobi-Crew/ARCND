import React from 'react';
import { ThreadProps } from 'Pages/Forums/Thread/types';
import Message from 'Pages/Forums/Thread/Message/Message';

const Thread: ThreadProps = ({ messages }) => (
  <>
    {
        messages.map((message) => <Message key={message.id} message={message} />)
      }
  </>
);

export default Thread;
