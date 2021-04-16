import AuthOnly from 'Components/HOC/AuthOnly';
import NewTopic from 'Pages/Forums/NewTopic/NewTopic';

export default AuthOnly(NewTopic, 'forum');
