import { Menu, Avatar, Dropdown, Input } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { quotesAPI } from '../../constants';
import getBackgroundImageSrc from '../../helpers/getBackgroundImage';
import getBrowserBookmarks from '../../helpers/getBrowserBookmarks';
import getTime from '../../helpers/getTime';
import getUrlIcon from '../../helpers/getUrlIcon';
import localQuotes from '../../helpers/localQuotes';
import SettingsModal from '../../components/SettingsModal';
import truncate from '../../helpers/truncate';

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

  const [backgroundImageSrc, setBackgroundImageSrc] = useState('');

  const [browserBookmarks, setBrowserBookmarks] = useState([]);

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    // Get background image
    setBackgroundImageSrc(getBackgroundImageSrc());

    // Get bookmarks
    setBrowserBookmarks(getBrowserBookmarks());

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

  const menu = (
    <Menu className="bookmarksMenu">
      {browserBookmarks.length === 0 ? (
        <Menu.Item>No bookmarks found</Menu.Item>
      ) : (
        <Input autoFocus style={{ width: '90%' }} />
      )}

      {browserBookmarks.map((bookmark) => {
        return (
          <Menu.Item
            key={bookmark.id}
            className="bookmarksMenuItem"
            onClick={() => {
              window.open(bookmark.url, '_blank');
              window.focus();
            }}
          >
            <Avatar
              className="bookmarkMenuItemIcon"
              src={getUrlIcon(bookmark.url)}
              size="small"
            />
            {truncate(bookmark.title, 60)}
          </Menu.Item>
        );
      })}
    </Menu>
  );

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
      {/* User Name */}
      <p className="userName">
        Hello, {(savedInfo.userName && savedInfo.userName.trim()) || 'friend'}
      </p>

      {/* Time */}
      <p className="userTime">{currentTime}</p>

      {/* Quote */}
      <p className="quote">{quote}</p>

      {/* Bookmarks Dropdown */}
      {savedInfo.showBookmarks === 'true' && (
        <div className="bookmarksDropdownContainer">
          <Dropdown overlay={menu}>
            <p className="bookmarksDropdownText">Bookmarks</p>
          </Dropdown>
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
