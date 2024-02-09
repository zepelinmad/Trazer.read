import React, { useState, useEffect, useRef } from 'react';
import ePub from 'epubjs';

function ReaderComponent({ epubUrl }) {
  const [isLoading, setIsLoading] = useState(true);
  const epubRef = useRef(null);
  const book = useRef(null);
  const rendition = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    book.current = ePub(epubUrl);
    rendition.current = book.current.renderTo(epubRef.current, { width: "100%", height: "100%" });

    book.current.ready.then(() => {
      return rendition.current.display();
    }).then(() => {
      setIsLoading(false); // The book is now displayed
    }).catch(error => {
      console.error("Error in processing the EPUB", error);
      setIsLoading(false);
    });

    return () => {
      if (rendition.current) {
        rendition.current.destroy();
      }
    };
  }, [epubUrl]);

  const goToNextPage = () => {
    rendition.current.next();
  };

  const goToPreviousPage = () => {
    rendition.current.prev();
  };

  return (
    <div className="ReaderComponent">
      {isLoading && <div>Loading ePub...</div>}
      <div ref={epubRef} style={{ width: '100%', height: '100%' }} />
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
