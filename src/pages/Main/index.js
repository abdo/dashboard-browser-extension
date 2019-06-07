import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { quotesAPI } from '../../constants';
import getTime from '../../helpers/getTime';
import localQuotes from '../../helpers/localQuotes';

import gear from '../../assets/images/gear.png';
import SettingsModal from '../../components/SettingsModal';

const MainPage = ({
  savedInfo,
  handleSaveSettings,
  handleCancelChangedSettings,
  onChangeNameTextInput
}) => {
  const [currentTime, setCurrentTime] = useState(getTime(savedInfo.timeFormat));
  const [quote, setQuote] = useState('');

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
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
      const timeNow = getTime(savedInfo.timeFormat);
      if (timeNow !== currentTime) {
        setCurrentTime(timeNow);
      }
    }, 1000);
  }, [currentTime, savedInfo.timeFormat]);

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
        Hello, {(savedInfo.userName && savedInfo.userName.trim()) || 'friend'}
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

      <SettingsModal
        open={settingsModalOpen}
        savedInfo={savedInfo}
        onChangeNameTextInput={onChangeNameTextInput}
        onOk={() => {
          setSettingsModalOpen(false);
          handleSaveSettings();
        }}
        onCancel={() => {
          setSettingsModalOpen(false);
          handleCancelChangedSettings();
        }}
      />
    </div>
  );
};

export default MainPage;
