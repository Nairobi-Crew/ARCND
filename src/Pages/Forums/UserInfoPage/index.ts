import UserInfoPage from 'Pages/Forums/UserInfoPage/UserInfoPage';
import AuthOnly from 'Components/HOC/AuthOnly';

export default AuthOnly(UserInfoPage, '/signin');
