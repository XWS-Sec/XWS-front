import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { User } from '../context/auth-context';
import localStorageUtil from '../utils/local-storage/local-storage-util';

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const fakeLogin = () => {
    const user: User = {
      accessToken: 'fake.access_token.123',
      loggedIn: true,
      id: 1,
      username: 'fake_user',
    };

    localStorageUtil.setUser(user);
    authContext.updateAuthContext(user);
    navigate('');
  };

  const logIn = () => {
    fakeLogin();
    //TODO: implement real login
  };

  return (
    <div>
      <p>login</p>
      <button className='btnGreenWhite' onClick={logIn}>
        Log in
      </button>
    </div>
  );
};

export default LoginPage;
