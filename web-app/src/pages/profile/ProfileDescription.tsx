import UserInfoDto from '../../dtos/user-info.dto';

const ProfileDescription = (props: { user: UserInfoDto }) => {
  return (
    <div className='pl-1 text-center md:text-left'>
      <p className='mb-1'>{props.user.name + ' ' + props.user.surname}</p>
      <p className='text-sm break-words'>{props.user.profileDescription}</p>
    </div>
  );
};

export default ProfileDescription;
