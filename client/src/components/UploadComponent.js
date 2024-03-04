import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for programmatic navigation

function UploadComponent() {
    const [file, setFile] = useState(null);
    const navigate = useNavigate(); // Initialize the navigate function

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully');
            console.log(response.data);

            // Assuming response.data contains { bookId: "some-id", epubUrl: "url-to-epub" }
            // Navigate to the reader with the bookId
            navigate(`/reader/${response.data.bookId}?epubUrl=${encodeURIComponent(response.data.epubUrl)}`);

        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error details:', error.response.data.error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default UploadComponent;
