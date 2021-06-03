import { IUser } from 'Store/types';
import { ITopicInfo } from 'Reducers/forum/types';

export type UserInfoProps = {

};

export type TUserInfo = {
  user: IUser | undefined
  topics: ITopicInfo[]
}
