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
  parentMessage: number
  topic: string
}

export type Messages = IMessagesItem[];
