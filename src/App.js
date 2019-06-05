import React, { useState, useEffect } from 'react';
import './App.css';
import getTime from './helpers/getTime';
import axios from 'axios';

const App = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    axios
      .get('https://complimentr.com/api')
      .then((res) => {
        const rawQuote = res.data.compliment;
        const actualQuote =
          rawQuote[0].toUpperCase() +
          rawQuote.slice(1, rawQuote.length) +
          ' 😃';
        setQuote(actualQuote);
      })
      .catch((err) => {});
  }, []);

  const backgroundImageSrc = `https://source.unsplash.com/random/${
    window.innerWidth
  }x${window.innerHeight}`;

  const currentTime = getTime();

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
      <p className="userTime">{currentTime}</p>
      <p className="quote">{quote}</p>
    </div>
  );
};

export default App;
