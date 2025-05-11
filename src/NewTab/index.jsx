import "./style.css";

import { useEffect, useState, lazy } from "react";
import { defaultUserName } from "../constants";
import { QuoteContainer } from "./style";
import getBackgroundImageInfo from "../helpers/getBackgroundImage";
import getTime from "../helpers/getTime";
import localQuotes from "../helpers/localQuotes";
import navigateTo from "../helpers/navigateTo";
import truncate from "../helpers/truncate";
import { Button, Tooltip } from "antd";
import { getAICompliment } from "../helpers/askAI";
import { Detector } from "react-detect-offline";

const BookmarksDropdown = lazy(() => import("../components/BookmarksDropdown"));

const SettingsModal = lazy(() => import("../components/SettingsModal"));

const AIMessaging = lazy(() => import("../components/AIMessaging"));

const MainPage = ({
  savedInfo,
  handleSaveSettings,
  handleCancelChangedSettings,
  onChangeInput,
  backgroundImageInfo,
  AIMessages,
  setAIMessages,
}) => {
  const [currentTime, setCurrentTime] = useState(getTime(savedInfo.timeFormat));
  const [currentMinute, setCurrentMinute] = useState(
    getTime(savedInfo.timeFormat)
  );

  const [quote, setQuote] = useState("");

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    let selectedQuote = "";

    const getLocalQuote = () => {
      const randomIndex = Math.floor(Math.random() * localQuotes.length);
      selectedQuote = localQuotes[randomIndex];
      setQuote(selectedQuote);
    };

    // get a new quote
    getAICompliment()
      .then((q) => {
        setQuote(q);
      })
      .catch(() => {
        getLocalQuote();
      });

    // increment time
    setInterval(() => {
      setCurrentMinute(new Date().getMinutes());
    }, 1000);
  }, []);

  // change viewed time each second
  useEffect(() => {
    setCurrentTime(getTime(savedInfo.timeFormat));
  }, [currentMinute, savedInfo.timeFormat]);

  return (
    <div
      style={{
        background: `linear-gradient(
          rgba(0, 0, 0, 0.60), 
          rgba(0, 0, 0, 0.60)
        ),url(
          ${backgroundImageInfo.img}
        )`,
      }}
      className="container"
    >
      {/* User Name */}
      <p className="userName">
        Hello,{" "}
        {(savedInfo.userName && savedInfo.userName.trim()) || defaultUserName}
      </p>

      {/* Time */}
      <p className="userTime">{currentTime}</p>

      {/* Online Indicator */}
      <div className="indicatorContainer">
        <Detector
          polling={{
            interval: 1000,
          }}
          render={({ online }) => (
            <Tooltip
              placement="bottomLeft"
              title={online ? "You are online" : "You are offline"}
            >
              <div
                className={online ? "onlineIndicator" : "offlineIndicator"}
              />
            </Tooltip>
          )}
        />
      </div>

      {/* Quote */}
      <QuoteContainer hide={savedInfo.showQuote !== "true"}>
        <p className="quote">{quote}</p>
      </QuoteContainer>

      {/* AI Buttons */}
      {AIMessages?.length ? (
        <AIMessaging AIMessages={AIMessages} setAIMessages={setAIMessages} />
      ) : null}

      {/* Bookmarks Dropdown */}
      {savedInfo.showBookmarks === "true" && (
        <div className="topContainer">
          <BookmarksDropdown />
        </div>
      )}

      {/* Image to open settings modal */}
      <span
        aria-activedescendant="⚙️"
        role="img"
        aria-label="settings"
        className="settingsIcon"
        onClick={() => setSettingsModalOpen(true)}
        title="Settings"
      >
        ⚙️
      </span>

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

      {/* Image Info */}
      <div className="imgInfoContainer">
        {/* Location */}
        <p
          className="imgLocation"
          onClick={() => navigateTo(backgroundImageInfo.link)}
        >
          {truncate(backgroundImageInfo.location, 80)}
        </p>

        {/* Description */}
        <p
          className="imgDescription"
          onClick={() => navigateTo(backgroundImageInfo.link)}
        >
          {truncate(backgroundImageInfo.description, 80)}
        </p>

        {/* Artist */}
        {backgroundImageInfo.artist && (
          <div className="imgArtist">
            <span
              style={{ textDecoration: "underline" }}
              onClick={() => navigateTo(backgroundImageInfo.artistProfileLink)}
            >
              {truncate(backgroundImageInfo.artist, 80)}
            </span>{" "}
            on{" "}
            <span
              style={{ textDecoration: "underline" }}
              onClick={() => navigateTo("https://unsplash.com")}
            >
              Unsplash
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
