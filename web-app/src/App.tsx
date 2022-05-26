import { useState } from 'react';
import { RBACProvider } from 'react-simple-rbac';
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
        <RBACProvider roles={[user.role]}>
          <MyRouter loggedIn={user.loggedIn} />
        </RBACProvider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
