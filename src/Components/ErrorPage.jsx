import React, { useEffect } from 'react';

const ErrorPage = () => {
  useEffect(() => {
    document.title = 'BGV - Error';
  }, []);
  return (
    <div className='error-display'>
      <h2 className='text-center'>Page Not Found</h2>
    </div>
  );
};

export default ErrorPage;
