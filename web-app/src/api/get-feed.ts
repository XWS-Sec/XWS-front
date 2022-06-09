export const getFeedRequest = async (page: number) => {
  const url = `/api/Post/${page}`;
  return fetch(url);
};
