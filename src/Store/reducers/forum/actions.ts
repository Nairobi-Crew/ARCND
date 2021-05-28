import { EForumState, IMessagesItem, ITopicsItem } from 'Reducers/forum/types';
import { API_PATH, FORUM_PATH } from 'Config/config';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { IAppState } from 'Store/types';

const FORUM_URL = `${API_PATH}${FORUM_PATH}`;
export const clearState = (): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EForumState.UNKNOWN });
};

export const fetchTopics = (): Promise<ITopicsItem[]> => new Promise((resolve, reject) => {
  fetch(`${FORUM_URL}/`, {
    method: 'GET',
    headers: {
      credentials: 'include',
    },
  }).then((topics) => {
    topics.json().then((items) => {
      resolve(items);
    }).catch((error) => {
      reject(error);
    });
  });
});

export const fetchTopicsAction = (): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  fetchTopics().then((items) => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: items } });
  }).catch(() => dispatch({ type: EForumState.UNKNOWN, payload: { topics: [] } }));
};

export const fetchMessages = (thread: number): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  fetch(`${FORUM_URL}/thread/${thread}`, {
    method: 'GET',
    credentials: 'include',
  }).then((rawMessages) => {
    rawMessages.json().then((result) => {
      const { messages, state } = result;
      if (state === 0) {
        dispatch({
          type: EForumState.WRONG_THREAD,
          payload: {
            messages: [],
            loaded: 0,
          },
        });
      } else {
        dispatch({
          type: EForumState.FETCHED_MESSAGES,
          payload: {
            messages,
            loaded: thread,
          },
        });
      }
    }).catch((error) => {
      dispatch({ type: EForumState.UNKNOWN });
      // eslint-disable-next-line no-console
      console.log('Error parsing answer', error);
    });
  }).catch((error) => {
    dispatch({ type: EForumState.UNKNOWN });
    // eslint-disable-next-line no-console
    console.log('Error fetch messages', error);
  });
};

export const saveMessage = (
  _id: number,
  message: string,
  parentMessage: number,
  topic: number,
  header: string,
  emoji = 5,
): ThunkAction<void, IAppState, unknown, Action<string>> => (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  fetch(`${FORUM_URL}/thread/${_id}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      parentMessage,
      topic,
      header,
      emoji,
    }),
  }).then((response) => {
    response.json().then((parsedMessage) => {
      const msg: IMessagesItem = {
        id: parsedMessage.id,
        message,
        parentMessage,
        authorId: parsedMessage.authorId,
        author: parsedMessage.author,
        time: parsedMessage.time,
        topic,
        header,
        emoji,
      };
      if (_id === 0) {
        dispatch({
          type: EForumState.NEW_MESSAGE,
          payload: msg,
        });
      } else {
        dispatch({
          type: EForumState.SAVE_MESSAGE,
          payload: msg,
        });
      }
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log('Error parse answer', error);
    });
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log('Error get answer from server', error);
  });
};

export const addTopic = (description: string): ThunkAction<void, IAppState, unknown, Action<string>> => async (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  fetch(`${FORUM_URL}/`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: description,
    }),
  })
    .then((rawTopic) => {
      rawTopic.json()
        .then((topic) => {
          dispatch({ type: EForumState.NEW_TOPIC, payload: { topic } });
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.log('Error', error));
    })
    .catch(() => {
      dispatch({ type: EForumState.UNKNOWN });
    });
};
