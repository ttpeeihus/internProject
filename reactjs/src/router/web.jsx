import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from '../components/account/signin';
import Signup from '../components/account/signup';
import ForgetPass from '../components/account/forgetpass';
import HomeGuest from '../page/homeGuest';
import HomeUsers from '../page/homeUser';
import AdminUsers from '../page/adminUsers';
import AdminVideo from '../page/adminVideo';

const AppRouter = () => {
  let role = localStorage.getItem('role');

  // Example of a component where Navigate can be used
  const RedirectHome = () => <Navigate to="/" replace />;

  const RedirectUser = () => <Navigate to="/user" replace />;

  const RedirectAdmin = () => <Navigate to="/admin/video" replace />;

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/repass" element={<ForgetPass />} />
        {role === 'admin' && (
          <Route path="/*" element={<RedirectAdmin />} />
        )}

        {role === 'user' && (
          <Route path="/*" element={<RedirectUser />} />
        )}
        
        <Route path="/*" element={<HomeGuest />} />
        
        {role === 'user' && (
          <Route path="/user" element={<HomeUsers />} />
        )}
        
        {role !== 'user' && (
          <Route path="/user" element={<RedirectHome />} />
        )}

        {role === 'admin' && (
          <>
            <Route path="/admin/user" element={<AdminUsers />} />
            <Route path="/admin/video" element={<AdminVideo />} />
          </>
        )}
        
        {role !== 'admin' && (
          <Route path="/admin/*" element={<RedirectUser />} />
        )}

      </Routes>
    </Router>
  );
};

export default AppRouter;
