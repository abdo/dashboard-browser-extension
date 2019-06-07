import React, { useState, useEffect } from 'react';

import { localStorageObjectName } from './constants';
import MainPage from './pages/Main';

import './App.css';

// This file is mainly used to deal with info saved in local storage

const App = () => {
  const [savedLocalStorageInfo, setSavedLocalStorageInfo] = useState({
    userName: 'friend',
    timeFormat: '12'
  });

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
    setSavedLocalStorageInfo((state) => ({
      ...state,
      ...localStorageObject
    }));
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
    />
  );
};

export default App;
