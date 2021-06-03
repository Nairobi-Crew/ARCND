import React, { FC, useEffect, useState } from 'react';
import { UserInfoProps, TUserInfo } from 'Pages/Forums/UserInfoPage/UserInfo/types';
import { FORUM_URL } from 'Config/config';
import { Link } from 'react-router-dom';
import './UserInfo.scss';

const UserInfo: FC<UserInfoProps> = ({ id }) => {
  const [userInfo, setUserInfo] = useState<TUserInfo | undefined>(undefined);

  const fetchUserInfo = () => {
    fetch(`${FORUM_URL}/userinfo/${id}`, {
      credentials: 'include',
    }).then(async (response) => {
      const answer = await response.json();
      setUserInfo(answer);
    }).catch(() => {
      setUserInfo({ user: undefined, topics: [], count: 0 });
    });
  };

  useEffect(() => {
    if (id !== 0) {
      fetchUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="user_info">
      <div className="user_info_field">
        <div className="user_info_field_name">
          Имя
        </div>
        <div className="user_info_field_value">
          {userInfo?.user ? userInfo.user.first_name : null}
        </div>
      </div>
      <div className="user_info_field">
        <div className="user_info_field_name">
          Фамилия
        </div>
        <div className="user_info_field_value">
          {userInfo?.user ? userInfo.user.second_name : null}
        </div>
      </div>
      <div className="user_info_field">
        <div className="user_info_field_name">
          Логин
        </div>
        <div className="user_info_field_value">
          {userInfo?.user ? userInfo.user.login : null}
        </div>
      </div>
      <div className="user_info_field">
        <div className="user_info_field_name">
          Телефон
        </div>
        <div className="user_info_field_value">
          {userInfo?.user ? userInfo.user.phone : null}
        </div>
      </div>
      <div className="user_info_field">
        <div className="user_info_field_name">E-mail</div>
        <div className="user_info_field_value">
          {userInfo?.user ? userInfo.user.email : null}
        </div>
      </div>
      <hr />
      <div className="user_info_field">
        <div className="user_info_field_name center">
          Сообщений
        </div>
        <div className="user_info_field_value center">
          В топике
        </div>
      </div>
      {
          userInfo
            ? userInfo.topics.map((info) => (
              <div className="user_info_field" key={info.id}>
                <div className="user_info_field_name center">
                  <Link to={`/thread/${info.id}`}>
                    {info.count}
                  </Link>
                </div>
                <div className="user_info_field_value">
                  <Link to={`/thread/${info.id}`}>
                    {info.title}
                  </Link>
                </div>
              </div>
            ))
            : null
        }
    </div>
  );
};

export default UserInfo;
