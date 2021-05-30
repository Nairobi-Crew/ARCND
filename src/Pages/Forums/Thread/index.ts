import Thread from 'Pages/Forums/Thread/Thread';
import AuthOnly from 'Components/HOC/AuthOnly';

export default AuthOnly(Thread, '/signin');
