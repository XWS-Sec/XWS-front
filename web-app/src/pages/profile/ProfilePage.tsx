import { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import UserIsPrivateSection from './UserIsPrivateSection';
import UserInfoDto from '../../dtos/user-info.dto';
import { useNavigate, useParams } from 'react-router-dom';
import { hardcodedUser } from '../../hardcoded-data/hardcoded-user';
import PostList from '../../components/posts/PostList';
import ProfileTabButton from './ProfileTabButton';
import {
  HubConnectionBuilder,
  HubConnection,
  HttpTransportType,
  LogLevel,
} from '@microsoft/signalr';
import { getUserInfo } from '../../api/get-user-info';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import { getUsersPosts } from '../../api/get-users-posts';
import UserDoesNotExist from './UserDoesNotExist';

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
  const [connection, setConnection] = useState<HubConnection>();
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    if (!username) {
      return;
    }

    const fetchUserInfo = async () => {
      const response = await getUserInfo(username);

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
    const newConnection = new HubConnectionBuilder()
      .withUrl(`https://localhost:44322/hub`, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, [user]);

  useEffect(() => {
    if (connection) {
      connection.on('Response', handleResponse);
      connection.on('postsNotification', handlePostsResponse);
      connection.start().then((value) => {
        console.log('Hub connection started.');
        connection?.invoke('Connect', user?.id);
      });
    }
  }, [connection]);

  const handleResponse = (message: string) => {
    getUsersPosts(user!.id, 0);
  };

  const handlePostsResponse = (response: any[]) => {
    setPosts(response);
    console.log('posts:', response);
  };

  return (
    <div className='flex flex-col flex-grow overflow-y-scroll'>
      <div className='flex flex-col flex-grow bg-gray-100'>
        {!userExists ? (
          <UserDoesNotExist username={username} />
        ) : (
          <>
            <ProfileInfo user={user} setUser={setUser} />
            {userPrivateSectionVisible ? (
              <UserIsPrivateSection username={user?.username || ''} />
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
                    fetching={false}
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
