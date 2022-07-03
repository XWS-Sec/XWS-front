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
    console.log('creating new connection');
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
      connection.on('newMessage', handleNewMessageNotificationResponse);
      connection.on('newPost', handleNewPostNotificationResponse);
      connection.on('notification', handleNewFollowerNotificationResponse);
      connection.start().then((value) => {
        console.log('Hub connection started.');
        connection?.invoke('Connect', user?.id);
      });
    }
  }, [connection]);

  const handleResponse = (message: string) => {
    fetch('/api/Notification');
  };

  const handleNewMessageNotificationResponse = async (response: any) => {
    if (!user || response.senderId === user.id) {
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
    console.log('new post from:', response);
    const userResponse = await getUserInfoByIdRequest(response);
    const user = await userResponse.json();

    setNotifications((notifications) => [
      ...notifications,
      `User ${user.Username} shared a new post.`,
    ]);
  };

  const handleNewFollowerNotificationResponse = async (response: string) => {
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
