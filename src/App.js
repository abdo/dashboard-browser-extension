import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';

import { quotesAPI, userNameInLocalStorage } from './constants';
import getTime from './helpers/getTime';
import localQuotes from './helpers/localQuotes';

import './App.css';
import gear from './assets/images/gear.png';

const App = () => {
  const [quote, setQuote] = useState('');
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [userName, setUserName] = useState('friend');

  useEffect(() => {
    setUserName(localStorage.getItem(userNameInLocalStorage));

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

  const handleSaveSettings = () => {
    setSettingsModalOpen(false);
    localStorage.setItem(userNameInLocalStorage, userName);
  };

  const handleCancelChangedSettings = () => {
    setSettingsModalOpen(false);
    setUserName(localStorage.getItem(userNameInLocalStorage));
  };

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
      <p className="userName">
        Hello, {(userName && userName.trim()) || 'friend'}
      </p>
      <p className="userTime">{currentTime}</p>
      <p className="quote">{quote}</p>
      <img
        src={gear}
        alt="settings"
        title="Settings"
        className="settingsIcon"
        onClick={() => setSettingsModalOpen(true)}
      />

      <Modal
        title="Settings"
        visible={settingsModalOpen}
        onOk={handleSaveSettings}
        onCancel={handleCancelChangedSettings}
        closable={false}
      >
        <Input
          addonBefore="Your Name"
          placeholder="Friend"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default App;
