import React, { useState, useEffect } from 'react';

import { localStorageObjectName } from './constants';
import MainPage from './pages/Main';

// This file is mainly used to deal with info saved in local storage

const App = () => {
  const [savedLocalStorageInfo, setSavedLocalStorageInfo] = useState({
    userName: '',
    timeFormat: '12',
    showBookmarks: 'true',
    imgThemes: []
  });

  const [onRetrievingData, setOnRetrievingData] = useState(() => () => null);

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
    } else {
      setSavedLocalStorageInfo((state) => {
        onRetrievingData({ ...state, ...localStorageObject });
        return {
          ...state,
          ...localStorageObject
        };
      });
    }
  }, [onRetrievingData]);

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
      ...localStorageObject
    }));
  };

  const onChangeInput = (name, value) =>
    setSavedLocalStorageInfo((state) => ({
      ...state,
      [name]: value
    }));

  return (
    <MainPage
      savedInfo={savedLocalStorageInfo}
      handleSaveSettings={handleSaveSettings}
      handleCancelChangedSettings={handleCancelChangedSettings}
      onChangeInput={onChangeInput}
      onRetrievingData={setOnRetrievingData}
    />
  );
};

export default App;
