import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUserInfoByIdRequest } from '../../api/get-user-info-by-id';
import UserInfoDto from '../../dtos/user-info.dto';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import UserImage from '../common/UserImage';
import FriendshipButtonsSection from '../friendship-buttons/FriendshipButtonsSection';
import RemoveFollowerButton from '../friendship-buttons/RemoveFollowerButton';
import { UserListPopupType } from './user-list-popup-type.enum';

const UserListItem = (props: {
  user?: any;
  userId?: string;
  userListPopupType?: UserListPopupType;
  removeUser?: (userId: string) => void;
}) => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!props.userId) {
        return;
      }

      const response = await getUserInfoByIdRequest(props.userId);

      switch (response.status) {
        case HttpStatusCode.OK:
          const poster = await response.json();
          setUser(poster);
          break;
        default:
          alert('Unknown error occurred');
      }
    };

    fetchUser();
  }, [props.userId]);

  return (
    <>
      {props.user ? (
        <div className='flex py-2 mx-2 sm:mx-5 pr-3 items-center justify-between border-gray-200 border-b-2'>
          <Link to={`/users/${props.user.Username}`}>
            <UserImage userId={props.user.Id} width={50} height={50} />
          </Link>
          <div className='flex flex-col ml-2 flex-grow min-w-0'>
            <Link to={`/users/${props.user.Username}`}>
              <p className='font-bold truncate'>{props.user.Username}</p>
            </Link>
            <p className='truncate'>
              {props.user.Name + ' ' + props.user.Surname}
            </p>
          </div>
          {props.userListPopupType === UserListPopupType.FOLLOWERS ? (
            <RemoveFollowerButton
              user={user}
              setUser={setUser}
              removeFollower={props.removeUser!}
            />
          ) : (
            <FriendshipButtonsSection user={user} setUser={setUser} />
          )}
        </div>
      ) : (
        user && (
          <div className='flex py-2 mx-2 sm:mx-5 pr-3 items-center justify-between border-gray-200 border-b-2'>
            <Link to={`/users/${user.Username}`}>
              <UserImage userId={user.Id} width={50} height={50} />
            </Link>
            <div className='flex flex-col ml-2 flex-grow min-w-0'>
              <Link to={`/users/${user.Username}`}>
                <p className='font-bold truncate'>{user.Username}</p>
              </Link>
              <p className='truncate'>{user.Name + ' ' + user.Surname}</p>
            </div>
            {props.userListPopupType === UserListPopupType.FOLLOWERS ? (
              <RemoveFollowerButton
                user={user}
                setUser={setUser}
                removeFollower={props.removeUser!}
              />
            ) : (
              <FriendshipButtonsSection user={user} setUser={setUser} />
            )}
          </div>
        )
      )}
    </>
  );
};

export default UserListItem;
