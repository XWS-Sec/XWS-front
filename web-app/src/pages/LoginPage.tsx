import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthContext, { User } from '../context/auth-context';
import localStorageUtil from '../utils/local-storage/local-storage-util';
import { sleep } from '../utils/sleep';

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [fetching, setFetching] = useState(false);

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const fakeLogin = async () => {
    setFetching(true);
    await sleep(1000);
    setFetching(false);

    if (username === 'fake_user' && password === 'fakepass123') {
      const user: User = {
        accessToken: 'fake.access_token.123',
        loggedIn: true,
        id: 1,
        username: 'fake_user',
      };

      localStorageUtil.setUser(user);
      authContext.updateAuthContext(user);
      navigate('');
    } else {
      setErrorText('Invalid credentials!');
    }
  };

  const logIn = () => {
    fakeLogin();
    //TODO: implement real login
  };

  const signUp = () => {
    navigate('signup');
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      logIn();
    }
  };

  return (
    <div>
      <h1 className='text-green-600 text-4xl text-center font-bold mt-20 mb-8'>
        Welcome to Dislinkt
      </h1>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col items-center mb-3'>
          <input
            className='input mb-2 md:text-lg'
            type='text'
            placeholder='username'
            name='username'
            onChange={usernameChangeHandler}
            onKeyDown={onInputKeyDown}
          />
          <input
            className='input md:text-lg'
            type='password'
            placeholder='password'
            onChange={passwordChangeHandler}
            onKeyDown={onInputKeyDown}
          />
        </div>
        {fetching ? (
          <div className='mt-4'>
            <LoadingSpinner />
          </div>
        ) : (
          <div className='flex flex-col w-80 px-16 md:px-0 text-lg'>
            <p className='text-red-600 text-center text' hidden={!errorText}>
              {errorText}
            </p>
            <button className='btnGreenWhite my-2' onClick={logIn}>
              Log in
            </button>
            <button className='btnWhiteGreen' onClick={signUp}>
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
