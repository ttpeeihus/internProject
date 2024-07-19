import axios from 'axios';

const baseURL = 'http://localhost:3001/users'; // Thay thế bằng URL API thực tế của bạn

// Hàm đăng nhập
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
    return 'Đăng nhập thành công.';    
  } catch (error) {
    console.error('Error signing in:', error);
    throw error; // Ném lỗi để bên gọi xử lý
  }
};

// Hàm kiểm tra tính hợp lệ của tên người dùng và mật khẩu (tùy chọn)
export const validateUsernamePassword = (username, password) => {
    // Bạn có thể thực hiện các loại kiểm tra phù hợp với yêu cầu của bạn
    if (!username || !password) {
      return alert('Vui lòng nhập tên người dùng và mật khẩu.');
    }
  
    // if (password.length) {
    //   throw new Error('Mật khẩu phải có ít nhất 6 ký tự.');
    // }
  
    // Nếu các kiểm tra đều qua, trả về true
    return true;
  };
  