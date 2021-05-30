import React, { FC, useEffect, useState } from 'react';
import { useAuthReselect, useForumTopics } from 'Store/hooks';
// import { EAuthState } from 'Reducers/auth/types';
import { useDispatch } from 'react-redux';
// import { getUserData } from 'Reducers/auth/actions';
import Button from 'UI/Button/index';
import Input from 'UI/Input/index';
import { addTopic } from 'Reducers/forum/actions';
import { EForumState } from 'Reducers/forum/types';
import { useHistory } from 'react-router-dom';
import Form from 'UI/Form';
import { EAuthState } from 'Reducers/auth/types';

const NewTopic: FC = () => {
  const auth = useAuthReselect();
  const [header, setHeader] = useState('');
  const dispatch = useDispatch();
  const topics = useForumTopics();
  const history = useHistory();
  const [headerErrorMessage, setHeaderErrorMessage] = useState('');

  useEffect(() => {
    if (topics.state === EForumState.FETCHED_TOPICS) {
      history.push('/forum');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics]);

  const checkHeader = (): boolean => {
    const isEmpty = header.trim() === '';
    setHeaderErrorMessage(isEmpty ? 'Поле должно быть заполнено' : '');
    return !isEmpty;
  };

  const onSaveMessageHandler = () => {
    if (checkHeader()) {
      dispatch(addTopic(header));
    }
  };

  const onCancelMessageHandler = () => {
    history.goBack();
  };

  return (
    <>
      {
        auth.state === EAuthState.LOGGED
          ? (
            <Form caption="Новая тема"
                  name="newTheme">
              <Input
                label="Тема"
                name="newTheme"
                value={header}
                onValueChanged={(v) => setHeader(v)}
                onBlur={() => checkHeader()}
                errorMessage={headerErrorMessage}
              />
              <Button onClick={onSaveMessageHandler}>Сохранить</Button>
              <Button onClick={onCancelMessageHandler}>Вернуться</Button>
            </Form>
          )
          : null
      }
    </>
  );
};

export default NewTopic;
