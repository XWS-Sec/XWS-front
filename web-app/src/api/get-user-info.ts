export const getUserInfo = (username: string) => {
  const url = `/api/SearchUser/username/${username}`;
  return fetch(url);
};
