// import { isDev } from '../../env.variables';
export const APP_TITLE = 'ARCND';
export const SITE_URL = 'https://arcnd.ovb-tech.com';
// export const OAUTH_REDIRECT = isDev ? 'http://localhost:3000' : SITE_URL;
export const OAUTH_REDIRECT_PATH = '';
export const API_PATH = '/api/v2/';
export const API_HOST = 'https://ya-praktikum.tech';
export const API_URL = `${API_HOST}${API_PATH}`;
export const SERVER_API_URL = API_URL;
export const AUTH_PATH = 'auth';
export const OAUTH_PATH = 'oauth/yandex';
export const USER_PATH = 'user';
export const LEADER_PATH = 'leaderboard';
export const FORUM_PATH = 'forum';
export const EMOJI_INPUT_SIZE = 36;
export const EMOJI_SIZE = 24;
export const AUTH_URL = `${API_PATH}${AUTH_PATH}`;
export const AUTH_SERVER_URL = `${SERVER_API_URL}${AUTH_PATH}`;
export const USER_URL = `${API_PATH}${USER_PATH}`;
export const USER_SERVER_URL = `${SERVER_API_URL}${USER_PATH}`;
export const FORUM_URL = `${API_PATH}${FORUM_PATH}`;
export const LEADER_URL = `${API_PATH}${LEADER_PATH}`;
export const LEADER_SERVER_URL = `${SERVER_API_URL}${LEADER_PATH}`;
export const EXT_STORAGE = 'https://storage.yandexcloud.net/arcnd/';
export const AVATAR_MAX_SIZE = 0.2 * 1024 * 1024; // 2mb max upload size for avatar
