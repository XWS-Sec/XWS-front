export const getFollowing = () => {
  const url = '/api/Follow';
  return fetch(url);
};
