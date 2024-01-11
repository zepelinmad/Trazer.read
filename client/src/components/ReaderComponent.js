import React, { useState, useEffect, useRef } from 'react';
import ePub from 'epubjs';

function ReaderComponent({ epubUrl }) {
  const viewerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (epubUrl) {
      setIsLoading(true);
      const book = ePub(epubUrl);
      const rendition = book.renderTo(viewerRef.current, { width: '100%', height: '100%' });

      rendition.display().then(() => {
        setIsLoading(false);
      }).catch(error => {
        console.error("Error rendering ePub:", error);
        setIsLoading(false);
      });
    }
  }, [epubUrl]); // Only re-run if epubUrl changes
  
  return (
    <div className="ReaderComponent">
      {isLoading ? <div>Loading ePub...</div> : <div ref={viewerRef} className="ePubViewer" />}
    </div>
  );
}

export default ReaderComponent;
