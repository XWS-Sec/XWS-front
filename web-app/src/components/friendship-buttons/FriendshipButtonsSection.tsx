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
import LoadingSpinner from '../common/LoadingSpinner';
import CancelRequestButton from './CancelRequestButton';
import FollowButton from './FollowButton';
import UnfollowButton from './UnfollowButton';

const FriendshipButtonsSection = (props: {
  user: UserInfoDto | undefined;
  setUser: Dispatch<SetStateAction<UserInfoDto | undefined>>;
}) => {
  const authContext = useContext(AuthContext);

  const [isFollowedByPrincipal, setIsFollowedByPrincipal] = useState<boolean>();
  const [isRequestedByPrincipal, setIsRequestedByPrincipal] =
    useState<boolean>();

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
            setIsRequestedByPrincipal(false);
            break;
          }

          setIsFollowedByPrincipal(false);

          //TODO: add check if requested by principal
          setIsRequestedByPrincipal(false);
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
          {isFollowedByPrincipal !== undefined &&
            isRequestedByPrincipal !== undefined &&
            (isFollowedByPrincipal ? (
              <UnfollowButton user={props.user} setUser={props.setUser} />
            ) : isRequestedByPrincipal ? (
              <CancelRequestButton user={props.user} setUser={props.setUser} />
            ) : (
              <FollowButton user={props.user} setUser={props.setUser} />
            ))}
          {(isFollowedByPrincipal === undefined ||
            isRequestedByPrincipal === undefined) && (
            <div className='flex justify-center w-24'>
              <LoadingSpinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FriendshipButtonsSection;
