import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { quotesAPI } from './constants';
import getTime from './helpers/getTime';

import './App.css';
import localQuotes from './helpers/localQuotes';

const App = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    let selectedQuote = '';
    let willRequestQuote = Math.random() > 0.5;

    const getLocalQuote = () => {
      const randomIndex = Math.floor(Math.random() * localQuotes.length);
      selectedQuote = localQuotes[randomIndex];
      setQuote(selectedQuote);
    };

    if (willRequestQuote) {
      axios
        .get(quotesAPI)
        .then((res) => {
          const rawQuote = res.data.compliment;
          selectedQuote =
            rawQuote[0].toUpperCase() + rawQuote.slice(1, rawQuote.length);
          setQuote(selectedQuote);
        })
        .catch((err) => {
          getLocalQuote();
        });
    } else {
      getLocalQuote();
    }
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
