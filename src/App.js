import React, { useCallback, useState } from 'react';
import './App.scss';

const MAX_LEVEL = 5;

const App = () => {
  const [level, setLevel] = useState(0);
  const [timer, setTimer] = useState(0);

  const handleChange = (step, intervalId) => {
    setLevel((value) => {
      if (value + step === 0 || value + step === 5) {
        clearInterval(intervalId);
      }
      return value + step;
    });
  };

  const handleIncrease = useCallback(() => {
    clearInterval(timer);
    if (level < 5) {
      const intervalId = setInterval(() => {
        handleChange(1, intervalId);
      }, 2000);
      setTimer(intervalId);
    }
  }, [timer, level]);

  const handleDecrease = useCallback(() => {
    clearInterval(timer);
    if (level > 0) {
      const intervalId = setInterval(() => {
        handleChange(-1, intervalId);
      }, 2000);
      setTimer(intervalId);
    }
  }, [timer, level]);

  return (
    <div className="container">
      <div>
        <h1>BATHTUB</h1>
        <div className="bathtub">
          {[...Array(MAX_LEVEL)].map((water, index) => {
            console.log('INDEX: ', index);
            return index < level && <div key={index} className="water" />;
          })}
        </div>
      </div>
      <p>Level: {level}</p>
      <div className="btn-container">
        <button onClick={handleIncrease}>Increase</button>
        <button onClick={handleDecrease}>Decrease</button>
      </div>
    </div>
  );
};

export default App;
