import { useState } from 'react';
import { changePasswordRequest } from '../../api/changePassword';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

const ChangePasswordForm = (props: { changeState: (value: string) => void; email: string; triggerMessage: (message: string) => void }) => {
	const { changeState, email, triggerMessage } = props;

	const [token, setToken] = useState('');
	const [password, setPassword] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [errorText, setErrorText] = useState('');
	const [fetching, setFetching] = useState(false);

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
				<input className='input p-1 mb-2 md:text-lg' type='text' placeholder='Enter token here...' name='token' onChange={tokenChangeHandler} onKeyDown={onInputKeyDown} />
				<input className='input p-1 md:text-lg' type='newPassword' placeholder='Password' onChange={passwordChangeHandler} onKeyDown={onInputKeyDown} />
				<input className='input p-1 md:text-lg' type='repeatedPassword' placeholder='Confirm password' onChange={confirmedPasswordChangeHandler} onKeyDown={onInputKeyDown} />
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
					<button className='btnGreenWhite my-2' onClick={changePassword}>
						Change password
					</button>
				</div>
			)}
		</div>
	);
};

export default ChangePasswordForm;
