import { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupRequest } from '../api/signup';
import ErrorLabel from '../components/common/ErrorLabel';
import InputWithLabel from '../components/common/InputWithLabel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthContext, { User } from '../context/auth-context';
import CreateUserDto from '../dtos/create-user.dto';
import { Gender } from '../model/enums/gender.enum';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import localStorageUtil from '../utils/local-storage/local-storage.util';
import SignupValidation from '../utils/signup-validation';

const SignupPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const signupValidation = new SignupValidation();

  // SignupValidation.validateEmail(value: string) and SignupValidation.validateUsername(value: string) use debounce, so we need refs
  const validateEmailRef = useRef((value: string) =>
    signupValidation.validateEmail(value)
  );
  const validateUsernameRef = useRef((value: string) =>
    signupValidation.validateUsername(value)
  );
  const [fetching, setFetching] = useState(false);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('01/01/1990');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [profileDescription, setProfileDescription] = useState('');
  const [gender, setGender] = useState(Gender.MALE);

  const [emailErrorText, setEmailErrorText] = useState('');
  const [usernameErrorText, setUsernameErrorText] = useState('');
  const [nameErrorText, setNameErrorText] = useState('');
  const [surnameErrorText, setSurnameErrorText] = useState('');
  const [dateOfBirthErrorText, setDateOfBirthErrorText] = useState('');
  const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');
  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
  const [errorLabelText, setErrorText] = useState('');

  const emailChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setEmail(value);
    setEmailErrorText('');

    if (!value) {
      return;
    }

    try {
      await validateEmailRef.current(value);
    } catch (error: any) {
      setEmailErrorText(error.message);
    }
  };

  const usernameChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setUsername(value);
    setUsernameErrorText('');

    if (!value) {
      return;
    }

    try {
      await validateUsernameRef.current(value);
    } catch (error: any) {
      setUsernameErrorText(error.message);
    }
  };

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setName(value);
    setNameErrorText('');

    if (!value) {
      return;
    }

    try {
      signupValidation.validateName(value);
      setNameErrorText('');
    } catch (error: any) {
      setNameErrorText(error.message);
    }
  };

  const surnameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSurname(value);
    setSurnameErrorText('');

    if (!value) {
      return;
    }

    try {
      signupValidation.validateSurname(value);
    } catch (error: any) {
      setSurnameErrorText(error.message);
    }
  };

  const dateOfBirthChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDateOfBirth(value);
    setDateOfBirthErrorText('');

    if (!value) {
      return;
    }

    try {
      signupValidation.validateDateOfBirth(value);
    } catch (error: any) {
      setDateOfBirthErrorText(error.message);
    }
  };

  const genderChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const valueStr = event.target.value;
    setGender(valueStr as Gender);
  };

  const phoneNumberChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPhoneNumber(value);
    setPhoneNumberErrorText('');

    if (!value) {
      return;
    }

    try {
      signupValidation.validatePhoneNumber(value);
    } catch (error: any) {
      setPhoneNumberErrorText(error.message);
    }
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPassword(value);
    setPasswordErrorText('');

    if (!value) {
      return;
    }

    try {
      signupValidation.validatePassword(value);
    } catch (error: any) {
      setPasswordErrorText(error.message);
    }
  };

  const confirmPasswordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setConfirmPassword(value);

    if (!value) {
      return;
    }

    try {
      signupValidation.validateConfirmPassword(value, password);
      setConfirmPasswordErrorText('');
    } catch (error: any) {
      setConfirmPasswordErrorText(error.message);
    }
  };

  const isPrivateChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsPrivate(event.target.value === 'private');
  };

  const profileDescriptionChangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProfileDescription(event.target.value);
  };

  const isInputValid = () => {
    return (
      email &&
      !emailErrorText &&
      username &&
      !usernameErrorText &&
      name &&
      !nameErrorText &&
      surname &&
      !surnameErrorText &&
      dateOfBirth &&
      !dateOfBirthErrorText &&
      phoneNumber &&
      !phoneNumberErrorText &&
      password &&
      !passwordErrorText &&
      confirmPassword &&
      !confirmPasswordErrorText
    );
  };

  const createAccount = async () => {
    if (isInputValid()) {
      setErrorText('');
      const createUserDto: CreateUserDto = {
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        name: name,
        surname: surname,
        dateOfBirth: dateOfBirth,
        gender: gender,
        phoneNumber: phoneNumber,
        isPrivate: isPrivate,
        // profileDescription: profileDescription,
      };
      await register(createUserDto);
    } else {
      setErrorText('Please fill out required fields correctly.');
    }
  };

  const register = async (createUserDto: CreateUserDto) => {
    setFetching(true);

    const response = await signupRequest(createUserDto);

    switch (response.status) {
      case HttpStatusCode.OK:
        setErrorText('');
        navigate('/emailVerification');
        break;
      case HttpStatusCode.BAD_REQUEST:
        setErrorText('Bad request.');
        break;
      default:
        setErrorText('Unknown error occurred.');
        break;
    }

    setFetching(false);
  };

  return (
    <div className='flex flex-col items-center md:h-screen bg-gray-200 overflow-y-auto'>
      <div className='flex flex-col text-lg bg-white rounded my-3 lg:my-8 mx-3 p-8 shadow-lg md:w-500px'>
        <InputWithLabel
          type='text'
          text='Email:'
          name='email'
          placeholder='email'
          onChange={emailChangeHandler}
        />
        <ErrorLabel text={emailErrorText} />

        <InputWithLabel
          type='text'
          text='Username:'
          name='username'
          placeholder='username'
          onChange={usernameChangeHandler}
        />
        <ErrorLabel text={usernameErrorText} />

        <InputWithLabel
          type='text'
          text='First name:'
          name='name'
          placeholder='first name'
          onChange={nameChangeHandler}
        />
        <ErrorLabel text={nameErrorText} />

        <InputWithLabel
          type='text'
          text='Surname'
          name='surname'
          placeholder='surname'
          onChange={surnameChangeHandler}
        />
        <ErrorLabel text={surnameErrorText} />

        <div className='flex flex-wrap items-center'>
          <p className='my-1 w-44 whitespace-nowrap'>Date of birth:</p>
          <input
            className='input p-1'
            type='date'
            onChange={dateOfBirthChangeHandler}
            defaultValue='1990-01-01'
            max='2010-12-31'
          />
        </div>
        <ErrorLabel text={dateOfBirthErrorText} />

        <div className='flex flex-wrap items-center mb-2'>
          <p className='my-1 w-44 whitespace-nowrap'>Gender:</p>
          <select className='input p-1' onChange={genderChangeHandler}>
            <option value='Male'>male</option>
            <option value='Female'>female</option>
            <option value='Other'>other</option>
          </select>
        </div>

        <InputWithLabel
          type='text'
          text='Phone number:'
          name='phoneNumber'
          placeholder='phone number'
          onChange={phoneNumberChangeHandler}
        />
        <ErrorLabel text={phoneNumberErrorText} />

        <InputWithLabel
          type='password'
          text='Password:'
          name='password'
          placeholder='password'
          onChange={passwordChangeHandler}
        />
        <ErrorLabel text={passwordErrorText} />

        <InputWithLabel
          type='password'
          text='Confirm password:'
          name='confirmPassword'
          placeholder='confirm password'
          onChange={confirmPasswordChangeHandler}
        />
        <ErrorLabel text={confirmPasswordErrorText} />

        <div className='flex flex-wrap items-center mb-6'>
          <p className='my-1 w-44 whitespace-nowrap'>Make my profile:</p>
          <select className='input p-1' onChange={isPrivateChangeHandler}>
            <option value='public'>public</option>
            <option value='private'>private</option>
          </select>
        </div>

        {/* <div className='flex flex-wrap items-center mb-3'>
          <p className='my-1'>About me:</p>
          <p className='ml-2 text-gray-500'>(optional)</p>
          <textarea
            className='input p-1 resize-none w-full h-40'
            maxLength={150}
            placeholder='Say something about yourself'
            onChange={profileDescriptionChangeHandler}
          />
        </div> */}

        {fetching ? (
          <div className='flex justify-center pt-3'>
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <ErrorLabel text={errorLabelText} />
            <div className='flex my-2'>
              <button className='btnGreenWhite w-full' onClick={createAccount}>
                Create account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
