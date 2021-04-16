import { Messages, Topics } from 'Reducers/forum/types';

export const WAIT_FOR_TEST = 1;

export const data: Topics = [
  {
    id: '1',
    description: 'First topic',
    messageCount: 20,
    author: 'Oleg',
    authorId: 1,
    lastMessage: 'Test last message',
    lastMessageTime: 9000000,
    createTime: 8000000,
    lastMessageUser: 'Nikolay Sidorov',
    lastMessageUserId: 2,
  },
  {
    id: '2',
    description: 'Second topic',
    messageCount: 20,
    author: 'Alexandr Stepanov',
    authorId: 3,
    lastMessage: 'Test last message on topic 2',
    lastMessageTime: 10000000,
    createTime: 8500000,
    lastMessageUser: 'Nikolay Sidorov',
    lastMessageUserId: 2,
  },
];

export const messages: Messages = [
  {
    id: '1',
    topic: '1',
    message: 'Sample message for topic 1',
    author: 'Oleg',
    authorId: 1,
    header: 'header -> Whats up',
    parentMessage: '',
    time: 9000000,
  },
  {
    id: '2',
    topic: '1',
    message: 'Sample message for topic 1',
    author: 'Oleg',
    authorId: 1,
    header: 'header -> Whats up',
    parentMessage: '',
    time: 9000000,
  },
  {
    id: '3',
    topic: '1',
    message: 'Sample message for topic 1',
    author: 'Oleg',
    authorId: 1,
    header: 'header -> Whats up',
    parentMessage: '',
    time: 9000000,
  },
  {
    id: '4',
    topic: '1',
    message: 'Sample message for topic 1',
    author: 'Oleg',
    authorId: 1,
    header: 'header -> Whats up',
    parentMessage: '',
    time: 9000000,
  },
];

export const getData = (): Topics => {
  const m: string | null = localStorage.getItem('topics');
  let msgs: Topics;
  if (m === null) {
    msgs = data;
    localStorage.setItem('topics', JSON.stringify(msgs));
  } else {
    msgs = JSON.parse(m);
  }
  return msgs;
};

export const getMessages = (): Messages => {
  const m: string | null = localStorage.getItem('messages');
  let msgs: Messages;
  if (m === null) {
    msgs = messages;
    localStorage.setItem('messages', JSON.stringify(msgs));
  } else {
    msgs = JSON.parse(m);
  }
  return msgs;
};

export const saveData = (d: Topics): void => {
  localStorage.setItem('topics', JSON.stringify(d));
};

export const saveMessages = (m: Messages): void => {
  localStorage.setItem('messages', JSON.stringify(m));
};

export const saveForums = (d: Topics, m: Messages) => {
  saveData(d);
  saveMessages(m);
};
