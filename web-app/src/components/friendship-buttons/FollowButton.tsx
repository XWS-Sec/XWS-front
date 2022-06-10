import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import { unsignedUser } from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import LoadingSpinner from '../common/LoadingSpinner';

const FollowButton = (props: {
  userId: string;
  onFollow: (requested: boolean) => void;
}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [fetching, setFetching] = useState(false);

  const follow = async () => {
    setFetching(true);

    const response = await fetch(`/api/Follow/${props.userId}`, {
      method: 'POST',
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        const reply = await response.json();
        props.onFollow(reply.Message === 'Requested');
        break;
      case HttpStatusCode.UNAUTHORIZED:
        localStorage.clear();
        navigate('/');
        authContext.updateAuthContext(unsignedUser);
        break;
      default:
        alert('Unknown error occurred.');
    }

    setFetching(false);
  };

  return (
    <div className='flex items-center justify-center w-24 h-8 ml-1'>
      {fetching ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <button className='btnGreenWhite w-24 h-8 p-0' onClick={follow}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
