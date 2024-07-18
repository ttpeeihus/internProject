import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/table.css';

export const Users = () => {
  const [users, setUser] = useState([]);

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

    const showEditForm = (id, index) => {
        // Implementation of showEditForm
    };

    const deleteUser = (id, index) => {
        // Implementation of deleteUser
    };


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
                    <button className="edit-btn" onClick={() => showEditForm(user.UserID, index)}>
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteUser(user.UserID, index)}>
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
      </div>
    );  
};
