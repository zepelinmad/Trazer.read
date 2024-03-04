import React, { useState, useEffect, useRef } from 'react';
import ePub from 'epubjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ReaderComponent({ epubUrl, bookId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [readingPosition, setReadingPosition] = useState(0);
  const [lineHeight, setLineHeight] = useState(20); // Assuming an average line height
  const epubRef = useRef(null);
  const book = useRef(null);
  const rendition = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate for programmatic navigation

  useEffect(() => {
    setIsLoading(true);
    book.current = ePub(epubUrl);
    rendition.current = book.current.renderTo(epubRef.current, {
      width: "100%",
      height: "100%",
      manager: "continuous",
      ignoreClass: 'annotator-hl',
    });

    book.current.ready.then(() => {
      return rendition.current.display();
    }).then(() => {
      setIsLoading(false); // The book is now displayed
    }).catch(error => {
      console.error("Error in processing the EPUB", error);
      setIsLoading(false);
    });

    // Apply highlighting styles
    rendition.current.themes.default({
      '::selection': {
        'background': 'rgba(255,255,0, 0.3)'
      },
      '.epubjs-hl': {
        'fill': 'yellow', 'fill-opacity': '0.3', 'mix-blend-mode': 'multiply'
      }
    });

    // Highlighting text upon selection
    rendition.current.on("selected", function(cfiRange) {
      // Extract and log the text for the selected range
      book.current.getRange(cfiRange).then(function(range) {
        if (range) {
          const text = range.toString();
          console.log(`Text: ${text}`);
          // Save the highlight with the extracted text
          saveHighlight(cfiRange, text);
    
          // Visually highlight the selected text in the reader
          rendition.current.annotations.highlight(cfiRange, {}, (e) => {
            console.log("Highlight added for CFI range:", cfiRange);
            // If you need to handle click events on the highlight, you can do so here.
            // e.target gives you the clicked element.
          });
        }
      }).catch(error => {
        console.error("Error extracting text:", error);
      });
    });    

    const handleKeyPress = (event) => {
      if (event.key === 'ArrowDown') {
        setReadingPosition(prevPosition => prevPosition + lineHeight);
      } else if (event.key === 'ArrowUp') {
        setReadingPosition(prevPosition => Math.max(prevPosition - lineHeight, 0));
      }
    };

    // Add event listeners for keyboard navigation
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listeners and rendition on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (rendition.current) {
        rendition.current.destroy();
      }
    };
  }, [epubUrl, lineHeight]);

  const saveHighlight = async (cfiRange, text) => {
    if (!text.trim()) return; // Avoid saving empty or whitespace-only strings
    try {
      const highlightData = {
        bookId,
        cfiRange,
        text,
      };
      await axios.post('/api/highlights', highlightData);
      console.log('Highlight saved successfully');
    } catch (error) {
      console.error('Error saving highlight:', error);
    }
  };

  const goToNextPage = () => {
    setReadingPosition(0); // Reset reading position on page change
    rendition.current.next();
  };

  const goToPreviousPage = () => {
    setReadingPosition(0); // Reset reading position on page change
    rendition.current.prev();
  };

  // Function to navigate to the highlights page
  const viewHighlights = () => {
    if (bookId) {
      navigate(`/highlights/${bookId}`);
    } else {
      console.error("bookId is undefined, cannot navigate to highlights");
    }
  };

  // Style for the overlay
  const overlayStyle = {
    position: 'absolute',
    top: readingPosition + 'px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjusted opacity for visibility
    pointerEvents: 'none', // Allows interaction with the text underneath
  };

  return (
    <div className="ReaderComponent">
      {isLoading && <div>Loading ePub...</div>}
      <div ref={epubRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
        {!isLoading && <div style={overlayStyle}></div>}
      </div>
      {!isLoading && (
        <>
          <button onClick={goToPreviousPage}>Previous Page</button>
          <button onClick={goToNextPage}>Next Page</button>
          <button onClick={viewHighlights}>View Highlights</button> {/* Button to view highlights */}
        </>
      )}
    </div>
  );
}

export default ReaderComponent;
