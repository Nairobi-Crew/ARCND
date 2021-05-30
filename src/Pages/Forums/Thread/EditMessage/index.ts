import AuthOnly from 'Components/HOC/AuthOnly';
import EditMessage from 'Pages/Forums/Thread/EditMessage/EditMessage';

export default AuthOnly(EditMessage, '/signin');
