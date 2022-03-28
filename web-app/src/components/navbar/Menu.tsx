import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import localStorageUtil from '../../utils/local-storage/local-storage-util';
import MenuToggleButton from './MenuToggleButton';
import './navbar-menu-animation.css';

const Menu = (props: { toggleMenu: () => void }) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const renderMenuLinks = () => {
    const menuLinks = [
      { text: 'Home', pathname: '/' },
      { text: 'Profile', pathname: `users/${authContext.user.username}` },
    ];

    return menuLinks.map((menuLink) => (
      <Link
        key={menuLink.pathname}
        to={menuLink.pathname}
        onClick={props.toggleMenu}
      >
        <div className='w-full px-3 py-2 border-gray-100 border-b-2 text-center hover:bg-gray-100'>
          {menuLink.text}
        </div>
      </Link>
    ));
  };

  const signOut = () => {
    localStorageUtil.setUser(unsignedUser);
    authContext.updateAuthContext(unsignedUser);
    navigate('');
    props.toggleMenu();
  };

  return (
    <div className='flex flex-row absolute top-0 w-screen navbar-menu-animation'>
      <div
        className='bg-black opacity-70 flex-grow'
        onClick={props.toggleMenu}
      ></div>
      <div className='w-56 md:w-72 h-screen bg-white'>
        <div className='flex flex-row items-center justify-end bg-green-600 pr-4 text-white py-1'>
          <MenuToggleButton toggleMenu={props.toggleMenu} />
        </div>
        {renderMenuLinks()}
        <button className='w-full' onClick={signOut}>
          <div className='px-3 py-2 border-gray-100 border-b-2 text-center hover:bg-gray-100'>
            Sign out
          </div>
        </button>
      </div>
    </div>
  );
};

export default Menu;
