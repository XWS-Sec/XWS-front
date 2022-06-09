import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import UserImage from '../../components/common/UserImage';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

const FollowRequestItem = (props: { followRequest: any }) => {
  const sender = props.followRequest;

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [fetching, setFetching] = useState(false);
  const [acceptedLabelVisible, setAcceptedLabelVisible] = useState(false);
  const [declinedLabelVisible, setDeclinedLabelVisible] = useState(false);

  const accept = () => {
    setFetching(true);

    fetch(`/api/Follow/${sender.Id}/true`, {
      method: 'PUT',
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          setAcceptedLabelVisible(true);
          break;
        case HttpStatusCode.UNAUTHORIZED:
          localStorage.clear();
          navigate('/');
          authContext.updateAuthContext(unsignedUser);
          break;
        default:
          alert('Unknown error occurred.');
      }
    });

    setFetching(false);
  };

  const decline = () => {
    setFetching(true);

    fetch(`/api/Follow/${sender.Id}/false`, {
      method: 'PUT',
    }).then((response) => {
      switch (response.status) {
        case HttpStatusCode.OK:
          setDeclinedLabelVisible(true);
          break;
        case HttpStatusCode.UNAUTHORIZED:
          localStorage.clear();
          navigate('/');
          authContext.updateAuthContext(unsignedUser);
          break;
        default:
          alert('Unknown error occurred.');
      }
    });

    setFetching(false);
  };

  return (
    <div className='flex md:flex-row flex-col px-4 py-3 mb-4 md:w-500px w-full items-center justify-between bg-white rounded shadow-lg'>
      <div className='flex mb-3 md:mb-0 items-center'>
        <Link to={`/users/${sender.Username}`}>
          <UserImage
            src={sender.profilePictureLocation}
            width={50}
            height={50}
          />
        </Link>
        <div className='flex flex-col ml-2 flex-grow min-w-0'>
          <Link to={`/users/${sender.Username}`}>
            <p className='font-bold truncate'>{sender.Username}</p>
          </Link>
          <p className='truncate'>{sender.Name + ' ' + sender.Surname}</p>
        </div>
      </div>
      {acceptedLabelVisible ? (
        <p className='text-green-600'>
          {sender.Username + ' is now following you'}
        </p>
      ) : declinedLabelVisible ? (
        <p className='text-green-600'>Follow request declined</p>
      ) : fetching ? (
        <LoadingSpinner />
      ) : (
        <div className='flex justify-end items-center'>
          <button className='btnGreenWhite' onClick={accept}>
            Accept
          </button>
          <button className='btnWhiteGreen ml-3' onClick={decline}>
            Decline
          </button>
        </div>
      )}
    </div>
  );
};

export default FollowRequestItem;
