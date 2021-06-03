import UserInfo from 'Pages/Forums/UserInfoPage/UserInfo/UserInfo';
import AuthOnly from 'Components/HOC/AuthOnly';

export default AuthOnly(UserInfo, '/signin');
