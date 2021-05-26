import Forum from 'Pages/Forums/Forum/Forum';
import AuthOnly from 'Components/HOC/AuthOnly';

export default AuthOnly(Forum, '/signin');
