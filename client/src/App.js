import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadComponent from './components/UploadComponent';
import ReaderComponent from './components/ReaderComponent';
import { useLocation } from 'react-router-dom'; // Make sure to import useLocation here
import './App.css';

// This component extracts the epubUrl query param and passes it to ReaderComponent
function ReaderWithUrlParam() {
  let location = useLocation();
  let query = new URLSearchParams(location.search);
  const epubUrl = query.get('epubUrl');
  return <ReaderComponent epubUrl={epubUrl} />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Trazer.read</h1>
        <Routes>
          <Route path="/" element={<UploadComponent />} />
          <Route path="/reader" element={<ReaderWithUrlParam />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
