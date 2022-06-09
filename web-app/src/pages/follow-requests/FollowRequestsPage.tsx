import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import FollowRequest from '../../model/FollowRequest';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import FollowRequestItem from './FollowRequestItem';
import { hardcodedFollowRequests } from '../../hardcoded-data/hardcoded-follow-requests';

const FollowRequests = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const [followRequests, setFollowRequests] = useState<any[]>();

  useEffect(() => {
    const fetchFollowRequests = async () => {
      const response = await fetch('/api/follow');

      switch (response.status) {
        case HttpStatusCode.OK:
          const message = await response.json();
          setFollowRequests(message.FollowRequests);
          break;
        case HttpStatusCode.UNAUTHORIZED:
          localStorage.clear();
          navigate('/');
          authContext.updateAuthContext(unsignedUser);
          break;
        default:
          alert('Unknown error occurred.');
      }
    };

    fetchFollowRequests();
  }, [navigate, authContext]);

  return (
    <div className='flex flex-grow flex-col items-center bg-gray-300 p-4 overflow-y-auto'>
      {followRequests ? (
        followRequests.map((followRequest) => (
          <FollowRequestItem
            key={followRequest.id}
            followRequest={followRequest}
          />
        ))
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default FollowRequests;
