import { useState } from 'react';
import ChangePasswordForm from '../components/login/ChangePassword';
import ForgotPassword from '../components/login/ForgotPassword';
import LoginForm from '../components/login/LoginForm';

const LoginPage = () => {

	const [loginState, setLoginState] = useState('login');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const changeState = (state: string) => {
		setLoginState(state);
	};

	const triggerMessage = (message: string) => {
		setMessage(message);
		setTimeout(() => {
			setMessage('');
		}, 2000);
	};

	return (
		<div>
			<h1 className='text-green-600 text-4xl text-center font-bold mt-20 mb-8'>Welcome to Dislinkt</h1>
			<p className='text-green-600 text-center text' hidden={!message}>
				{message}
			</p>
			{loginState === 'login' && <LoginForm changeState={changeState} />}
			{loginState === 'forgotPassword' && <ForgotPassword changeState={changeState} passEmail={setEmail} />}
			{loginState === 'changePassword' && <ChangePasswordForm changeState={changeState} email={email} triggerMessage={triggerMessage} />}
		</div>
	);
};

export default LoginPage;
