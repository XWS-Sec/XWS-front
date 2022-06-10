import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupRequest } from '../../api/signup';
import ErrorLabel from '../../components/common/ErrorLabel';
import InputWithLabel from '../../components/common/InputWithLabel';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import SuccessLabel from '../../components/common/SuccessLabel';
import UserImage from '../../components/common/UserImage';
import FriendshipButtonsSection from '../../components/friendship-buttons/FriendshipButtonsSection';
import { UserListPopupType } from '../../components/user-list/user-list-popup-type.enum';
import UserListPopup from '../../components/user-list/UserListPopup';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import CreateUserDto from '../../dtos/create-user.dto';
import UserInfoDto from '../../dtos/user-info.dto';
import { Gender } from '../../model/enums/gender.enum';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import SignupValidation from '../../utils/signup-validation';
import CountInfoSection from './CountInfoSection';
import { ProfilePicture } from './profile-picture/ProfilePicture';
import ProfileDescription from './ProfileDescription';
import { updateUserInfoAsync } from './profileService';

const EditProfileInfo = (props: { user: any; setUser: Dispatch<SetStateAction<UserInfoDto | undefined>> }) => {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const signupValidation = new SignupValidation();

	const { user } = props;

	// SignupValidation.validateEmail(value: string) and SignupValidation.validateUsername(value: string) use debounce, so we need refs
	const validateEmailRef = useRef((value: string) => signupValidation.validateEmail(value));
	const validateUsernameRef = useRef((value: string) => signupValidation.validateUsername(value));
	const [fetching, setFetching] = useState(false);

	const [email, setEmail] = useState(user.email);
	const [username, setUsername] = useState(user.userName);
	const [name, setName] = useState(user.name);
	const [surname, setSurname] = useState(user.surname);

	const [biography, setBiography] = useState(user.biography);
	const date = !!user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '2022-10-10';

	const [dateOfBirth, setDateOfBirth] = useState(date);
	const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);

	const [isPrivate, setIsPrivate] = useState(user.isPrivate);

	const [gender, setGender] = useState(user.gender);

	const [emailErrorText, setEmailErrorText] = useState('');
	const [usernameErrorText, setUsernameErrorText] = useState('');
	const [nameErrorText, setNameErrorText] = useState('');
	const [surnameErrorText, setSurnameErrorText] = useState('');
	const [dateOfBirthErrorText, setDateOfBirthErrorText] = useState('');
	const [phoneNumberErrorText, setPhoneNumberErrorText] = useState('');
	const [passwordErrorText, setPasswordErrorText] = useState('');
	const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState('');
	const [errorLabelText, setErrorText] = useState('');
	const [successLabelText, setSuccessText] = useState('');

	const emailChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

	const usernameChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
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

	const dateOfBirthChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		console.log(value);

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
		console.log(valueStr as Gender);
	};

	const phoneNumberChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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

	const isPrivateChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setIsPrivate(event.target.value === 'private');
	};
	const biographyChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setBiography(event.target.value);
	};

	const isInputValid = () => {
		return email && !emailErrorText && username && !usernameErrorText && name && !nameErrorText && surname && !surnameErrorText && dateOfBirth && !dateOfBirthErrorText && phoneNumber && !phoneNumberErrorText && !passwordErrorText && !confirmPasswordErrorText;
	};

	const createAccount = async () => {
		if (isInputValid()) {
			setErrorText('');
			const createUserDto: any = {
				// email: email,
				// username: username,
				name: name,
				surname: surname,
				dateOfBirth: dateOfBirth,
				gender: gender,
				phoneNumber: phoneNumber,
				isPrivate: isPrivate,
				biography: biography,
				// profileDescription: profileDescription,
			};
			await updateData(createUserDto);
		} else {
			setErrorText('Please fill out required fields correctly.');
		}
	};

	const updateData = async (createUserDto: CreateUserDto) => {
		setFetching(true);
		console.log(createUserDto);
		// return;

		const response = await updateUserInfoAsync(createUserDto);

		switch (response.status) {
			case HttpStatusCode.OK:
				setErrorText('');
				setSuccessText('Data has been changed!');
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
	// console.log(user);

	return (
		<div className='flex flex-col items-center md:h-screen bg-gray-200 overflow-y-auto'>
			<div className='flex flex-col text-lg bg-white rounded my-3 lg:my-8 mx-3 p-8 shadow-lg md:w-500px'>
				<h1 className='text-2xl font-bold text-center mb-4'>Edit user data</h1>
				<InputWithLabel type='text' text='Email:' value={email} name='email' placeholder='email' onChange={emailChangeHandler} disabled />
				<ErrorLabel text={emailErrorText} />

				<InputWithLabel type='text' text='Username:' value={username} name='username' placeholder='username' onChange={usernameChangeHandler} disabled />
				<ErrorLabel text={usernameErrorText} />

				<InputWithLabel type='text' text='First name:' name='name' value={name} placeholder='first name' onChange={nameChangeHandler} />
				<ErrorLabel text={nameErrorText} />

				<InputWithLabel type='text' text='Surname' name='surname' value={surname} placeholder='surname' onChange={surnameChangeHandler} />
				<ErrorLabel text={surnameErrorText} />

				<div className='flex flex-wrap items-center'>
					<p className='my-1 w-44 whitespace-nowrap'>Date of birth:</p>
					<input className='input p-1' type='date' onChange={dateOfBirthChangeHandler} value={dateOfBirth} max='2030-12-31' />
				</div>
				<ErrorLabel text={dateOfBirthErrorText} />

				<div className='flex flex-wrap items-center mb-2'>
					<p className='my-1 w-44 whitespace-nowrap'>Gender:</p>
					<select className='input p-1' onChange={genderChangeHandler} value={gender}>
						<option value='Male'>male</option>
						<option value='Female'>female</option>
						<option value='Other'>other</option>
					</select>
				</div>

				<InputWithLabel type='text' text='Phone number:' value={phoneNumber} name='phoneNumber' placeholder='phone number' onChange={phoneNumberChangeHandler} />
				<ErrorLabel text={phoneNumberErrorText} />

				<div className='flex flex-wrap items-center mb-6'>
					<p className='my-1 w-44 whitespace-nowrap'>Make my profile:</p>
					<select className='input p-1' onChange={isPrivateChangeHandler} value={isPrivate}>
						<option value='public'>public</option>
						<option value='private'>private</option>
					</select>
				</div>
				<div className='flex flex-wrap items-center mb-6'>
					<p className='my-1 w-44 whitespace-nowrap'>Biography:</p>
					<textarea value={biography} className='input flex-grow md:w-60 md:text-lg' onChange={biographyChangeHandler} />
				</div>

				{fetching ? (
					<div className='flex justify-center pt-3'>
						<LoadingSpinner />
					</div>
				) : (
					<div>
						<ErrorLabel text={errorLabelText} />
						<SuccessLabel text={successLabelText} />
						<div className='flex my-2'>
							<button className='btnGreenWhite w-full' onClick={createAccount}>
								Update account
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EditProfileInfo;
