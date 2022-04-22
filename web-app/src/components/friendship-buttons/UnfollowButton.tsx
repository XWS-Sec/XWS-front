import { Dispatch, SetStateAction, useState } from 'react';
import UserInfoDto from '../../dtos/user-info.dto';
import LoadingSpinner from '../common/LoadingSpinner';

const UnfollowButton = (props: {
  user: UserInfoDto | undefined;
  setUser: Dispatch<SetStateAction<UserInfoDto | undefined>>;
}) => {
  const [fetching, setFetching] = useState(false);

  return (
    <div className='flex items-center justify-center w-24 h-8'>
      {fetching ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <button className='btnWhiteGreen w-24 h-8'>Unfollow</button>
      )}
    </div>
  );
};

export default UnfollowButton;
