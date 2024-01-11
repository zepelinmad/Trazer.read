import React, { useState } from 'react';
import UploadComponent from './components/UploadComponent'; 
import ReaderComponent from './components/ReaderComponent';
import './App.css';

function App() {
  const [epubUrl, setEpubUrl] = useState(null);

  // Log the current state of epubUrl
  console.log("Current ePub URL:", epubUrl);

  return (
    <div className="App">
      <h1>Trazer.read</h1>

      <div className="UploadComponent">
        <UploadComponent setEpubUrl={setEpubUrl} />
      </div>

      {epubUrl && <ReaderComponent epubUrl={epubUrl} />}
    </div>
  );
}

export default App;
