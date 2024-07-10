import { useEffect, useState } from "react";
import MainPage from "./NewTab";
import { localStorageObjectName } from "./constants";
import getBackgroundImageInfo from "./helpers/getBackgroundImage";
import { startAIChat } from "./helpers/askAI";

import "./index.css";

// This file is mainly used to deal with info saved in local storage

const App = () => {
  const [savedLocalStorageInfo, setSavedLocalStorageInfo] = useState({
    userName: "",
    timeFormat: "12",
    showBookmarks: "true",
    showSearchInput: "true",
    showQuote: "true",
    imgThemes: [],
  });

  const [backgroundImageInfo, setBackgroundImageInfo] = useState({});
  const [AIMessages, setAIMessages] = useState([]);

  useEffect(() => {
    // Getting savedLocalStorageInfo from local storage and saving it into state
    let localStorageObject = JSON.parse(
      localStorage.getItem(localStorageObjectName)
    );
    if (!localStorageObject) {
      // set state just to have access to the savedInfo variable without having to depend on it in useEffect
      setSavedLocalStorageInfo((savedInfo) => {
        localStorage.setItem(localStorageObjectName, JSON.stringify(savedInfo));
        return savedInfo;
      });

      getBackgroundImageInfo([]).then((imgInfo) => {
        setBackgroundImageInfo(imgInfo);
      });
    } else {
      setSavedLocalStorageInfo((state) => {
        const data = { ...state, ...localStorageObject };

        getBackgroundImageInfo(data.imgThemes).then((imgInfo) => {
          setBackgroundImageInfo(imgInfo);
        });

        return {
          ...state,
          ...localStorageObject,
        };
      });
    }

    const firstAIMessage = startAIChat();
    setAIMessages([
      {
        role: "model",
        text: firstAIMessage,
      },
    ]);
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem(
      localStorageObjectName,
      JSON.stringify(savedLocalStorageInfo)
    );
  };

  const handleCancelChangedSettings = () => {
    const localStorageObject = JSON.parse(
      localStorage.getItem(localStorageObjectName)
    );
    setSavedLocalStorageInfo((state) => ({
      ...state,
      ...localStorageObject,
    }));
  };

  const onChangeInput = (name, value) =>
    setSavedLocalStorageInfo((state) => ({
      ...state,
      [name]: value,
    }));

  return (
    <MainPage
      savedInfo={savedLocalStorageInfo}
      handleSaveSettings={handleSaveSettings}
      handleCancelChangedSettings={handleCancelChangedSettings}
      onChangeInput={onChangeInput}
      backgroundImageInfo={backgroundImageInfo}
      AIMessages={AIMessages}
      setAIMessages={setAIMessages}
    />
  );
};

export default App;
