import LoadingSpinner from '../../components/common/LoadingSpinner';

const UserIsPrivateSection = (props: { username: string }) => {
  return (
    <div className='flex flex-col flex-grow items-center pt-10 bg-gray-300'>
      {props.username ? (
        <div className='flex flex-col items-center bg-gray-100 md:w-500px p-3 rounded-xl'>
          <p className='text-lg mb-2'>
            {props.username + "'s"} account is private.
          </p>
          Follow {props.username} to see more.
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default UserIsPrivateSection;
