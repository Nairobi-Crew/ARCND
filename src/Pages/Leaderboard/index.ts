import Leaderboard from 'Pages/Leaderboard/Leaderboard';
import AuthOnly from 'Components/HOC/AuthOnly';

export default AuthOnly(Leaderboard, '/signin');
