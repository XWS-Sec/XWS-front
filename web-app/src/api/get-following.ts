export const getFollowRequest = () => {
  const url = '/api/Follow';
  return fetch(url);
};
