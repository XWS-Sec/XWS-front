import React, { useRef, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import SignupValidation from '../utils/signup-validation';
import { passwordlessLogin } from '../api/passwordless-login';
import { HttpStatusCode } from '../utils/http-status-code.enum';

const PasswordlessLogin = () => {
  const navigate = useNavigate();
  const signupValidation = new SignupValidation();

  const [errorText, setErrorText] = useState('');
  const [fetching, setFetching] = useState(false);
  const [email, setEmail] = useState('');

  const signUp = () => {
    navigate('/signup');
  };

  const standardLogIn = () => {
    navigate('/');
  };

  const validateEmailRef = useRef((value: string) =>
    signupValidation.validateEmail(value)
  );

  const emailChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const email = event.target.value;
    setErrorText('');
    try {
      await validateEmailRef.current(email);
    } catch (error: any) {
      setErrorText(error.message);
    }
    setEmail(email);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      logIn();
    }
  };

  const logIn = async () => {
    setFetching(true);

    const response = await passwordlessLogin(email);
    if (response.status == HttpStatusCode.OK)
      navigate('/passwordlessEmailSentPage');
    else if (response.status == HttpStatusCode.BAD_REQUEST)
      setErrorText('Bad request!');
    else alert('Unknown error!');

    setFetching(false);
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
            placeholder='email'
            name='email'
            onChange={emailChangeHandler}
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
            <button className='btnWhiteGreen mb-2' onClick={standardLogIn}>
              Log in via username
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

export default PasswordlessLogin;
