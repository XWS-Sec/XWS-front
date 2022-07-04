import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import { RBACProvider } from 'react-simple-rbac';
import { getUserInfoByIdRequest } from './api/get-user-info-by-id';
import MyRouter from './components/MyRouter';
import Notifications from './components/notifications/Notifications';
import AuthContext, { User } from './context/auth-context';
import { HttpStatusCode } from './utils/http-status-code.enum';
import localStorageUtil from './utils/local-storage/local-storage.util';

function App() {
  const [user, setUser] = useState<User>(localStorageUtil.getUser());
  const [connection, setConnection] = useState<HubConnection>();
  const [notifications, setNotifications] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<any>();

  const updateAuthContext = (user: User) => {
    setUser(user);
  };

  useEffect(() => {
    const fetchNotifSettings = async () => {
      const response = await fetch('/api/Notification');
      if (response.status === HttpStatusCode.OK) {
        const settings = await response.json();
        console.log(settings);
        console.log(settings.newPost);

        localStorage.setItem('DisplayNewPostNotif', settings.newPost);
        localStorage.setItem('DisplayNewMessageNotif', settings.newMessage);
        localStorage.setItem('DisplayNewFollowNotif', settings.newFollower);
      }
    };

    fetchNotifSettings();
  }, []);

  useEffect(() => {
    console.log('creating new connection');
    const newConnection = new HubConnectionBuilder()
      .withUrl(`http://localhost:7700/hub`, {
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
      connection.on('newMessage', handleNewMessageNotificationResponse);
      connection.on('newPost', handleNewPostNotificationResponse);
      connection.on('notification', handleNewFollowerNotificationResponse);
      connection.start().then((value) => {
        console.log('Hub connection started.');
        connection?.invoke('Connect', user?.id);
      });
    }

    return () => {
      connection?.off('newMessage');
      connection?.off('newPost');
      connection?.off('notification');
    };
  }, [connection]);

  const handleResponse = (message: string) => {
    fetch('/api/Notification');
  };

  const handleNewMessageNotificationResponse = async (response: any) => {
    const display = localStorage.getItem('DisplayNewMessageNotif') === 'true';
    if (!display || !user || response.senderId === user.id) {
      return;
    }

    console.log('new message:', response);
    const senderResponse = await getUserInfoByIdRequest(response.senderId);
    const sender = await senderResponse.json();

    setNewMessage(response);

    setNotifications((notifications) => [
      ...notifications,
      `${sender.Username}: ${response.message}`,
    ]);
  };

  const handleNewPostNotificationResponse = async (response: string) => {
    const display = localStorage.getItem('DisplayNewPostNotif') === 'true';

    if (!display) {
      return;
    }

    console.log('new post from:', response);
    const userResponse = await getUserInfoByIdRequest(response);
    const user = await userResponse.json();

    setNotifications((notifications) => [
      ...notifications,
      `User ${user.Username} shared a new post.`,
    ]);
  };

  const handleNewFollowerNotificationResponse = async (response: string) => {
    const display = localStorage.getItem('DisplayNewFollowNotif') === 'true';

    if (!display) {
      return;
    }

    console.log('notification:', response);

    if (response === 'New follower!') {
      setNotifications((notifications) => [
        ...notifications,
        'You have a new follower!.',
      ]);
      return;
    }
  };

  const onNotificationDismiss = (index: number) => {
    const copy = [...notifications];
    copy.splice(index, 1);
    setNotifications(copy);
  };

  return (
    <div className='flex flex-col h-screen'>
      <Notifications
        notifications={notifications}
        onDismiss={onNotificationDismiss}
      />
      <AuthContext.Provider
        value={{
          user: user,
          updateAuthContext: updateAuthContext,
        }}
      >
        <MyRouter loggedIn={user.loggedIn} newMessage={newMessage} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
