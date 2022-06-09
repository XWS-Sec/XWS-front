const UserDoesNotExist = (props: { username?: string }) => {
  return <div>{`User with username ${props.username} does not exist.`}</div>;
};

export default UserDoesNotExist;
