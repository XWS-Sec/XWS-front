import defaultUserImage from './../../images/default-user-image.png';

const UserImage = (props: {
  src: string | undefined;
  width: number;
  height: number;
}) => {
  return (
    <img
      className='rounded-full border-2'
      src={props.src ? props.src : defaultUserImage}
      alt=''
      width={props.width}
      height={props.height}
    />
  );
};

export default UserImage;
