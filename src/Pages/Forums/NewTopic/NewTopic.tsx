import React, { FC, useEffect, useState } from 'react';
import { useAuthReselect, useForumTopics } from 'Store/hooks';
import { EAuthState } from 'Reducers/auth/types';
import { useDispatch } from 'react-redux';
import { getUserData } from 'Reducers/auth/actions';
import Button from 'UI/Button/index';
import Input from 'UI/Input/index';
import { addTopic } from 'Reducers/forum/actions';
import { EForumState } from 'Reducers/forum/types';
import { useHistory } from 'react-router-dom';
import Form from 'UI/Form';

const NewTopic: FC = () => {
  const auth = useAuthReselect();
  const [header, setHeader] = useState('');
  const [user, setUser] = useState(auth.user);
  const dispatch = useDispatch();
  const topics = useForumTopics();
  const history = useHistory();

  useEffect(() => {
    if (auth.state === EAuthState.UNKNOWN) {
      dispatch(getUserData());
    }
  }, []);

  useEffect(() => {
    setUser(auth.user);
  }, [auth]);

  useEffect(() => {
    if (topics.state === EForumState.FETCHED_TOPICS) {
      history.push('/forum');
    }
  }, [topics]);

  const onSaveMessageHandler = () => {
    dispatch(addTopic(user.id, `${user.first_name} ${user.second_name}`, header));
  };

  const onCancelMessageHandler = () => {
    history.goBack();
  };

  return (
    <Form caption="Новая тема" name="newTheme">
      <Input label="Тема" value={header} onValueChanged={(v) => setHeader(v)} name="newTheme"/>
      <Button onClick={onSaveMessageHandler}>Сохранить</Button>
      <Button onClick={onCancelMessageHandler}>Вернуться</Button>
    </Form>
  );
};

export default NewTopic;
