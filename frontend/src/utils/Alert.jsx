import React, { useState, useEffect } from 'react';
import '../style/Alert.css'; // Importing CSS for styling

const Alert = ({message}) => {
  const [visible, setVisible] = useState(true); // State to control alert visibility
  const [progress, setProgress] = useState(100); // State for progress bar (100% -> 0%)

  // Handle the progress animation
  useEffect(() => {
    if (progress > 0) {
      const interval = setInterval(() => {
        setProgress(prevProgress => prevProgress - 1);
      }, 50); // Adjust this to control the speed of the progress line
      return () => clearInterval(interval); // Clean up interval on unmount
    } else {
      setVisible(false); // Hide the alert when the progress reaches 0
    }
  }, [progress]);

  // Manually close the alert
  const closeAlert = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="alert-container">
          <div className="alert-content">
            <p>{message}</p>
            <button onClick={closeAlert} className="close-btn">
              &times;
            </button>
          </div>
          <div
            className="alert-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </>
  );
};

export default Alert;
