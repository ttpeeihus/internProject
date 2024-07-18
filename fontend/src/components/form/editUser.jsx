// editUser.jsx

import React, { useState } from 'react';
import '../css/editform.css';

export const EditUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to backend or update state)
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
        <div id="edit-form">
            <h2>Edit User</h2>
            <form id="editForm" onSubmit={handleSubmit}>
                <label htmlFor="edit-username">Username:</label><br />
                <input
                    type="text"
                    id="edit-username"
                    name="edit-username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br />
                <label htmlFor="edit-pass">Password:</label><br />
                <input
                    type="password"
                    id="edit-pass"
                    name="edit-pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br /><br />
                <label htmlFor="edit-email">Email:</label><br />
                <input
                    type="email"
                    id="edit-email"
                    name="edit-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br /><br />
                <label htmlFor="edit-role">Role:</label><br />
                <input
                    type="text"
                    id="edit-role"
                    name="edit-role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                /><br /><br />
                <button type="submit" id="edit-submit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default EditUser;
