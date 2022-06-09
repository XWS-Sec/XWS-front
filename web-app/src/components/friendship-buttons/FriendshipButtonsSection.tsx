import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getFollowRequest } from '../../api/get-following';
import AuthContext from '../../context/auth-context';
import UserInfoDto from '../../dtos/user-info.dto';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import CancelRequestButton from './CancelRequestButton';
import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';

const FriendshipButtonsSection = (props: {
  user: UserInfoDto | undefined;
  setUser: Dispatch<SetStateAction<UserInfoDto | undefined>>;
}) => {
  const authContext = useContext(AuthContext);

  const [isFollowedByPrincipal, setIsFollowedByPrincipal] = useState(false);
  const [isRequestedByPrincipal, setIsRequestedByPrincipal] = useState(false);

  useEffect(() => {
    if (!props.user) {
      return;
    }

    const fetchFollow = async () => {
      const response = await getFollowRequest();

      switch (response.status) {
        case HttpStatusCode.OK:
          const message = await response.json();
          if (message.Following.find((f: any) => f.Id === props.user!.Id)) {
            setIsFollowedByPrincipal(true);
          }
          //TODO: add check if requested by principal
          break;
        default:
          alert('Unknown error occurred');
      }
    };

    fetchFollow();
  }, [props.user]);

  return (
    <div>
      {props.user?.Id !== authContext.user.id && (
        <div className='flex flex-row justify-center text-sm'>
          {isFollowedByPrincipal ? (
            <UnfollowButton user={props.user} setUser={props.setUser} />
          ) : isRequestedByPrincipal ? (
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
