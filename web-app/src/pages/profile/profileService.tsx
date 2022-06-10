import axios, { AxiosRequestConfig } from 'axios';

export interface httpResponse {
	status: number;
	data?: any;
	message?: any;
}

export const getUserInfoAsync = async (): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/user`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const getUserPictureAsync = async (id: string): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/userPicture/${id}`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const removeImageAsync = async (): Promise<httpResponse> => {
	const options: any = {
		method: 'DELETE',
		url: `/api/userPicture`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const updateUserInfoAsync = async (data: any): Promise<httpResponse> => {
	const options: any = {
		method: 'PUT',
		url: `/api/user`,
		data: data,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const uploadImageAsync = async (file: any) => {
	const token = await localStorage.getItem('accessToken');
	const bodyFormData = new FormData();
	bodyFormData.append('picture', file);
	const options: AxiosRequestConfig = {
		method: 'POST',
		url: `/api/UserPicture`,
		data: bodyFormData,
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'multipart/form-data',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const updateSkillsAsync = async (data: any): Promise<httpResponse> => {
	const options: any = {
		method: 'POST',
		url: `/api/skill`,
		data: data,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const updateInterestsAsync = async (data: any): Promise<httpResponse> => {
	const options: any = {
		method: 'POST',
		url: `/api/interest`,
		data: data,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};

export const getUserSkillsAsync = async (): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/skill`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
export const getUserInterestsAsync = async (): Promise<httpResponse> => {
	const options: any = {
		method: 'GET',
		url: `/api/interest`,
		headers: {
			Accept: 'application/json',
			'Content-type': 'application/json',
		},
	};

	return axios(options)
		.then((response) => {
			return { status: response?.status, data: response?.data };
		})
		.catch((error) => {
			return {
				status: error?.response?.status,
				message: error?.response?.data,
			};
		});
};
