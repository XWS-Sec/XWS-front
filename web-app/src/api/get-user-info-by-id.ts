export const getUserInfoById = (id: string) => {
  const url = `/api/SearchUser/id/${id}`;
  return fetch(url);
};
