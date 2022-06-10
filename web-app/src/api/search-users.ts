export const searchUsersRequest = (criteria: string) => {
  const url = `/api/SearchUser?criteria=${criteria}`;
  return fetch(url);
};
