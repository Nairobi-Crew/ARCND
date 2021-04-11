import { EForumState, IMessagesItem, ITopicsItem } from 'Reducers/forum/types';
import { data, messages, WAIT_FOR_TEST } from 'Reducers/forum/sampleData';
import getRandomId from 'Util/getRandomId';

export const clearState = () => (dispatch) => {
  dispatch({ type: EForumState.UNKNOWN });
};

export const fetchTopics = () => async (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: data } });
  }, WAIT_FOR_TEST);
};

export const fetchMessages = (thread: string) => async (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  setTimeout(() => {
    dispatch({
      type: EForumState.FETCHED_MESSAGES,
      payload: {
        messages: messages.filter(
          (item) => item.topic === thread,
        ),
        loaded: thread,
      },
    });
  }, WAIT_FOR_TEST);
};

export const saveMessage = (
  _id: string,
  _time: number,
  text: string,
  parent: string,
  authorId: number,
  author: string,
  topic: string,
  header: string,
) => (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  let id = _id;
  let time = _time;
  if (id === '') {
    id = getRandomId();
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

  if (_id === '') {
    messages.push(msg);
  } else {
    const founded = messages.find((item) => item.id === _id);
    if (founded) {
      Object.assign(founded, msg);
    }
  }
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_MESSAGES, payload: { messages, loaded: topic } });
  }, WAIT_FOR_TEST);
};

export const addTopic = (authorId, author, description) => async (dispatch) => {
  const id = getRandomId();
  const now = Date.now();
  const topic: ITopicsItem = {
    id,
    createTime: now,
    authorId,
    author,
    description,
    lastMessage: '',
    lastMessageUser: '',
    lastMessageUserId: 0,
    lastMessageTime: 0,
    messageCount: 0,
  };
  data.push(topic);

  dispatch({ type: EForumState.FETCH_START });
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: data } });
  }, WAIT_FOR_TEST);
};

export const removeTopic = (id) => (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  const found = data.indexOf(data.find((item) => item.id === id));
  if (found > -1) {
    data.splice(found, 1);
  }
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: data } });
  }, WAIT_FOR_TEST);
};

export const removeMessage = (id) => (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  const found = messages.indexOf(messages.find((item) => item.id === id));
  if (found > -1) {
    messages.splice(found, 1);
  }
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_MESSAGES, payload: { messages } });
  }, WAIT_FOR_TEST);
};
