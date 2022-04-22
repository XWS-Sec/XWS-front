const CountInfoSection = (props: {
  postsCount: number;
  followersCount: number;
  followingCount: number;
  toggleFollowersPopup: () => void;
  toggleFollowingPopup: () => void;
}) => {
  const formatCountText = (ammount: number): string => {
    var length = ammount.toString().length;
    if (length < 5) {
      return ammount.toString();
    } else if (length < 7) {
      return (ammount / 1000).toFixed(1) + 'K';
    } else if (length < 10) {
      return (ammount / 1000000).toFixed(1) + 'M';
    } else {
      return (ammount / 1000000000).toFixed(1) + 'B';
    }
  };

  return (
    <div className='flex my-2 justify-center md:justify-start text-sm'>
      <p className='text-center p-1 mr-1'>
        <span className='font-bold'>{formatCountText(props.postsCount)}</span>{' '}
        posts
      </p>
      <p
        className='text-center p-1 mr-1 cursor-pointer'
        onClick={props.toggleFollowersPopup}
      >
        <span className='font-bold'>
          {formatCountText(props.followersCount)}
        </span>{' '}
        followers
      </p>
      <p
        className='text-center p-1 cursor-pointer'
        onClick={props.toggleFollowingPopup}
      >
        <span className='font-bold'>
          {formatCountText(props.followingCount)}
        </span>{' '}
        following
      </p>
    </div>
  );
};

export default CountInfoSection;
