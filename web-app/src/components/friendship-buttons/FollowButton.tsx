import { Dispatch, SetStateAction, useState } from 'react';
import UserInfoDto from '../../dtos/user-info.dto';
import LoadingSpinner from '../common/LoadingSpinner';

const FollowButton = (props: {
  user: UserInfoDto | undefined;
  setUser: Dispatch<SetStateAction<UserInfoDto | undefined>>;
}) => {
  const [fetching, setFetching] = useState(false);

  return (
    <div className='flex items-center justify-center w-24 h-8 ml-1'>
      {fetching ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <button className='btnGreenWhite w-24 h-8 p-0'>Follow</button>
      )}
    </div>
  );
};

export default FollowButton;