import { useState } from 'react';
import MyRouter from './components/MyRouter';
import AuthContext, { User } from './context/auth-context';
import localStorageUtil from './utils/local-storage/local-storage.util';

function App() {
  const [user, setUser] = useState<User>(localStorageUtil.getUser());

  const updateAuthContext = (user: User) => {
    setUser(user);
  };

  return (
    <div className='flex flex-col h-screen'>
      <AuthContext.Provider
        value={{
          user: user,
          updateAuthContext: updateAuthContext,
        }}
      >
        <MyRouter loggedIn={user.loggedIn} />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
