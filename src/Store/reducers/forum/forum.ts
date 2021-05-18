/* eslint-disable no-case-declarations */
import {
  EForumState, IForumReducer, IMessagesItem, ITopicsItem,
} from 'Reducers/forum/types';

export const defaultForumReducer : IForumReducer = {
  state: EForumState.UNKNOWN,
  messages: [],
  topics: [],
  messagesLoaded: 0,
};

export type ForumAction = {
  type: string
  messages?: IMessagesItem[]
  topics?: ITopicsItem[]
  messagesLoaded?: string
  payload?: any
}

export function forumReducer(
  state: IForumReducer = defaultForumReducer,
  action: ForumAction,
): IForumReducer {
  let newState;
  let messages = [];
  switch (action.type) {
    case EForumState.UNKNOWN:
      newState = { ...state, state: action.type };
      break;
    case EForumState.FETCH_START:
      newState = { ...state, state: action.type };
      break;
    case EForumState.FETCHED_TOPICS:
      newState = {
        ...state,
        topics: action.payload.topics,
        state: action.type,
      };
      break;
    case EForumState.FETCHED_MESSAGES:
      newState = {
        ...state,
        messages: action.payload.messages,
        messagesLoaded: action.payload.loaded,
        state: action.type,
      };
      break;
    case EForumState.NEW_TOPIC:
      const { topics } = state;
      topics.push(action.payload.topic);
      newState = {
        ...state,
        state: EForumState.FETCHED_TOPICS,
        topics,
      };
      break;
    case EForumState.NEW_MESSAGE:
      messages = state.messages;
      messages.push(action.payload);
      newState = {
        ...state,
        messages,
        state: EForumState.FETCHED_MESSAGES,
      };
      break;
    case EForumState.SAVE_MESSAGE:
      messages = state.messages;
      const message = action.payload;
      const found = messages.find((msg) => msg.id === message.id);
      if (found) {
        found.topic = message.topic;
        found.header = message.header;
        found.message = message.message;
      }
      newState = {
        ...state,
        messages,
        state: EForumState.FETCHED_MESSAGES,
      };
      break;
    default:
      newState = state;
  }
  return newState;
}
