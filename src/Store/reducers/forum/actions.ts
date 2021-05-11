import { EForumState, IMessagesItem, ITopicsItem } from 'Reducers/forum/types';
import {
  getData, getMessages, saveData, saveMessages, WAIT_FOR_TEST,
} from 'Reducers/forum/sampleData';
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
    rawMessages.json().then((messages: IMessagesItem[]) => {
      dispatch({
        type: EForumState.FETCHED_MESSAGES,
        payload: {
          messages,
          loaded: thread,
        },
      });
    }).catch((error) => {
      dispatch({ type: EForumState.UNKNOWN });
      console.log('Error parsing answer', error);
    });
  }).catch((error) => {
    dispatch({ type: EForumState.UNKNOWN });
    console.log('Error fetch messages', error);
  });
};

export const saveMessage = (
  _id: number,
  _time: number,
  text: string,
  parent: number,
  authorId: number,
  author: string,
  topic: number,
  header: string,
) => (dispatch: Dispatch<ForumAction>) => {
  dispatch({ type: EForumState.FETCH_START });
  let id = _id;
  let time = _time;
  if (id === 0) {
    id = 0;
    time = Date.now();
  }
  const msg: IMessagesItem = {
    id,
    message: text,
    parentMessage: parent,
    authorId,
    author,
    time,
    topic,
    header,
  };

  const m = getMessages();
  if (_id === 0) {
    m.push(msg);
    const d = getData();
    const foundTopic = d.find((item) => item.id === topic);
    if (foundTopic) {
      foundTopic.lastMessage = text;
      foundTopic.lastMessageTime = time;
      foundTopic.lastMessageUser = author;
      foundTopic.lastMessageUserId = authorId;
      foundTopic.messageCount = m.filter((item) => item.topic === topic).length;
      saveData(d);
    }
  } else {
    const founded = m.find((item) => item.id === _id);
    if (founded) {
      Object.assign(founded, msg);
    }
  }

  saveMessages(m);
  setTimeout(() => {
    const filteredMessages = getMessages().filter((item) => item.topic === topic);
    dispatch(
      {
        type: EForumState.FETCHED_MESSAGES,
        payload:
          {
            messages: filteredMessages,
            loaded: topic,
          },
      },
    );
  }, WAIT_FOR_TEST);
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
        .catch((error) => console.log('Error', error));
    })
    .catch(() => {
      dispatch({ type: EForumState.UNKNOWN });
    });
};

export const removeTopic = (id: number) => (dispatch: Dispatch<ForumAction>) => {
  dispatch({ type: EForumState.FETCH_START });
  const d = getData();
  const topic = d.find((item) => item.id === id);
  const found = topic ? d.indexOf(topic) : -1;
  if (found > -1) {
    d.splice(found, 1);
  }
  saveData(d);
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: getData() } });
  }, WAIT_FOR_TEST);
};

export const removeMessage = (id: number) => (dispatch: Dispatch<ForumAction>) => {
  dispatch({ type: EForumState.FETCH_START });
  const m = getMessages();
  const topic = m.find((item) => item.id === id);
  const found = topic ? m.indexOf(topic) : -1;
  if (found > -1) {
    m.splice(found, 1);
  }
  saveMessages(m);
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_MESSAGES, payload: { messages: getMessages() } });
  }, WAIT_FOR_TEST);
};
