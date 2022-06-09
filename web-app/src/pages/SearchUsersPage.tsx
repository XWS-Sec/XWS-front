import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchUsersRequest } from '../api/search-users';
import LoadingSpinner from '../components/common/LoadingSpinner';
import UserListItem from '../components/user-list/UserListItem';
import AuthContext, { unsignedUser } from '../context/auth-context';
import UserInfoDto from '../dtos/user-info.dto';
import { HttpStatusCode } from '../utils/http-status-code.enum';

const SearchUsersPage = (props: {
  nameInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const location = useLocation();

  const [users, setUsers] = useState<UserInfoDto[]>();
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      const query: URLSearchParams = new URLSearchParams(
        location.search.substring(1) // substring-ing to remove '?'
      );

      const criteria = query.get('criteria')!.toString();

      setFetching(true);

      const response = await searchUsersRequest(criteria);

      switch (response.status) {
        case HttpStatusCode.OK:
          const users = await response.json();
          setUsers(users);
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

    fetchResults();

    return () => {
      if (props.nameInputRef.current) {
        props.nameInputRef.current!.value = '';
      }
    };
  }, [location]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='flex flex-col flex-grow items-center bg-gray-300 overflow-y-scroll'>
      <div className='w-full md:w-614px m-5 bg-white pb-3'>
        {users &&
          users.map((user) => <UserListItem key={user.Id} user={user} />)}
        {!users?.length && (
          <div className='w-full text-center pt-3'>No results found</div>
        )}
        {fetching && (
          <div className='flex items-center justify-center h-8 my-4'>
            <div className='flex justify-center'>
              <LoadingSpinner />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchUsersPage;
