import { IUser } from 'Store/types';

export const getDisplayName = (user: IUser | null, nullDefault: string | undefined = 'Unknown'): string => {
  try {
    if (!user) {
      return nullDefault;
    }
    const first_name = user.first_name ?? '';
    const second_name = user.second_name ?? '';
    const display_name = user.display_name ?? '';
    const login = user.login ?? '';

    if (display_name.trim() !== '') {
      return display_name;
    }
    if (first_name !== '' || second_name !== '') {
      return [first_name, second_name].join(' ');
    }
    return login;
  } catch (e) {
    console.log('Error getDisplayName', e);
    return nullDefault;
  }
};

export const getAvatar = (user: IUser | null): string => (user?.avatar ? user.avatar : '');
