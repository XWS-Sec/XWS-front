import React, { useRef, useState } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useNavigate } from 'react-router-dom';
import SignupValidation from '../utils/signup-validation';
import { passwordlessLogin } from '../api/passwordless-login';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import { changePasswordRequest } from '../api/changePassword';

const ChangePasswordPage = () => {
	const navigate = useNavigate();
	const signupValidation = new SignupValidation();

	const [errorText, setErrorText] = useState('');
	const [successText, setSuccessText] = useState('');
	const [fetching, setFetching] = useState(false);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmNewPasword, setConfirmNewPassword] = useState('');

	const currentPasswordChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentPassword(event.target.value);
	};
	const newPasswordChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(event.target.value);
	};
	const confirmPasswordChangeHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmNewPassword(event.target.value);
	};

	const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			changePassword();
		}
	};

	const changePassword = async () => {
		setFetching(true);

		const data = {
			currentPassword,
			newPassword,
			confirmNewPasword,
		};

		const response = await changePasswordRequest(data);
		if (response.status === HttpStatusCode.OK) {
			setSuccessText('Your password has been changed!');
			setConfirmNewPassword('');
			setCurrentPassword('');
			setNewPassword('');
		} else if (response.status === HttpStatusCode.BAD_REQUEST) setErrorText('Invalid password');
		else alert('Unknown error!');

		setFetching(false);
	};

	return (
		<div>
			<h1 className='text-green-600 text-2xl text-center font-bold mt-20 mb-8'>Change your password</h1>
			<div className='flex flex-col items-center'>
				<div className='flex flex-col items-center mb-3'>
					<input className='input p-1 mb-2 md:text-lg' type='password' placeholder='Old password' name='oldPassword' value={currentPassword} onChange={currentPasswordChangeHandler} onKeyDown={onInputKeyDown} />
					<input className='input p-1 mb-2 md:text-lg' type='password' placeholder='New password' name='newPassword' value={newPassword} onChange={newPasswordChangeHandler} onKeyDown={onInputKeyDown} />
					<input className='input p-1 mb-2 md:text-lg' type='password' placeholder='Repeat password' name='repeatNewPassword' value={confirmNewPasword} onChange={confirmPasswordChangeHandler} onKeyDown={onInputKeyDown} />
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
						<p className='text-green-600 text-center text' hidden={!successText}>
							{successText}
						</p>
						<button className='btnGreenWhite my-2' onClick={changePassword}>
							Change password
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChangePasswordPage;
