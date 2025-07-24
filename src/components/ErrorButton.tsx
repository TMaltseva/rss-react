import { useState } from 'react';

const ErrorButton = () => {
  const [throwError, setThrowError] = useState(false);

  const handleClick = () => {
    setThrowError(true);
  };

  if (throwError) {
    throw new Error('Test error from ErrorButton');
  }

  return (
    <button className="throw-error-btn" onClick={handleClick}>
      Throw Error
    </button>
  );
};

export default ErrorButton;
