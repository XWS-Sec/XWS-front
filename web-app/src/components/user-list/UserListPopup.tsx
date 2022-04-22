import { BaseSyntheticEvent } from 'react';
import UserInfoDto from '../../dtos/user-info.dto';
import infiniteScrollUtil from '../../utils/infinite-scroll-util';
import LoadingSpinner from '../common/LoadingSpinner';
import PopupHeader from '../common/PopupHeader';
import { UserListPopupType } from './user-list-popup-type.enum';
import UserListItem from './UserListItem';

const UserListPopup = (props: {
  title: string;
  users?: UserInfoDto[];
  isHidden: boolean;
  toggle: () => void;
  incrementPage: () => void;
  fetchingUsers: boolean;
  userListPopupType?: UserListPopupType;
  removeUser?: (userId: string) => void;
}) => {
  const handleScroll = (event: BaseSyntheticEvent) => {
    if (infiniteScrollUtil.hasReachedDivBottom(event)) {
      props.incrementPage();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-40'
      hidden={props.isHidden}
    >
      <div className='flex items-center justify-center h-full'>
        <div className='flex flex-col bg-white w-full md:w-500px h-full md:h-96 md:rounded-lg'>
          <PopupHeader title={props.title} toggle={props.toggle} />
          {props.users ? (
            <div className='overflow-y-scroll' onScroll={handleScroll}>
              {props.users &&
                props.users.map((user) => (
                  <UserListItem
                    key={user.id}
                    user={user}
                    userListPopupType={props.userListPopupType}
                    removeUser={props.removeUser}
                  />
                ))}
              {props.fetchingUsers && (
                <div className='flex h-10 items-center justify-center'>
                  <LoadingSpinner />
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-grow justify-center mt-24'>
              <LoadingSpinner />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListPopup;
