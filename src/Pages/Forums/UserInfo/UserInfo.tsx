import React, { FC, useEffect, useState } from 'react';
import { UserInfoProps, TUserInfo } from 'Pages/Forums/UserInfo/types';
import { useParams } from 'react-router-dom';
import { FORUM_URL } from 'Config/config';

const UserInfo: FC<UserInfoProps> = () => {
  const id = parseInt(useParams<{id: string}>().id, 10);
  const [userInfo, setUserInfo] = useState<TUserInfo>({ user: undefined, topics: [] });

  const fetchUserInfo = () => {
    fetch(`${FORUM_URL}/userinfo/${id}`, {
      credentials: 'include',
    }).then(async (response) => {
      const answer = await response.json();
      setUserInfo(answer);
    }).catch(() => {
      setUserInfo({ user: undefined, topics: [] });
    });
  };

  useEffect(() => {

  }, [userInfo]);

  useEffect(() => {
    if (id !== 0) {
      fetchUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
    </>
  );
};

export default UserInfo;
