export const loginRequest = async (username: string, password: string) => {
  const url: string = '/api/login';
  const data = { username: username, password: password };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
};
