/* eslint-disable no-console */
import { getUserInfo } from 'Server/routes/auth';
import { Request } from 'express';
import { AUTH_PATH, SERVER_API_URL, USER_PATH } from 'Config/config';
import { UserModel } from 'Server/db/models/user';
import { IUser } from 'Store/types';
import Cookies from 'Server/fetch/Cookies';
import Fetch, { TFetchOptions } from 'Server/fetch/Fetch';

// eslint-disable-next-line import/prefer-default-export
export const getUser = (req: Request): Promise<UserModel | void> => new Promise((resolve, reject) => {
  const AUTH_SERVER_URL = `${SERVER_API_URL}${AUTH_PATH}`;
  getUserInfo(`${AUTH_SERVER_URL}/user`, req).then(async (user) => {
    try {
      const found = await UserModel.findOrCreate({
        where: {
          id: user.id,
        },
        defaults: {
          first_name: user.first_name,
          display_name: user.display_name,
          second_name: user.second_name,
          email: user.email,
          login: user.login,
          phone: user.phone,
          avatar: user.avatar,
        },
      }).then();
      resolve(found[0]);
    } catch (e) {
      console.log(`Error find user ${user?.id}`, e);
      reject();
    }
  }).catch(() => reject());
});

export const getUserByIdInfo = (req: Request, id: number): Promise<IUser> => new Promise((resolve, reject) => {
  const Cookie = Cookies.getCookies(req);
  const getUserOptions: TFetchOptions = {
    headers: { Cookie },
  };
  const url = `${SERVER_API_URL}${USER_PATH}/${id}`;
  Fetch.get(url, getUserOptions)
    .then(async (answer) => {
      try {
        const answer_json = await answer.json();
        resolve(answer_json as IUser);
      } catch (e) {
        console.log('e', e);
        reject(e);
      }
    })
    .catch((error) => {
      console.log('error', error);
      reject(error);
    });
});

// eslint-disable-next-line no-async-promise-executor
export const getUserById = (req: Request, id: number): Promise<IUser> => new Promise(async (resolve, reject) => {
  if (!id) {
    resolve({
      id: 0, login: '', first_name: 'Unknown', second_name: '', display_name: '', email: '', phone: '',
    });
  }
  try {
    const dbUser = await UserModel.findOne({
      where:
        {
          id,
        },
    });
    if (dbUser === null) {
      getUserByIdInfo(req, id).then((user) => {
        const {
          avatar, phone, login, email, second_name, display_name, first_name,
        } = user;
        UserModel.create({
          id, first_name, second_name, display_name, login, email, phone, avatar, OAUth: '',
        }).then((newDBUser) => {
          resolve(newDBUser);
        }).catch((error) => {
          console.log('Error append user to DB', error);
          reject(error);
        });
      }).catch((error) => {
        console.log('Error getUserByIdInfo', error);
      });
    } else {
      resolve(dbUser);
    }
  } catch (e) {
    console.log(`Error find user ${id}`, e);
  }
});
