import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import UserImage from '../../components/common/UserImage';
import FriendshipButtonsSection from '../../components/friendship-buttons/FriendshipButtonsSection';
import { UserListPopupType } from '../../components/user-list/user-list-popup-type.enum';
import UserListPopup from '../../components/user-list/UserListPopup';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import UserInfoDto from '../../dtos/user-info.dto';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import CountInfoSection from './CountInfoSection';
import { ProfilePicture } from './profile-picture/ProfilePicture';
import ProfileDescription from './ProfileDescription';

const ProfileInfo = (props: {
  user: UserInfoDto | undefined;
  setUser: Dispatch<SetStateAction<UserInfoDto | undefined>>;
}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [followers, setFollowers] = useState<UserInfoDto[]>([]);
  const [following, setFollowing] = useState<UserInfoDto[]>([]);
  const [followersPage, setFollowersPage] = useState(1);
  const [followingPage, setFollowingPage] = useState(1);
  const [isFollowersPopupHidden, setIsFollowersPopupHidden] = useState(true);
  const [isFollowingPopupHidden, setIsFollowingPopupHidden] = useState(true);
  const [fetchingFollowers, setFetchingFollowers] = useState(false);
  const [fetchingFollowing, setFetchingFollowing] = useState(false);
  const [reachedLastFollowersPage, setReachedLastFollowersPage] =
    useState(false);
  const [reachedLastFollowingPage, setReachedLastFollowingPage] =
    useState(false);

  const fetchFollowers = useCallback(async () => {
    setFetchingFollowers(true);

    const response = await fetch(
      '/api/users/followers?userId=' + props.user?.Id + '&page=' + followersPage
    );

    setFetchingFollowers(false);

    switch (response.status) {
      case HttpStatusCode.OK:
        const data = await response.json();
        setFollowers((followers) => followers.concat(data.users));

        if (!data.hasNextPage) {
          setReachedLastFollowersPage(true);
        }

        break;
      case HttpStatusCode.UNAUTHORIZED:
        localStorage.clear();
        navigate('/');
        authContext.updateAuthContext(unsignedUser);
    }
  }, [authContext, followersPage, navigate, props.user?.Id]);

  const fetchFollowing = useCallback(async () => {
    setFetchingFollowing(true);

    const response = await fetch(
      '/api/users/following?userId=' + props.user?.Id + '&page=' + followingPage
    );

    setFetchingFollowing(false);

    switch (response.status) {
      case HttpStatusCode.OK:
        const data = await response.json();
        setFollowing((following) => following.concat(data.users));

        if (!data.hasNextPage) {
          setReachedLastFollowingPage(true);
        }

        break;
      case HttpStatusCode.UNAUTHORIZED:
        localStorage.clear();
        navigate('/');
        authContext.updateAuthContext(unsignedUser);
    }
  }, [authContext, followingPage, navigate, props.user?.Id]);

  useEffect(() => {
    setFollowers([]);
    setFollowing([]);
    setReachedLastFollowersPage(false);
    setReachedLastFollowingPage(false);
    setIsFollowersPopupHidden(true);
    setIsFollowingPopupHidden(true);
  }, [props.user]);

  useEffect(() => {
    if (followersPage === 1) {
      return;
    }

    fetchFollowers();
  }, [followersPage, fetchFollowers]);

  useEffect(() => {
    if (followingPage === 1) {
      return;
    }

    fetchFollowing();
  }, [followingPage, fetchFollowing]);

  const toggleFollowersPopup = () => {
    if (followers.length === 0) {
      fetchFollowers();
    }
    setIsFollowersPopupHidden(!isFollowersPopupHidden);
  };

  const toggleFollowingPopup = () => {
    if (following.length === 0) {
      fetchFollowing();
    }
    setIsFollowingPopupHidden(!isFollowingPopupHidden);
  };

  const incrementFollowersPage = () => {
    if (fetchingFollowers || reachedLastFollowersPage) {
      return;
    }

    setFollowersPage(followersPage + 1);
  };

  const incrementFollowingPage = () => {
    if (fetchingFollowing || reachedLastFollowingPage) {
      return;
    }

    setFollowingPage(followingPage + 1);
  };

  const removeFollower = (followerId: string) => {
    setFollowers(followers.filter((follower) => follower.Id !== followerId));
  };

  return (
    <div>
      {/* <UserListPopup
        title='Followers'
        users={followers}
        isHidden={isFollowersPopupHidden}
        toggle={toggleFollowersPopup}
        incrementPage={incrementFollowersPage}
        fetchingUsers={fetchingFollowers}
        userListPopupType={
          props.user?.Id === authContext.user.id
            ? UserListPopupType.FOLLOWERS
            : UserListPopupType.REGULAR
        }
        removeUser={removeFollower}
      />
      <UserListPopup
        title='Following'
        users={following}
        isHidden={isFollowingPopupHidden}
        toggle={toggleFollowingPopup}
        incrementPage={incrementFollowingPage}
        fetchingUsers={fetchingFollowing}
      /> */}
      <div className='flex flex-col py-1 px-1 md:py-4 items-center'>
        {props.user ? (
          <div className='flex flex-row'>
            <div className='flex flex-col'>
              {props.user.Id + '' === authContext.user.id + '' ? (
                <ProfilePicture user={props.user} />
              ) : (
                <UserImage userId={props.user.Id} width={150} height={150} />
              )}
              <div className='mt-3'>
                <FriendshipButtonsSection
                  user={props.user}
                  setUser={props.setUser}
                />
              </div>
            </div>
            <div className='w-full md:w-500px md:ml-20'>
              <p className='text-xl md:text-2xl text-center md:text-left mt-2 md:ml-2'>
                {props.user.Username}
              </p>
              <CountInfoSection
                postsCount={120}
                followersCount={1850}
                followingCount={1200}
                toggleFollowersPopup={toggleFollowersPopup}
                toggleFollowingPopup={toggleFollowingPopup}
              />
              <ProfileDescription user={props.user} />
            </div>
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
