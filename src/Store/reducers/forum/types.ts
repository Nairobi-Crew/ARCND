export interface ITopicsItem {
  id: string
  description: string
  authorId: number
  author: string
  createTime: number
  lastMessageTime: number
  lastMessage: string
  lastMessageUserId: number
  lastMessageUser: string
  messageCount: number
}

export type Topics = ITopicsItem[];

export interface IMessagesItem {
  id: string
  authorId: number
  author: string
  header: string
  message: string
  time: number
  parentMessage: string
  topic: string
}

export type Messages = IMessagesItem[];

export interface IForumReducer {
  state: EForumState
  topics: Topics
  messages: Messages
  messagesLoaded: string
}

export enum EForumState {
  UNKNOWN = 'FORUM:UNKNOWN',
  FETCH_START = 'FORUM:FETCH_START',
  FETCHED_TOPICS = 'FORUM:FETCHED_TOPICS',
  FETCHED_MESSAGES = 'FORUM:FETCHED_MESSAGES',
}
