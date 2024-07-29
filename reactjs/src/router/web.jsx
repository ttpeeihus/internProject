import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signin from '../components/account/signin';
import Signup from '../components/account/signup';
import ForgetPass from '../components/account/forgetpass';
import HomeGuest from '../page/homeGuest';
import HomeUsers from '../page/homeUser';
import AdminUsers from '../page/adminUsers';
import AdminVideo from '../page/adminVideo';
import AdminViews from '../page/adminViews';

const AppRouter = () => {
  let role = localStorage.getItem('role');

  const RedirectHome = () => <Navigate to="/" replace />;

  const RedirectUser = () => <Navigate to="/user" replace />;

  const RedirectAdmin = () => <Navigate to="/admin/video" replace />;

  const RedirectAdminViews = () => <Navigate to="/admin/video/views" replace />;
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/repass" element={<ForgetPass />} />

        {role === 'user' && (
          <>
            <Route path="/*" element={<RedirectUser />} />
            <Route path="/user" element={<HomeUsers />} />
          </>
        )}

        {role === 'admin' && (
          <>
            <Route path="/*" element={<RedirectAdmin />} />
            <Route path="/admin/user" element={<AdminUsers />} />
            <Route path="/admin/video" element={<AdminVideo />} />
            <Route path="/admin/video/*" element={<RedirectAdminViews />} />
            <Route path="/admin/video/views" element={<AdminViews />} />

          </>
        )}
                
        {role !== 'user' && role !== 'admin' && (
          <>
            <Route path="/*" element={<HomeGuest />} />
            <Route path="/*" element={<RedirectHome />} />
          </>
        )}

      </Routes>
    </Router>
  );
};

export default AppRouter;
