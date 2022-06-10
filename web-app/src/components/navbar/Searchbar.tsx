import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Searchbar = (props: {
  nameInputRef: React.RefObject<HTMLInputElement>;
}) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onNameInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.nameInputRef.current!.blur();
      search();
    }
  };

  const search = () => {
    if (!name) {
      return;
    }

    const query = 'criteria=' + name;

    navigate({
      pathname: 'searchUsers',
      search: query,
    });
  };

  return (
    <div className='relative text-gray-600'>
      <input
        className='border-2 border-gray-300 bg-white h-10 px-3 pr-10 rounded-lg text-sm focus:outline-none lg:w-80 md:w-72'
        type='search'
        name='search'
        placeholder='Search'
        onChange={onInputChangeHandler}
        onKeyDown={onNameInputKeyDown}
        ref={props.nameInputRef}
      />
      <button
        type='submit'
        className='absolute right-0 top-0 mt-3 mr-4'
        onClick={search}
      >
        <svg
          className='text-gray-600 h-4 w-4 fill-current'
          version='1.1'
          id='Capa_1'
          x='0px'
          y='0px'
          viewBox='0 0 56.966 56.966'
          width='512px'
          height='512px'
        >
          <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
        </svg>
      </button>
    </div>
  );
};

export default Searchbar;
