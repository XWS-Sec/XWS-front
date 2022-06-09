import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserInfoByUsernameRequest } from '../../api/get-user-info-by-username';
import { getUsersPosts } from '../../api/get-users-posts';
import PostList from '../../components/posts/PostList';
import UserInfoDto from '../../dtos/user-info.dto';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import ProfileInfo from './ProfileInfo';
import ProfileTabButton from './ProfileTabButton';
import UserDoesNotExist from './UserDoesNotExist';
import UserIsPrivateSection from './UserIsPrivateSection';

enum ProfileTab {
  POSTS,
  EXPERIENCE,
  SKILLS,
}

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState<UserInfoDto>();
  const [userExists, setUserExists] = useState(true);
  const [userPrivateSectionVisible, setUserPrivateSectionVisible] =
    useState(false);
  const [selectedTab, setSelectedTab] = useState(ProfileTab.POSTS);
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchUserInfo = async () => {
      const response = await getUserInfoByUsernameRequest(username);

      switch (response.status) {
        case HttpStatusCode.OK:
          const user = await response.json();
          setUser(user);
          break;
        case HttpStatusCode.NO_CONTENT:
          setUserExists(false);
          break;
        default:
          alert('Unknown error occurred');
      }
    };

    fetchUserInfo();
  }, [username]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) {
        return;
      }

      const response = await getUsersPosts(user.Id, 0);

      switch (response.status) {
        case HttpStatusCode.OK:
          const reply = await response.json();
          setPosts(reply.Posts);
          break;
        case HttpStatusCode.BAD_REQUEST:
          setUserPrivateSectionVisible(true);
          break;
        default:
          alert('Unknown error occurred');
      }
    };

    fetchPosts();
  }, [user]);

  return (
    <div className='flex flex-col flex-grow overflow-y-scroll'>
      <div className='flex flex-col flex-grow bg-gray-100'>
        {!userExists ? (
          <UserDoesNotExist username={username} />
        ) : (
          <>
            <ProfileInfo user={user} setUser={setUser} />
            {userPrivateSectionVisible ? (
              <UserIsPrivateSection username={user?.Username || ''} />
            ) : (
              <div className='flex flex-col'>
                <div className='flex self-center justify-around w-full md:w-614px py-3'>
                  <ProfileTabButton
                    tabName='Posts'
                    onClick={() => setSelectedTab(ProfileTab.POSTS)}
                  />
                  <ProfileTabButton
                    tabName='Experience'
                    onClick={() => setSelectedTab(ProfileTab.EXPERIENCE)}
                  />
                  <ProfileTabButton
                    tabName='Skills'
                    onClick={() => setSelectedTab(ProfileTab.SKILLS)}
                  />
                </div>
                {selectedTab === ProfileTab.POSTS && (
                  <PostList
                    posts={posts}
                    removePostItem={() => {}}
                    user={user}
                  />
                )}
                {selectedTab === ProfileTab.EXPERIENCE && <div>Experience</div>}
                {selectedTab === ProfileTab.SKILLS && <div>Skills</div>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
