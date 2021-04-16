import ChangePassword from 'Pages/ChangePassword/ChangePassword';
import AuthOnly from 'Components/HOC/AuthOnly';

export default AuthOnly(ChangePassword, '/signin');
