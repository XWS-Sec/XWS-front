export const getUserInfoByUsername = (username: string) => {
  const url = `/api/SearchUser/username/${username}`;
  return fetch(url);
};
