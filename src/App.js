import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';

import { quotesAPI, localStorageObjectName } from './constants';
import getTime from './helpers/getTime';
import localQuotes from './helpers/localQuotes';

import './App.css';
import gear from './assets/images/gear.png';

const App = () => {
  const [quote, setQuote] = useState('');
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [savedLocalStorageInfo, setSavedLocalStorageInfo] = useState({
    userName: 'friend'
  });

  const [currentTime, setCurrentTime] = useState(getTime());

  useEffect(() => {
    // Getting savedLocalStorageInfo from local storage and saving it into local state
    let localStorageObject = JSON.parse(
      localStorage.getItem(localStorageObjectName)
    );
    if (!localStorageObject) {
      localStorageObject = {};
      localStorage.setItem(
        localStorageObjectName,
        JSON.stringify(localStorageObject)
      );
    }
    setSavedLocalStorageInfo(localStorageObject);

    // Deciding whether to get code from saved local quotes or from the API
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

  useEffect(() => {
    // Change viewed time each second
    setInterval(() => {
      const timeNow = getTime();
      if (timeNow !== currentTime) {
        setCurrentTime(timeNow);
      }
    }, 1000);
  }, [currentTime]);

  const handleSaveSettings = () => {
    setSettingsModalOpen(false);
    localStorage.setItem(
      localStorageObjectName,
      JSON.stringify(savedLocalStorageInfo)
    );
  };

  const handleCancelChangedSettings = () => {
    setSettingsModalOpen(false);
    const localStorageObject = JSON.parse(
      localStorage.getItem(localStorageObjectName)
    );
    setSavedLocalStorageInfo(localStorageObject);
  };

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
      <p className="userName">
        Hello,{' '}
        {(savedLocalStorageInfo.userName &&
          savedLocalStorageInfo.userName.trim()) ||
          'friend'}
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
          value={savedLocalStorageInfo.userName}
          onChange={(e) =>
            setSavedLocalStorageInfo({
              ...savedLocalStorageInfo,
              userName: e.target.value
            })
          }
        />
      </Modal>
    </div>
  );
};

export default App;
