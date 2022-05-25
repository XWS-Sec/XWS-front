import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePasswordRequest } from '../../api/changePassword';
import { forgotPassword } from '../../api/forgotPassword';
import { loginRequest } from '../../api/login';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AuthContext, { User } from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage/local-storage.util';

const ChangePasswordForm = (props: { changeState: (value: string) => void; email: string; triggerMessage: (message: string) => void }) => {
	const { changeState, email, triggerMessage } = props;
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const [token, setToken] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [errorText, setErrorText] = useState('');
	const [passwordChanged, setPasswordChanged] = useState(false);
	const [fetching, setFetching] = useState(false);
	const [loginState, setLoginState] = useState('login');

	const tokenChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setToken(event.target.value);
	};
	const confirmedPasswordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmedPassword(event.target.value);
	};

	const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	const changePassword = async () => {
		setFetching(true);

		const data = {
			token: token,
			email: email,
			newPassword: password,
			newConfirmPassword: confirmedPassword,
		};

		const response = await changePasswordRequest(data);

		switch (response.status) {
			case HttpStatusCode.OK:
				setErrorText('');
				triggerMessage('Your password has been changed!');
				changeState('login');
				break;
			default:
				alert('Unknown error occured');
				break;
		}

		setFetching(false);
	};

	const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			changePassword();
		}
	};

	return (
		<div className='flex flex-col items-center'>
			<div className='flex flex-col items-center mb-3'>
				<input className='input p-1 mb-2 md:text-lg' type='text' placeholder='Enter token here...' name='username' onChange={tokenChangeHandler} onKeyDown={onInputKeyDown} />
				<input className='input p-1 md:text-lg' type='password' placeholder='Password' onChange={passwordChangeHandler} onKeyDown={onInputKeyDown} />
				<input className='input p-1 md:text-lg' type='password' placeholder='Confirm password' onChange={confirmedPasswordChangeHandler} onKeyDown={onInputKeyDown} />
			</div>
			{fetching ? (
				<div className='mt-4'>
					<LoadingSpinner />
				</div>
			) : passwordChanged ? (
				<div className='flex flex-col w-80 px-16 md:px-0 text-lg'>
					<p className='text-green-600 text-center text' hidden={!errorText}>
						Your password has been changed!
					</p>
					<button
						className='btnGreenWhite my-2'
						onClick={() => {
							changeState('login');
						}}
					>
						Go to login
					</button>
				</div>
			) : (
				<div className='flex flex-col w-80 px-16 md:px-0 text-lg'>
					<p className='text-red-600 text-center text' hidden={!errorText}>
						{errorText}
					</p>
					<button className='btnGreenWhite my-2' onClick={changePassword}>
						Change password
					</button>
				</div>
			)}
		</div>
	);
};

export default ChangePasswordForm;
