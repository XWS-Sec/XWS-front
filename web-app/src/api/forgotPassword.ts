export const forgotPassword = async (email: string) => {
	const url: string = `/api/Recovery?email=${email}`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response;
};
