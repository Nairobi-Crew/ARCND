import {Messages, Topics} from 'Pages/Forums/types';

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
    header: 'Whats up',
    parentMessage: 0,
    time: 9000000,
  },
];
