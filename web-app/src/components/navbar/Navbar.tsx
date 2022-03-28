import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth-context';
import LogoLink from './LogoLink';
import Menu from './Menu';
import MenuToggleButton from './MenuToggleButton';
import Searchbar from './Searchbar';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='flex flex-row justify-end sticky top-0 z-30'>
      <div className='w-screen flex flex-row justify-between items-center bg-green-600 text-white pl-4 pr-4 py-1 flex-wrap'>
        <div className='flex justify-center flex-grow md:flex-grow-0'>
          <LogoLink />
        </div>
        {authContext.user.loggedIn ? (
          <div className='flex flex-grow items-center'>
            <div className='flex flex-grow justify-center items-center'>
              <Searchbar />
            </div>
            <div className='flex justify-center items-center md:ml-12'>
              <MenuToggleButton toggleMenu={toggleMenu} />
            </div>
          </div>
        ) : (
          <div className='text-lg my-2 flex-grow flex justify-end'>
            <Link to='/' className='mr-4'>
              Log in
            </Link>
            <Link to='/signup'>Sign up</Link>
          </div>
        )}
      </div>
      {isMenuOpen && <Menu toggleMenu={toggleMenu} />}
    </div>
  );
};

export default Navbar;
