import { useState } from 'react';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import UserImage from '../../../components/common/UserImage';
import UserInfoDto from '../../../dtos/user-info.dto';
import ProfilePicturePopup from './ProfilePicturePopup';

export const ProfilePicture = (props: { user: UserInfoDto }) => {
  const [profilePicturePopupVisible, setProfilePicturePopupVisible] =
    useState(false);

  const toggleProfilePicturePopup = () => {
    setProfilePicturePopupVisible(!profilePicturePopupVisible);
  };

  const [profilePictureLocation, setProfilePictureLocation] = useState(
    props.user.profilePictureLocation
  );
  const [fetching, setFetching] = useState(false);

  return (
    <div className='flex flex-grow justify-center items-center'>
      {profilePicturePopupVisible && (
        <ProfilePicturePopup
          toggleProfilePicturePopup={toggleProfilePicturePopup}
          setProfilePictureLocation={setProfilePictureLocation}
          setFetching={setFetching}
        />
      )}
      <div
        className='hover:opacity-60 cursor-pointer'
        onClick={fetching ? () => {} : toggleProfilePicturePopup}
      >
        {fetching ? (
          <LoadingSpinner />
        ) : (
          <UserImage userId={props.user.Id} width={144} height={144} />
        )}
      </div>
    </div>
  );
};
