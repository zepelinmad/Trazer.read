import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import UploadComponent from './components/UploadComponent';
import ReaderComponent from './components/ReaderComponent';
import HighlightsPage from './components/HighlightsPage'; // Ensure this is correctly pointing to your HighlightsPage component
import './App.css';

// Function to handle URL parameters for ReaderComponent
function ReaderWithUrlParam() {
  const { bookId } = useParams(); // Extract bookId from the URL path parameters
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const epubUrl = query.get('epubUrl'); // Continue extracting epubUrl from the query parameters
  
  // Pass both epubUrl and bookId to ReaderComponent
  return <ReaderComponent epubUrl={epubUrl} bookId={bookId} />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Trazer.read</h1>
        <Routes>
          <Route path="/" element={<UploadComponent />} />
          {/* Adjusted route for ReaderComponent to include bookId */}
          <Route path="/reader/:bookId" element={<ReaderWithUrlParam />} />
          {/* Route for the HighlightsPage */}
          <Route path="/highlights/:bookId" element={<HighlightsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
