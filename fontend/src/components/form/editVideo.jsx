// editVideo.jsx

import React from 'react';
import '../css/editform.css';

export const EditVideo = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here (e.g., send data to backend or update state)
        const newName = e.target.changeName.value;
        console.log('Submitted new name:', newName);
        // Reset form field if needed
        e.target.reset();
    };

    return (
        <div>
        <div id="overlay"></div>
        <div id="changeForm">
            <h2>Change Name Video</h2>
            <form id="chanForm" onSubmit={handleSubmit}>
                <label htmlFor="changeName">Name:</label><br />
                <input
                    type="text"
                    id="changeName"
                    name="changeName"
                    required
                /><br /><br />
                <button type="submit" id="changeNamesubmit">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default EditVideo;
