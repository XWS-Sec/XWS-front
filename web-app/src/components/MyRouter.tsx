import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import EmailVerificationPage from '../pages/EmailVerificationPage';
import FollowRequestsPage from '../pages/follow-requests/FollowRequestsPage';
import HomePage from '../pages/HomePage';
import LoggedInPage from '../pages/LoggedInPage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import PasswordlessEmailSentPage from '../pages/PasswordlessEmailSentPage';
import PasswordlessLogin from '../pages/PasswordlessLogin';
import ProfilePage from '../pages/profile/ProfilePage';
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
        <Route path='loggedIn' element={<LoggedInPage />} />
        <Route path='passwordlessLogin' element={<PasswordlessLogin />} />
        <Route path='changePassword' element={<ChangePasswordPage />} />
        <Route path='emailVerification' element={<EmailVerificationPage />} />
        <Route
          path='passwordlessEmailSentPage'
          element={<PasswordlessEmailSentPage />}
        />
        <Route path='users/:username' element={<ProfilePage />} />
        <Route path='follow-requests' element={<FollowRequestsPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
