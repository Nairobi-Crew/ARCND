/* eslint-disable no-shadow */

export interface ITopicsItem {
  id: number
  description: string
  authorId: number
  author: string
  createTime: number
  messageCount: number
  lastMessage?: string
  lastTitle?: string
  lastAuthor?: string
  lastAuthorId?: number
  lastDate?: number
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
  emoji: number
}

export type Messages = IMessagesItem[];

export interface IForumReducer {
  state: EForumState
  topics: Topics
  messages: Messages
  messagesLoaded: number
}

export interface ITopicInfo {
  id: number
  title: string
  count: number
}

export enum EForumState {
  UNKNOWN = 'FORUM:UNKNOWN',
  FETCH_START = 'FORUM:FETCH_START',
  FETCHED_TOPICS = 'FORUM:FETCHED_TOPICS',
  FETCHED_MESSAGES = 'FORUM:FETCHED_MESSAGES',
  NEW_TOPIC = 'FORUM:NEW_TOPIC',
  NEW_MESSAGE = 'FORUM:NEW_MESSAGE',
  SAVE_MESSAGE = 'FORUM:SAVE_MESSAGE',
  WRONG_THREAD = 'FORUM:WRONG_THREAD',
}
