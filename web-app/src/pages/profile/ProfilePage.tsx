import { useEffect, useState } from 'react';
import ProfileInfo from './ProfileInfo';
import UserIsPrivateSection from './UserIsPrivateSection';
import UserInfoDto from '../../dtos/user-info.dto';
import { useParams } from 'react-router-dom';
import { hardcodedUser } from '../../hardcoded-data/hardcoded-user';
import PostList from '../../components/posts/PostList';
import { hardcodedPosts } from '../../hardcoded-data/hardcoded-posts';
import ProfileTabButton from './ProfileTabButton';
import {
  HubConnectionBuilder,
  HubConnection,
  HttpTransportType,
  LogLevel,
} from '@microsoft/signalr';

enum ProfileTab {
  POSTS,
  EXPERIENCE,
  SKILLS,
}

const ProfilePage = () => {
  const { username } = useParams();

  const [user, setUser] = useState<UserInfoDto>();
  const [userPrivateSectionVisible, setUserPrivateSectionVisible] =
    useState(false);
  const [selectedTab, setSelectedTab] = useState(ProfileTab.POSTS);
  const [connection, setConnection] = useState<HubConnection>();
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    setUser(hardcodedUser);
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

    console.log('nc');
    console.log(newConnection);

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.on('Response', handleResponse);
      connection.on('postsNotification', (x: any) => {
        console.log(x);
      });
      connection.start().then((value) => {
        console.log('started');
        connection?.invoke('Connect', user?.id);
      });
    }
  }, [connection]);

  const handleResponse = (message: string) => {
    getPosts();
  };

  const getPosts = async () => {
    const response = await fetch(
      `/api/Post/0?specificUser=${hardcodedUser.id}`
    );

    console.log(response);
  };

  const handlePostsResponse = (response: any[]) => {
    console.log(response);
  };

  return (
    <div className='flex flex-col flex-grow overflow-y-scroll'>
      <div className='flex flex-col flex-grow bg-gray-100'>
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
                posts={hardcodedPosts}
                fetching={false}
                removePostItem={() => {}}
                postsCount={hardcodedPosts.length}
              />
            )}
            {selectedTab === ProfileTab.EXPERIENCE && <div>Experience</div>}
            {selectedTab === ProfileTab.SKILLS && <div>Skills</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
