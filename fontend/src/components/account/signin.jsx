import React, { useState } from 'react';
import './style.css'; // Import CSS file for styling
import { signIn, validateUsernamePassword } from '../function/signin'; // Import signIn function

export const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      // Validate username and password (optional)
      if (!validateUsernamePassword(username, password)) {
        return; // Return early if validation fails
      }
      // Call signIn function from functionsigin.js
      const response = await signIn(username, password);

      if (response === 'Đăng nhập thành công') {
        // Redirect to homepage on successful login
        window.location.replace('/');
      } else {
        // Display error message
        alert(response);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle error (e.g., display error message)
      alert('Đăng nhập không thành công. Vui lòng thử lại sau.');
    }
  };

  return (
    <section className='pageAccount'>
      <div className="background">
        <div className="login">
          <div className="group">
            <input
              type="text"
              id="username"
              placeholder="Tên người dùng"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className="group">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <span id="showPassword" onClick={handleShowPassword}>
              {showPassword ? <ion-icon name="eye-off-outline"></ion-icon> : <ion-icon name="eye-outline"></ion-icon>}
            </span>
          </div>
          <div className="recovey">
            <p>
              Quên mật khẩu? <a href="/repass">Đặt lại mật khẩu</a>
            </p>
          </div>
          <div className="signIn">
            <button type="submit" onClick={handleSignIn}>
              Đăng nhập
            </button>
          </div>
          <div className="register">
            Chưa có tài khoản? <a href="/signup">Đăng ký</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;