import React, { FC, useEffect, useState } from 'react';
import { EditMessageProps } from 'Pages/Forums/Thread/EditMessage/types';
import { useAuthReselect, useForumMessages, useForumTopics } from 'Store/hooks';
import { useDispatch } from 'react-redux';
import { clearState, fetchTopicsAction, saveMessage } from 'Reducers/forum/actions';
import Form from 'UI/Form/index';
import Input from 'UI/Input/index';
import Button from 'UI/Button';
import { EAuthState } from 'Reducers/auth/types';
import { useHistory } from 'react-router-dom';
import { EForumState } from 'Reducers/forum/types';
import EmojiInput from 'UI/EmojiInput';

const EditMessage: FC<EditMessageProps> = (
  {
    messageId,
    parentMessage,
    topicId,
    visible = true,
    onSave = null,
  },
) => {
  const [header, setHeader] = useState('');
  const [emoji, setEmoji] = useState(5);
  const [message, setMessage] = useState('');
  const [parentMessageMessage, setParentMessage] = useState('');
  const [parentMessageHeader, setParentHeader] = useState('');
  const [topicName, setTopicName] = useState('');
  const topics = useForumTopics();
  const messages = useForumMessages();
  const dispatch = useDispatch();
  const auth = useAuthReselect();
  const history = useHistory();

  const getMessage = (id: number) => {
    let msg = '';
    let hdr = '';
    let tm = 0;
    let em = 0;
    if (id !== 0) {
      if (messages.messages) {
        const foundedMessage = messages.messages.find((item) => item.id === id);
        if (foundedMessage) {
          msg = foundedMessage.message;
          hdr = foundedMessage.header;
          tm = foundedMessage.time;
          em = foundedMessage.emoji;
        }
      }
    }
    return {
      message: msg, header: hdr, time: tm, emoji: em,
    };
  };

  useEffect(() => {
    if (topics.topics && topics.topics.length === 0) {
      dispatch(fetchTopicsAction());
    }
    const msg = getMessage(messageId);
    setMessage(msg.message);
    setHeader(msg.header);
    setEmoji(msg.emoji);

    const parentMsg = getMessage(parentMessage);
    setParentMessage(parentMsg.message);
    setParentHeader(parentMsg.header);
    if (messages.state !== EForumState.UNKNOWN) {
      dispatch(clearState());
    }
    if (auth.state !== EAuthState.LOGGED) {
      history.push('/forum');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveButtonHandler = () => {
    dispatch(saveMessage(
      messageId,
      message,
      parentMessage,
      topicId,
      header,
      emoji,
    ));
    if (onSave) {
      onSave();
    }
  };

  useEffect(() => {
    if (topics.topics) {
      const foundedTopic = topics.topics.find((item) => item.id === topicId);
      if (foundedTopic) {
        setTopicName(foundedTopic.description);
      }
    }
  }, [topics, topicId]);

  // useEffect(() => {
  //   if (messages.state === EForumState.FETCHED_MESSAGES) {
  //     // history.push(`/thread/${topicId}`);
  //   }
  // }, [messages]);

  const emojiClickHandler = (e: number) => {
    if (e) {
      setEmoji(e);
    }
  };

  return (
    <>
      {
      visible
        ? (
          <Form caption={topicName} visible={visible} header={false} maxHeight={false}>
            { parentMessageMessage !== '' ? (
              <>
                <div>
                  Ответ:
                  {parentMessageHeader}
                </div>
                <div>
                  Сообщение:
                  {parentMessageMessage}
                </div>
              </>
            ) : null }
            <Input
              label="Заголовок"
              value={header}
              onValueChanged={(v) => {
                setHeader(v);
              }}
            />
            <Input label="Сообщение" value={message} onValueChanged={(v) => setMessage(v)} />
            <EmojiInput current={emoji} onChange={emojiClickHandler} />
            <Button onClick={saveButtonHandler} disabled={header.trim() === '' || message.trim() === ''}>Сохранить</Button>
          </Form>
        )
        : null
    }
    </>
  );
};

export default EditMessage;
