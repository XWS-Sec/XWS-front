import { Dispatch, SetStateAction, useContext } from 'react';
import AuthContext from '../../context/auth-context';
import UserInfoDto from '../../dtos/user-info.dto';
import CancelRequestButton from './CancelRequestButton';
import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';

const FriendshipButtonsSection = (props: {
  user: UserInfoDto | undefined;
  setUser: Dispatch<SetStateAction<UserInfoDto | undefined>>;
}) => {
  const authContext = useContext(AuthContext);

  return (
    <div>
      {props.user?.id !== authContext.user.id && (
        <div className='flex flex-row justify-center text-sm'>
          {props.user?.isFollowedByPrincipal ? (
            <UnfollowButton user={props.user} setUser={props.setUser} />
          ) : props.user?.isRequestedByPrincipal ? (
            <CancelRequestButton user={props.user} setUser={props.setUser} />
          ) : (
            <FollowButton user={props.user} setUser={props.setUser} />
          )}
        </div>
      )}
    </div>
  );
};

export default FriendshipButtonsSection;
