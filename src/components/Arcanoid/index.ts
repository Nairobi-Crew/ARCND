import Arcanoid from 'Components/Arcanoid/Arcanoid';
import AuthOnly from 'Components/HOC/AuthOnly';

export default AuthOnly(Arcanoid, '/');
