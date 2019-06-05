import React from 'react';
import './App.css';

function App() {
  const backgroundImageSrc = `https://source.unsplash.com/random/${
    window.innerWidth
  }x${window.innerHeight}`;
  return (
    <div
      style={{
        background: `linear-gradient(
          rgba(0, 0, 0, 0.45), 
          rgba(0, 0, 0, 0.45)
        ),url(
          ${backgroundImageSrc}
        )`
      }}
      className="container"
    />
  );
}

export default App;
