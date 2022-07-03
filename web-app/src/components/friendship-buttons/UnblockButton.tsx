
import  { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import LoadingSpinner from '../common/LoadingSpinner';

const UnblockButton = (props: { userId: string; onUnblock: () => void }) => {
    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    const [fetching, setFetching] = useState(false);
    
    const unblock = async () => {
        setFetching(true);

        const response = await fetch(`/api/Follow/unblock/${props.userId}`, {
            method: 'POST',
          });

        switch (response.status) {
            case HttpStatusCode.OK:
              props.onUnblock();
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
    }
    
    return (
        <div className='flex items-center justify-center w-24 h-8 ml-1'>
        {fetching ? (
        <div>
            <LoadingSpinner />
        </div>
        ) : (
        <button className='btnWhiteGreen w-24 h-8' onClick={unblock}>
            Unblock
        </button>
        )}
    </div>
    )
}

export default UnblockButton