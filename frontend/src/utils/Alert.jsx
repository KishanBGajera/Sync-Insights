import React, { useState, useEffect } from 'react';
import '../style/Alert.css';

const Alert = ({message}) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100); 

  useEffect(() => {
    if (progress > 0) {
      const interval = setInterval(() => {
        setProgress(prevProgress => prevProgress - 2);
      }, 50); 
      return () => clearInterval(interval); 
    } else {
      setVisible(false);
    }
  }, [progress]);

  // const closeAlert = () => {
  //   setVisible(false);
  // };

  return (
    <>
      {visible && (
        <div className="alert-container">
          <div className="alert-content">
            <p>{message}</p>
            {/* <button onClick={closeAlert} className="close-btn">
              &times;
            </button> */}
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
