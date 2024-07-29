import axios from 'axios';
const baseVideoURL = 'http://localhost:3002/playlist'; 
const baseUserURL = 'http://localhost:3002/users'; 
let token = localStorage.getItem('token');

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
        author: localStorage.getItem('username'),
        watched: '0',
        date: today
    };
    return axios.post(`${baseVideoURL}`, newVideo, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('Video added successfully:', response.data);
        return response.data; 
    })
    .catch(error => {
        console.error('Error adding video:', error);
        throw error; 
    });
};
  
export const logout = (username) => {
    const data = {
        username: username
    };

    return axios.post('/logout', data, {
        headers: {
            Authorization: `Bearer ${token}`       
        }
    })
    .then(response => {
        if (response.status === 200) {
            const responseData = response.data;
            if (responseData.message === 'Success') {
                window.location.replace("/login");
            }
        } else {
            console.error('Error logging out:', response);
            throw response; 
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
        throw error;
    });
};

export const editVideo = (newName) => {
    let id = newName.id;
    let name = newName.name;
    let body = {name: name};
    body = JSON.stringify(body);
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    return axios.patch(`${baseVideoURL}/${id}`, body, options)
        .then(response => {
            console.log('Video change successfully:', response.data);
            return response.data; 
        })
        .catch(error => {
            console.error('Error change video:', error);
            throw error; 
        });
};

export const editUser = (editUser) => {
    let id = editUser.id;
    let body = {
        Username: editUser.username,
        PasswordHash: editUser.password,
        Email: editUser.email,
        Role: editUser.role
    };
    body = JSON.stringify(body);
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    return axios.patch(`${baseUserURL}/${id}`, body, options)
        .then(response => {
            console.log('User change successfully:', response.data);
            return response.data; 
        })
        .catch(error => {
            console.error('Error change user:', error);
            throw error; 
        });
};

export const delVideo = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa video này?');

    if (confirmDelete) {

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        return axios.delete(`${baseVideoURL}/${id}`, options)
            .then(response => {
                console.log('Video delete successfully:', response.data);
                return response.data; 
            })
            .catch(error => {
                console.error('Error delete video:', error);
                throw error; 
            });
    } else {
        console.log('Không xóa video');
        return Promise.resolve({ message: 'Không xóa video' });
    }
};

export const delUser = (id) => {
    const confirmDelete = window.confirm('Bạn có chắc chắn muốn xóa user này?');

    if (confirmDelete) {

        const options = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        };

        return axios.delete(`${baseUserURL}/${id}`, options)
            .then(response => {
                console.log('User delete successfully:', response.data);
                return response.data; 
            })
            .catch(error => {
                console.error('Error delete user:', error);
                throw error; 
            });
    } else {
        console.log('Không xóa user');
        return Promise.resolve({ message: 'Không xóa user' }); 
    }
};