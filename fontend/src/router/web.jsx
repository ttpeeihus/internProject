// Import các thành phần cần thiết từ react-router-dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from '../components/account/signin'; 
import Signup from '../components/account/signup';
import ForgetPass from '../components/account/forgetpass'; 
import HomeGuest from '../page/homeGuest';
import HomeUsers from '../page/homeUser';
import AdminUsers from '../page/adminUsers';
import AdminVideo from '../page/adminVideo';

// Hàm Router
export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/repass" element={<ForgetPass />} />
        <Route path="/" element={<HomeGuest />} />
        <Route path="/user" element={<HomeUsers />} />
        <Route path="/admin/user" element={<AdminUsers />} />
        <Route path="/admin/video" element={<AdminVideo />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
