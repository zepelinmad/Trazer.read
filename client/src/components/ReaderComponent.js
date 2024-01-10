// client/src/components/ReaderComponent.js

import React from 'react';

const ReaderComponent = ({ epubContent }) => {
  return (
    <div>
      {/* Render the EPUB content here */}
      {epubContent && <div dangerouslySetInnerHTML={{ __html: epubContent }} />}
    </div>
  );
};

export default ReaderComponent;
