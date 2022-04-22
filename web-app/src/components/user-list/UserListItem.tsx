import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfoDto from '../../dtos/user-info.dto';
import UserImage from '../common/UserImage';
import FriendshipButtonsSection from '../friendship-buttons/FriendshipButtonsSection';
import RemoveFollowerButton from '../friendship-buttons/RemoveFollowerButton';
import { UserListPopupType } from './user-list-popup-type.enum';

const UserListItem = (props: {
  user: UserInfoDto;
  userListPopupType?: UserListPopupType;
  removeUser?: (userId: string) => void;
}) => {
  const [user, setUser] = useState<UserInfoDto | undefined>(
    props.user ? props.user : undefined
  );

  return (
    <div className='flex py-2 mx-2 sm:mx-5 pr-3 items-center justify-between border-gray-200 border-b-2'>
      <Link to={props.user.username}>
        <UserImage
          src={props.user.profilePictureLocation}
          width={50}
          height={50}
        />
      </Link>
      <div className='flex flex-col ml-2 flex-grow min-w-0'>
        <Link to={props.user.username}>
          <p className='font-bold truncate'>{props.user.username}</p>
        </Link>
        <p className='truncate'>
          {props.user.firstName + ' ' + props.user.lastName}
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
  );
};

export default UserListItem;
