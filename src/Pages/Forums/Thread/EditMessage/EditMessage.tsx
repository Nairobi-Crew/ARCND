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
  const [headerErrorMessage, setHeaderErrorMessage] = useState('');
  const [messageErrorMessage, setMessageErrorMessage] = useState('');
  const [topicName, setTopicName] = useState('');
  const topics = useForumTopics();
  const messages = useForumMessages();
  const dispatch = useDispatch();
  const auth = useAuthReselect();
  const history = useHistory();

  const getTopicName = () => {
    const found = topics.topics.find((item) => item.id.toString() === topicId.toString());
    if (found) {
      return found.description;
    }
    return '';
  };

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
    if (!topics.topics) {
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
    setTopicName(getTopicName());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkFields = (): boolean => {
    let isEmpty = false;
    if (header.trim() === '') {
      setHeaderErrorMessage('Поле должно быть заполенео');
      isEmpty = true;
    }
    if (message.trim() === '') {
      setMessageErrorMessage('Поле должно быть заполенео');
      isEmpty = true;
    }
    return !isEmpty;
  };

  const saveButtonHandler = () => {
    if (!checkFields()) {
      return;
    }
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
              errorMessage={headerErrorMessage}
              onBlur={() => checkFields()}
            />
            <Input
              label="Сообщение"
              value={message}
              onValueChanged={(v) => setMessage(v)}
              errorMessage={messageErrorMessage}
              onBlur={() => checkFields()}
            />
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
