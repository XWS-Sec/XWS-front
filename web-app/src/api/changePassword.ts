export const recoverPasswordRequest = async (data: { token: string; newPassword: string; newConfirmPassword: string; email: string }) => {
	const url: string = '/api/Recovery/ResetPassword';

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	return response;
};

export const changePasswordRequest = async (data: { currentPassword: string; newPassword: string; confirmNewPasword: string }) => {
	const url: string = '/api/User/password';

	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	return response;
};

export const sendMessage = async (data: any) => {
	const url: string = '/api/Chat';

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	return response;
};
