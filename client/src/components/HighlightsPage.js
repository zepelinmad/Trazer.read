import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function HighlightsPage() {
  const { bookId } = useParams(); // Extract bookId from URL parameters
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHighlights = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:3000/api/highlights/${bookId}`);
        console.log("API Response Data:", response.data); // Debugging aid

        // Validate if response.data is an array
        if (Array.isArray(response.data)) {
          setHighlights(response.data);
        } else {
          console.error("Fetched data is not an array:", response.data);
          setError('Data fetched is not in the expected format'); // Provide feedback for debugging
          setHighlights([]); // Fallback to ensure highlights is always an array
        }
      } catch (error) {
        console.error(`Error fetching highlights for bookId ${bookId}:`, error);
        setError('Failed to fetch highlights. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchHighlights();
    } else {
      console.error('bookId is undefined');
      setError('Book ID is undefined.'); // Setting error state for UI feedback
    }
  }, [bookId]);

  return (
    <div>
      <h2>Book Highlights</h2>
      {loading && <p>Loading highlights...</p>}
      {error && <p>{error}</p>}
      <ul>
        {Array.isArray(highlights) ? (
          highlights.map((highlight, index) => (
            <li key={index}>{highlight.text}</li>
          ))
        ) : (
          <p>No highlights available.</p>
        )}
      </ul>
    </div>
  );
}

export default HighlightsPage;
