import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/table.css';
import { delUser } from '../function/api';
import EditUser from '../form/editUser';

export const Users = () => {
  const [users, setUser] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // State để điều khiển hiển thị EditUser
  const [editUser, setEditUser] = useState({});
  const [idUser, setIdUser] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/');
        setUser(response.data); // Assuming response.data is an array of playlist items
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

    const editbtn = (id, editUser) => {
      setIdUser(id);
      setEditUser(editUser);
      setIsVisible(!isVisible);
    }

    const renderUser = (users) => {
        if (!Array.isArray(users) || users.length === 0) {
          return null; // Hoặc bạn có thể trả về thông báo hoặc UI khác để xử lý trường hợp không có dữ liệu
        }
      
        return (
          <table>
            <thead>
              <tr>
                {Object.keys(users[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
                <th>Sửa</th>
                <th>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.UserID}>
                  {Object.values(user).map((value, index) => (
                    <td key={index}>{value}</td>
                  ))}
                  <td>
                    <button className="edit-btn" onClick={() => editbtn(user.UserID, user)}>
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => delUser(user.UserID)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      };
      
  
  // Ví dụ sử dụng:
    return (
      <div className="container">
        {renderUser(users)}
        <div className={`edit-video ${isVisible ? 'visible' : ''}`}>
          <div id="overlay" onClick={() => editbtn(0)}></div>
          <EditUser idUser={idUser} UserEdit={editUser}/>
      </div>
      </div>
    );  
};
