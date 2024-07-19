// editVideo.jsx

import React from 'react';
import '../css/editform.css';
import { editVideo } from '../function/api';


export const EditVideo = ({idVideo}) => {
    const handleSubmit = async (e) => {
        // e.preventDefault();
        const newName = {name: e.target.changeName.value,
                        id: idVideo
        };
        try {
            const response = await editVideo(newName);
            console.log(response);
            alert(response);

        } catch (error) {
            console.error('Error editname:', error);
            alert('Sửa không thành công. Vui lòng thử lại sau.');
        }
        console.log('Submitted new name:', newName);
        e.target.reset();
    };

    return (
        <div>
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
