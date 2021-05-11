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
      // eslint-disable-next-line no-case-declarations
      const { topics } = state;
      topics.push(action.payload.topic);
      newState = {
        ...state,
        state: EForumState.FETCHED_TOPICS,
        topics,
      };
      break;
    default:
      newState = state;
  }
  return newState;
}
