import { EForumState, IMessagesItem, ITopicsItem } from 'Reducers/forum/types';
import {
  getData, getMessages, saveData, saveMessages, WAIT_FOR_TEST,
} from 'Reducers/forum/sampleData';
import getRandomId from 'Util/getRandomId';

export const clearState = () => (dispatch) => {
  dispatch({ type: EForumState.UNKNOWN });
};

export const fetchTopics = () => async (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: getData() } });
  }, WAIT_FOR_TEST);
};

export const fetchMessages = (thread: string) => async (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  setTimeout(() => {
    const filteredMessages = getMessages().filter(
      (item) => item.topic === thread,
    );
    dispatch({
      type: EForumState.FETCHED_MESSAGES,
      payload: {
        messages: filteredMessages,
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

  const m = getMessages();
  if (_id === '') {
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

  const d = getData();
  d.push(topic);
  saveData(d);

  dispatch({ type: EForumState.FETCH_START });
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: getData() } });
  }, WAIT_FOR_TEST);
};

export const removeTopic = (id) => (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  const d = getData();
  const found = d.indexOf(d.find((item) => item.id === id));
  if (found > -1) {
    d.splice(found, 1);
  }
  saveData(d);
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_TOPICS, payload: { topics: getData() } });
  }, WAIT_FOR_TEST);
};

export const removeMessage = (id) => (dispatch) => {
  dispatch({ type: EForumState.FETCH_START });
  const m = getMessages();
  const found = m.indexOf(m.find((item) => item.id === id));
  if (found > -1) {
    m.splice(found, 1);
  }
  saveMessages(m);
  setTimeout(() => {
    dispatch({ type: EForumState.FETCHED_MESSAGES, payload: { messages: getMessages() } });
  }, WAIT_FOR_TEST);
};
