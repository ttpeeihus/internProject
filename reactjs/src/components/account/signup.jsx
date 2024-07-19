import React, { useState } from 'react';
import './style.css'; // Import CSS file for styling
import { signUp } from '../function/signup'; // Import signUp function
import { validateUsernamePassword } from '../function/signin';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckPassword, setShowCheckPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowCheckPassword = () => {
    setShowCheckPassword(!showCheckPassword);
  };

  const handleSignUp = async () => {
    try {
      // Validate username and password (optional)
      if (!validateUsernamePassword(username, password)) {
        return; // Return early if validation fails
      }

      // Validate password match
      if (password !== checkPassword) {
        alert('Mật khẩu không khớp.');
        return;
      }

      // Call signUp function from functionsigin.js
      const response = await signUp(username, password, email);

      alert(response);

      if (response === 'Tạo tài khoản thành công') {
        // Redirect to login page on successful signup
        window.location.replace('/signin');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (e.g., display error message)
      alert('Đăng ký không thành công. Vui lòng thử lại sau.');
    }
  };

  return (
    <section className='pageAccount'>
      <div className="background">
        <div className="login">
          <form>
            <div className="group">
              <label htmlFor="username"></label>
              <input
                type="text"
                id="username"
                placeholder="Tên người dùng"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="group">
              <label htmlFor="password"></label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span id="showPassword" onClick={handleShowPassword}>
                {showPassword ? (
                  <ion-icon name="eye-off-outline"></ion-icon>
                ) : (
                  <ion-icon name="eye-outline"></ion-icon>
                )}
              </span>
            </div>
            <div className="group">
              <label htmlFor="checkpassword"></label>
              <input
                type={showCheckPassword ? 'text' : 'password'}
                id="checkpassword"
                placeholder="Nhập lại mật khẩu"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              <span id="showcheckPassword" onClick={handleShowCheckPassword}>
                {showCheckPassword ? (
                  <ion-icon name="eye-off-outline"></ion-icon>
                ) : (
                  <ion-icon name="eye-outline"></ion-icon>
                )}
              </span>
            </div>
            <div className="group">
              <label htmlFor="email"></label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>
          <div className="signIn">
            <button type="submit" onClick={handleSignUp}>
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;