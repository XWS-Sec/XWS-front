export const getUsersPosts = (userId: string, page: number) => {
  const url = `/api/Post/${page}?specificUser=${userId}`;
  return fetch(url);
};
