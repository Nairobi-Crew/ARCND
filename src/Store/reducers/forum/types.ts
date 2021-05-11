export interface TopicItem {
  id: number
  title: string
  date: Date
  user: number
}

export interface MessageItem {
  id: number
  parent: number
  topic: number
  user: number
  date: Date
  message: string
  title: string
}

export interface ITopicsItem {
  id: number
  description: string
  authorId: number
  author: string
  createTime: number
  lastMessageTime: number | undefined
  lastMessage: string | undefined
  lastMessageUserId: number | undefined
  lastMessageUser: string | undefined
  messageCount: number
}

export type Topics = ITopicsItem[];

export interface IMessagesItem {
  id: number
  authorId: number
  author: string
  header: string
  message: string
  time: number
  parentMessage: number
  topic: number
}

export type Messages = IMessagesItem[];

export interface IForumReducer {
  state: EForumState
  topics: Topics
  messages: Messages
  messagesLoaded: number
}

export enum EForumState {
  UNKNOWN = 'FORUM:UNKNOWN',
  FETCH_START = 'FORUM:FETCH_START',
  FETCHED_TOPICS = 'FORUM:FETCHED_TOPICS',
  FETCHED_MESSAGES = 'FORUM:FETCHED_MESSAGES',
  NEW_TOPIC = 'FORM:NEW_TOPIC',
}
