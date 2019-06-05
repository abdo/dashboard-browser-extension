import React from 'react';
import './App.css';
import getTime from './helpers/getTime';

function App() {
  const backgroundImageSrc = `https://source.unsplash.com/random/${
    window.innerWidth
  }x${window.innerHeight}`;
  return (
    <div
      style={{
        background: `linear-gradient(
          rgba(0, 0, 0, 0.60), 
          rgba(0, 0, 0, 0.60)
        ),url(
          ${backgroundImageSrc}
        )`
      }}
      className="container"
    >
      <p className="userName">Hello, Abdo</p>
      <p className="userTime">{getTime()}</p>
    </div>
  );
}

export default App;
