import CreateUserDto from '../dtos/create-user.dto';

export const signupRequest = async (createUserDto: any) => {
	const url: string = '/api/register';

	const body = new FormData();
	Object.entries(createUserDto).forEach((entry) => {
		body.append(entry[0], entry[1] + '');
	});

	const response = await fetch(url, {
		method: 'POST',
		body: body,
	});

	return response;
};
