import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import LoadingSpinner from '../common/LoadingSpinner';

const UnfollowButton = (props: { userId: string; onUnfollow: () => void }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [fetching, setFetching] = useState(false);

  const unfollow = async () => {
    setFetching(true);

    const response = await fetch(`/api/Follow/${props.userId}`, {
      method: 'DELETE',
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        props.onUnfollow();
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
    <div className='flex items-center justify-center w-24 h-8'>
      {fetching ? (
        <div>
          <LoadingSpinner />
        </div>
      ) : (
        <button className='btnWhiteGreen w-24 h-8' onClick={unfollow}>
          Unfollow
        </button>
      )}
    </div>
  );
};

export default UnfollowButton;
