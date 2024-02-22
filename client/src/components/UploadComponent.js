import React, { useState } from 'react';
import axios from 'axios';

function UploadComponent() {
    const [file, setFile] = useState(null); // Ensuring file state is defined

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

            // Open the reader in a new tab with the epubUrl
            const readerUrl = `/reader?epubUrl=${encodeURIComponent(response.data.epubUrl)}`;
            window.open(readerUrl, '_blank');

        } catch (error) {
            console.error('Error uploading file:', error);
            console.log('Error details:', error.response);
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
