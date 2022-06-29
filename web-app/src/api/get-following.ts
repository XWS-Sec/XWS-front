export const getFollowRequest = () => {
	const url = '/api/Follow';
	return fetch(url);
};

export const getMessages = (number: number, userId: string) => {
	const url = `/api/Chat/${number}/${userId}`;
	return fetch(url);
};
