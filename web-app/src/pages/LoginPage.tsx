import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/login';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthContext, { User } from '../context/auth-context';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import localStorageUtil from '../utils/local-storage/local-storage.util';

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

  const logIn = async () => {
    setFetching(true);

    const response = await loginRequest(username, password);

    switch (response.status) {
      case HttpStatusCode.OK:
        setErrorText('');

        const user = await response.json();
        user.loggedIn = true;

        localStorageUtil.setUser(user);
        authContext.updateAuthContext(user);
        navigate('');
        break;
      case HttpStatusCode.UNAUTHORIZED:
        setErrorText('Invalid credentials.');
        break;
      default:
        alert('Unknown error occured');
        break;
    }

    setFetching(false);
  };

  const signUp = () => {
    navigate('signup');
  };

  const passwordlessLogin = () => {
    navigate('passwordlessLogin');
  }

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
            className='input p-1 mb-2 md:text-lg'
            type='text'
            placeholder='username'
            name='username'
            onChange={usernameChangeHandler}
            onKeyDown={onInputKeyDown}
          />
          <input
            className='input p-1 md:text-lg'
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
            <button className='btnWhiteGreen mb-2' onClick={passwordlessLogin}>
              Log in passwordless
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
