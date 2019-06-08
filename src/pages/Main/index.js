import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { quotesAPI } from '../../constants';
import getTime from '../../helpers/getTime';
import localQuotes from '../../helpers/localQuotes';
import SettingsModal from '../../components/SettingsModal';

import './style.css';
import gear from '../../assets/images/gear.png';
import getBackgroundImageSrc from '../../helpers/getBackgroundImage';

const MainPage = ({
  savedInfo,
  handleSaveSettings,
  handleCancelChangedSettings,
  onChangeInput
}) => {
  const [currentTime, setCurrentTime] = useState(getTime(savedInfo.timeFormat));
  const [currentMinute, setCurrentMinute] = useState(
    getTime(savedInfo.timeFormat)
  );

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

    setInterval(() => {
      setCurrentMinute(new Date().getMinutes());
    }, 1000);
  }, []);

  useEffect(() => {
    // Change viewed time each second
    setCurrentTime(getTime(savedInfo.timeFormat));
  }, [currentMinute, savedInfo.timeFormat]);

  return (
    <div
      style={{
        background: `linear-gradient(
          rgba(0, 0, 0, 0.60), 
          rgba(0, 0, 0, 0.60)
        ),url(
          ${getBackgroundImageSrc()}
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
        onChangeInput={onChangeInput}
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
