import { useState } from 'react';
import { forgotPassword } from '../../api/forgotPassword';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

const ForgotPassword = (props: { changeState: (value: string) => void; passEmail: (email: string) => void }) => {
	const { changeState, passEmail } = props;

	const [email, setEmail] = useState('');
	const [errorText, setErrorText] = useState('');
	const [fetching, setFetching] = useState(false);

	const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const resetPassword = async () => {
		setFetching(true);

		const response = await forgotPassword(email);

		switch (response.status) {
			case HttpStatusCode.OK:
				setErrorText('');
				passEmail(email);
				changeState('changePassword');
				// setSuccessText('Check your email');
				break;
			default:
				alert('Unknown error occured');
				break;
		}

		setFetching(false);
	};

	return (
		<div className='flex flex-col items-center mb-3'>
			<div className='flex flex-row'>
				<span
					onClick={() => {
						changeState('login');
					}}
					className='cursor-pointer'
				>
					Back
				</span>
				<h2 className='mx-7 text-xl'>Forgot password</h2>
				<span className='opacity-0'>Back</span>
			</div>
			<div className='flex flex-col items-center mb-3 mt-4'>
				<input className='input p-1 mb-2 md:text-lg' type='text' placeholder='Enter email...' name='email' onChange={emailChangeHandler} />
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

					<button className='btnGreenWhite my-2' onClick={resetPassword}>
						Request new password
					</button>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;
