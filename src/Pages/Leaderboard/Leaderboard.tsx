import React, {useEffect} from 'react';
import {LeaderboardProps} from 'Pages/Leaderboard/types';
import Leader from 'Pages/Leaderboard/Leader/Leader';
import './Leaderboard.scss';
import {useDispatch} from "react-redux";
import {getLeaders} from 'Reducers/leaderboard/actions';
import {useLeaderboardLeaders} from "Store/hooks";
import {ELeaderboardAction} from "Reducers/leaderboard/types";

const Leaderboard: LeaderboardProps = ({...props}) => {

  const dispatch = useDispatch();

  const leaders = useLeaderboardLeaders();
  useEffect(() => {
    if (leaders.state === ELeaderboardAction.UNKNOWN) {
      dispatch(getLeaders({cursor: 0, limit: 10}))
    }
  }, [leaders]);


  return (
    <ul className="leaderboard">
      {leaders.leaders
        .map(({name, avatar, score,}, i) => <Leader key={name} name={name} index={i + 1} avatar="https://images.squarespace-cdn.com/content/v1/5489bd9ae4b08b416ef124ea/1551796492448-G53ZGIG9MD8JBDP34A19/ke17ZwdGBToddI8pDm48kCAgykdLW9iAzCXIGQWv3UZ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UbNWIFdbAwZkj6QBZiniZ69MY7oti88DqO2IXex58sFjOpYghpI-Ha_TwZsqqmJXng/placeholder.png" score={score} />)}
    </ul>
  );
};

export default Leaderboard;
