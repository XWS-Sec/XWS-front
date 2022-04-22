import { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import UserIsPrivateSection from './UserIsPrivateSection';
import UserInfoDto from '../../dtos/user-info.dto';
import { useParams } from 'react-router-dom';
import { hardcodedUser } from '../../hardcoded-data/hardcoded-user';

const ProfilePage = () => {
  const { username } = useParams();

  const [user, setUser] = useState<UserInfoDto>();
  const [userPrivateSectionVisible, setUserPrivateSectionVisible] =
    useState(false);

  useEffect(() => {
    setUser(hardcodedUser);
  }, [username]);

  return (
    <div className='flex flex-col flex-grow overflow-y-scroll'>
      <div className='flex flex-col flex-grow'>
        <ProfileInfo user={user} setUser={setUser} />
        {userPrivateSectionVisible ? (
          <UserIsPrivateSection username={user?.username || ''} />
        ) : (
          <div>Posts</div>
        )}
      </div>
      )
    </div>
  );
};

export default ProfilePage;
