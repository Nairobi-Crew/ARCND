import { IUser } from 'Store/types';

export const getDisplayName = (user: IUser): string => {
  if (!user) {
    return '';
  }
  if (user.display_name.trim() !== '') {
    return user.display_name;
  }
  if (user.first_name.trim() !== '' || user.second_name !== '') {
    return [user.first_name.trim(), user.second_name.trim()].join(' ');
  }
  return user.login;
};

export const getAvatar = (user: IUser): string => (user?.avatar ? user.avatar : '');
