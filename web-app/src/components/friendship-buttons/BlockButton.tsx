
import  { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import LoadingSpinner from '../common/LoadingSpinner';

const BlockButton = (props: { userId: string; onBlock: () => void }) => {

    const [fetching, setFetching] = useState(false);
    const navigate = useNavigate();
     const authContext = useContext(AuthContext);
    
    const block = async () => {
        setFetching(true);
        const response = await fetch(`/api/Follow/block/${props.userId}`, {
            method: 'POST',
          });

        switch (response.status) {
            case HttpStatusCode.OK:
              props.onBlock();
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
        <button className='bg-red-500 text-white font-bold rounded-lg w-24 h-8 p-0' onClick={block}>
            Block
        </button>
        )}
    </div>
    )
}

export default BlockButton