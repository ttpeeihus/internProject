import axios from 'axios';

const baseURL = 'http://localhost:3002/users'; 

export const signIn = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}/checkin`, {
      username: username,
      password: password,
    });
    if (response.data === 'Mật khẩu không chính xác') {
      return alert('Tên người dùng hoặc mật khẩu không đúng.');
    }
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', response.data.role);
    localStorage.setItem('username', response.data.username);
    return 'Đăng nhập thành công.';    
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const validateUsernamePassword = (username, password) => {
    if (!username || !password) {
      return alert('Vui lòng nhập tên người dùng và mật khẩu.');
    }

    return true;
  };
  