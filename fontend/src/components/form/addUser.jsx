// addUser.jsx

import React, { useState } from 'react';
import '../css/form.css';
import { signUp } from '../function/signup'; // Import signUp function
import { validateUsernamePassword } from '../function/signin';

export const AddUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to backend or update state)
        try {
            // Validate username and password (optional)
            if (!validateUsernamePassword(username, password)) {
                return; // Return early if validation fails
            }
        
            // Call signUp function from functionsigin.js
            const response = await signUp(username, password, email, role);
        
            alert(response);

        } catch (error) {
            console.error('Error signing up:', error);
            // Handle error (e.g., display error message)
            alert('Đăng ký không thành công. Vui lòng thử lại sau.');
        }
        
        console.log('Submitted:', { username, password, email, role });
        // Reset form fields if needed
        setUsername('');
        setPassword('');
        setEmail('');
        setRole('');
    };

    return (
        <div>
        <div id="overlay"></div>
        <div id="popupForm">
            <h2>Add User</h2>
            <form id="usersForm" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label><br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br />
                <label htmlFor="pass">Password:</label><br />
                <input
                    type="password"
                    id="pass"
                    name="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br /><br />
                <label htmlFor="email">Email:</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br />
                <label htmlFor="role">Role:</label><br />
                <input
                    type="text"
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                /><br /><br />
                <button type="submit" id="submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default AddUser;