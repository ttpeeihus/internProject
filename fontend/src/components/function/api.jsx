import axios from 'axios';
const baseURL = 'http://localhost:3001/playlist'; // Thay thế bằng URL API thực tế của bạn

export const addVideo = (src, name) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hour = String(today.getHours()).padStart(2, '0');
    let minute = String(today.getMinutes()).padStart(2, '0');
    let second = String(today.getSeconds()).padStart(2, '0');
    today = `${mm}/${dd}/${yyyy} ${hour}:${minute}:${second}`;

    const newVideo = {
        avtUser: 'penguin.png',
        src: src,
        name: name,
        author: 'phuoctt',
        watched: '0',
        date: today
    };

    return axios.post(`${baseURL}`, newVideo, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Video added successfully:', response.data);
        return response.data; // Trả về dữ liệu từ server nếu cần thiết
    })
    .catch(error => {
        console.error('Error adding video:', error);
        throw error; // Ném lỗi để component gọi hàm này có thể xử lý
    });
};
  
export const logout = (username) => {
    const data = {
        username: username
    };

    return axios.post('/logout', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 200) {
            const responseData = response.data;
            if (responseData.message === 'Success') {
                window.location.replace("/login");
            }
        } else {
            // Handle other statuses if needed
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
        throw error; // Ném lỗi để component gọi hàm này có thể xử lý
    });
};

export const editVideo = (newName) => {
    const body = JSON.stringify(newName);
    let id = newName.id;
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return axios.patch(`${baseURL}:${id}`, body, options)
        .then(response => {
            console.log('Video change successfully:', response.data);
            return response.data; // Optionally return data if needed
        })
        .catch(error => {
            console.error('Error change video:', error);
            throw error; // Propagate the error further
        });
};

export const delVideo = (id) => {
    // Hiển thị hộp thoại xác nhận trước khi xóa
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa video này?');

    // Nếu người dùng chọn "OK"
    if (confirmDelete) {
        const idVideo = { id };

        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            data: idVideo // Use data instead of body for Axios
        };

        return axios.delete(`${baseURL}/${id}`, null, options)
            .then(response => {
                console.log('Video delete successfully:', response.data);
                return response.data; // Optionally return data if needed
            })
            .catch(error => {
                console.error('Error delete video:', error);
                throw error; // Propagate the error further
            });
    } else {
        console.log('Không xóa video');
        return Promise.resolve({ message: 'Không xóa video' }); // Resolve with a message
    }
};
