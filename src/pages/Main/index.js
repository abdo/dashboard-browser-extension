import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { quotesAPI, defaultUserName } from '../../constants';
import BookmarksDropdown from '../../components/BookmarksDropdown';
import getBackgroundImageInfo from '../../helpers/getBackgroundImage';
import getTime from '../../helpers/getTime';
import localQuotes from '../../helpers/localQuotes';
import SettingsModal from '../../components/SettingsModal';

import './style.css';
import gear from '../../assets/images/gear.png';

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

  const [backgroundImageInfo, setBackgroundImageInfo] = useState('');

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    // Get background image
    getBackgroundImageInfo().then((imgInfo) => {
      setBackgroundImageInfo(imgInfo);
    });

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
          ${backgroundImageInfo && backgroundImageInfo.img}
        )`
      }}
      className="container"
    >
      {/* User Name */}
      <p className="userName">
        Hello,{' '}
        {(savedInfo.userName && savedInfo.userName.trim()) || defaultUserName}
      </p>

      {/* Time */}
      <p className="userTime">{currentTime}</p>

      {/* Quote */}
      <p className="quote">{quote}</p>

      {/* Bookmarks Dropdown */}
      {savedInfo.showBookmarks === 'true' && (
        <div className="topContainer">
          <BookmarksDropdown />
        </div>
      )}

      {/* Image to open settings modal */}
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
