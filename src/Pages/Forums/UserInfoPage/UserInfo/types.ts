import { IUser } from 'Store/types';
import { ITopicInfo } from 'Reducers/forum/types';

export type UserInfoProps = {
  id: number
};

export type TUserInfo = {
  user: IUser | undefined
  count: number
  topics: ITopicInfo[]
}
