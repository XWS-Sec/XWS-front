import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FollowRequestsPage from '../pages/follow-requests/FollowRequestsPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import SignupPage from '../pages/SignupPage';
import Navbar from './navbar/Navbar';

type Props = { loggedIn: boolean };

const MyRouter = (props: Props) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={props.loggedIn ? <HomePage /> : <LoginPage />}
        />
        <Route path='signup' element={<SignupPage />} />
        <Route path='users/:username' element={<ProfilePage />} />
        <Route path='follow-requests' element={<FollowRequestsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
