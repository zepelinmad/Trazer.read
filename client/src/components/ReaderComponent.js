import React, { useState, useEffect, useRef } from 'react';
import ePub from 'epubjs';

function ReaderComponent({ epubUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const [readingPosition, setReadingPosition] = useState(0);
  const [lineHeight, setLineHeight] = useState(20); // Assuming an average line height
  const epubRef = useRef(null);
  const book = useRef(null);
  const rendition = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    book.current = ePub(epubUrl);
    rendition.current = book.current.renderTo(epubRef.current, { width: "100%", height: "100%" });

    book.current.ready.then(() => {
      // Here you might want to calculate and set the initial line height based on actual text
      return rendition.current.display();
    }).then(() => {
      setIsLoading(false); // The book is now displayed
    }).catch(error => {
      console.error("Error in processing the EPUB", error);
      setIsLoading(false);
    });

    const handleKeyPress = (event) => {
      if (event.key === 'ArrowDown') {
        setReadingPosition(prevPosition => prevPosition + lineHeight);
      } else if (event.key === 'ArrowUp') {
        setReadingPosition(prevPosition => Math.max(prevPosition - lineHeight, 0));
      }
    };

    // Add event listener for keypresses
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (rendition.current) {
        rendition.current.destroy();
      }
    };
  }, [epubUrl, lineHeight]);

  const goToNextPage = () => {
    setReadingPosition(0); // Reset reading position on page change
    rendition.current.next();
  };

  const goToPreviousPage = () => {
    setReadingPosition(0); // Reset reading position on page change
    rendition.current.prev();
  };

  // Style for the overlay
  const overlayStyle = {
    position: 'absolute',
    top: readingPosition + 'px',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 255)', // White overlay
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
        </>
      )}
    </div>
  );
}

export default ReaderComponent;
