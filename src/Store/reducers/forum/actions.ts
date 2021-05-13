import { EForumState, IMessagesItem, ITopicsItem } from 'Reducers/forum/types';
import { Dispatch } from 'react';
import { ForumAction } from 'Reducers/forum/forum';
import { API_PATH, FORUM_PATH } from 'Config/config';

const FORUM_URL = `${API_PATH}${FORUM_PATH}`;
export const clearState = () => (dispatch: Dispatch<ForumAction>) => {
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

export const fetchTopicsAction = () => async (dispatch: Dispatch<ForumAction>) => {
  dispatch({ type: EForumState.FETCH_START });
  fetchTopics().then((items) => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: items } });
  }).catch(() => dispatch({ type: EForumState.UNKNOWN }));
};

export const fetchMessages = (thread: number) => async (dispatch: Dispatch<ForumAction>) => {
  dispatch({ type: EForumState.FETCH_START });
  fetch(`${FORUM_URL}/thread/${thread}`, {
    method: 'GET',
    credentials: 'include',
  }).then((rawMessages) => {
    rawMessages.json().then((messages) => {
      dispatch({
        type: EForumState.FETCHED_MESSAGES,
        payload: {
          messages,
          loaded: thread,
        },
      });
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
) => (dispatch: Dispatch<ForumAction>) => {
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

export const addTopic = (description: string) => async (dispatch: Dispatch<ForumAction>) => {
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
