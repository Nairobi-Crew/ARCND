import { EForumState, IForumReducer } from 'Reducers/forum/types';

export const defaultForumReducer : IForumReducer = {
  state: EForumState.UNKNOWN,
  messages: [],
  topics: [],
  messagesLoaded: '',
};

export function forumReducer(
  state: IForumReducer = defaultForumReducer,
  action,
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
    default:
      newState = state;
  }
  return newState;
}
