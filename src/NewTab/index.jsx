import "./style.css";

import { useEffect, useState, lazy } from "react";
import { boostGifLink, defaultUserName } from "../constants";

import { NotesContainer, QuoteContainer } from "./style";
import ReactStickies from "react-stickies";
import gear from "../assets/images/gear.png";
import getBackgroundImageInfo from "../helpers/getBackgroundImage";
import getTime from "../helpers/getTime";
import localQuotes from "../helpers/localQuotes";
import navigateTo from "../helpers/navigateTo";
import truncate from "../helpers/truncate";
import fetchQuote from "../helpers/fetchQuote";
import { Button } from "antd";

const BookmarksDropdown = lazy(() => import("../components/BookmarksDropdown"));

const SearchInput = lazy(() => import("../components/SearchInput"));

const SettingsModal = lazy(() => import("../components/SettingsModal"));

const minimumNumberOfNotes = 4;

const MainPage = ({
  savedInfo,
  handleSaveSettings,
  handleCancelChangedSettings,
  onChangeInput,
  onRetrievingData,
}) => {
  const [currentTime, setCurrentTime] = useState(getTime(savedInfo.timeFormat));
  const [currentMinute, setCurrentMinute] = useState(
    getTime(savedInfo.timeFormat)
  );

  const [quote, setQuote] = useState("");

  const [backgroundImageInfo, setBackgroundImageInfo] = useState({});

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  const [localNotes, setLocalNotes] = useState([]);

  const renderedNotes = savedInfo.notes.map((note) => {
    const { editorState, ...newNote } = note;
    return newNote;
  });

  useEffect(() => {
    // Deciding whether to get code from saved local quotes or from the API
    let selectedQuote = "";

    // 30% chance of getting a quote from the API
    let willRequestQuote = Math.random() > 0.3;

    const getLocalQuote = () => {
      const randomIndex = Math.floor(Math.random() * localQuotes.length);
      selectedQuote = localQuotes[randomIndex];
      setQuote(selectedQuote);
    };

    if (willRequestQuote) {
      fetchQuote()
        .then((q) => {
          setQuote(q);
        })
        .catch(() => {
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
    // Set the function that is called when localStorage data is retrieved
    onRetrievingData(() => (retrievedData) => {
      // Get background image
      getBackgroundImageInfo(retrievedData.imgThemes).then((imgInfo) => {
        setBackgroundImageInfo(imgInfo);
      });
    });
  }, [onRetrievingData]);

  useEffect(() => {
    setTimeout(() => {
      handleSaveSettings();
    }, 100);
    if (savedInfo.notes.length !== localNotes.length) {
      setLocalNotes(renderedNotes);
    }
  }, [savedInfo.notes]); // eslint-disable-line

  useEffect(() => {
    // Change viewed time each second
    setCurrentTime(getTime(savedInfo.timeFormat));
  }, [currentMinute, savedInfo.timeFormat]);

  const onChangeNotes = (notes) => {
    onChangeInput("notes", notes);
  };

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
      {/* Notes */}
      <NotesContainer
        disableAdd={renderedNotes.length > minimumNumberOfNotes - 1}
        hide={savedInfo.showNotes !== "true"}
      >
        <ReactStickies
          notes={localNotes}
          onChange={onChangeNotes}
          onDelete={(d) =>
            setLocalNotes((l) => l.filter(({ id }) => id !== d.id))
          }
          colors={["#52ADA2", "#415A80", "#2541B2"]}
        />
      </NotesContainer>

      {/* User Name */}
      <p className="userName">
        Hello,{" "}
        {(savedInfo.userName && savedInfo.userName.trim()) || defaultUserName}
      </p>

      {/* Time */}
      <p className="userTime">{currentTime}</p>

      {/* Quote */}
      <QuoteContainer hide={savedInfo.showQuote !== "true"}>
        <p className="quote">{quote}</p>
      </QuoteContainer>

      {/* Search Input */}
      {savedInfo.showSearchInput === "true" && <SearchInput />}

      {/* Bookmarks Dropdown */}
      {savedInfo.showBookmarks === "true" && (
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

      {/* Boost funny button */}
      <Button type="default" className="boostButton"
      onClick={() => navigateTo(boostGifLink)}
      >
        Boost me
      </Button>
    </div>
  );
};

export default MainPage;
