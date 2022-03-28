import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;
