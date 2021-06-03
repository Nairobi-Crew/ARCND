import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { UserInfoPageProps } from 'Pages/Forums/UserInfoPage/types';
import UserInfo from 'Pages/Forums/UserInfoPage/UserInfo/UserInfo';
import Form from 'UI/Form';

const UserInfoPage: FC<UserInfoPageProps> = () => {
  const id = parseInt(useParams<{id: string}>().id, 10);
  return (
    <Form caption="Информация о пользователе" maxHeight>
      <UserInfo id={id} />
    </Form>
  );
};

export default UserInfoPage;
