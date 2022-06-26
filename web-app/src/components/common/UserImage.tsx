import { useEffect, useState } from 'react';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import defaultUserImage from './../../images/default-user-image.png';

const UserImage = (props: {
  userId: string;
  width: number;
  height: number;
}) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(`/api/UserPicture/${props.userId}`);

      switch (response.status) {
        case HttpStatusCode.OK:
          setImage(`/api/UserPicture/${props.userId}`);
          break;
        default:
      }
    };

    fetchImage();
  }, []);

  return (
    <img
      className='rounded-full border-2'
      src={image ? image : defaultUserImage}
      alt=''
      width={props.width}
      height={props.height}
    />
  );
};

export default UserImage;
