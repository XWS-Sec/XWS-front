export const changePasswordRequest = async (data: { token: string; newPassword: string; newConfirmPassword: string; email: string }) => {
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
