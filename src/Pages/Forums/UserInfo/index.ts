import UserInfo from 'Pages/Forums/UserInfo/UserInfo';
import AuthOnly from 'Components/HOC/AuthOnly';

export default AuthOnly(UserInfo, '/signin');
