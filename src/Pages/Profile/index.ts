import Profile from 'Pages/Profile/Profile';
import AuthOnly from 'Components/HOC/AuthOnly/index';

export default AuthOnly(Profile, '/signin');
