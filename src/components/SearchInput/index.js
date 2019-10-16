import { Input, Button, Popover } from 'antd';
import React, { useState, useEffect } from 'react';

import getSearchSuggestions from '../../helpers/getSearchSuggestions';

import './style.css';

const { Search } = Input;

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [suggestionsArray, setSuggestionsArray] = useState([]);

  const [suggestionsListInvisible, setSuggestionsListInvisible] = useState(
    false,
  );

  useEffect(() => {
    if (!searchQuery) {
      setSuggestionsArray([]);
      return;
    }
    getSearchSuggestions(searchQuery).then((arr) => {
      setSuggestionsArray(arr);
    });
  }, [searchQuery]);

  const onSearch = (query) => {
    if (!query) return;
    window.location.assign(`https://www.google.com/search?q=${query}`);
  };

  const onType = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const suggestionsListVisible =
    !suggestionsListInvisible && searchQuery && suggestionsArray.length > 0;

  const suggestionsList = (
    <div className='searchSuggestionsContainer'>
      {suggestionsArray.map((searchSuggestion) => {
        const onClickSuggestion = () => {
          setSearchQuery(searchSuggestion);
        };
        return (
          <h4 className='searchSuggestion' onClick={onClickSuggestion}>
            {searchSuggestion}
          </h4>
        );
      })}
    </div>
  );

  return (
    <div className='searchInputContainer'>
      <Popover
        placement='bottom'
        visible={suggestionsListVisible}
        content={suggestionsList}
      >
        <Search
          onSearch={onSearch}
          onChange={onType}
          placeholder='Search the web'
          value={searchQuery}
          onFocus={() => setSuggestionsListInvisible(false)}
          onBlur={() =>
            setTimeout(() => {
              setSuggestionsListInvisible(true);
            }, 100)
          }
          enterButton={
            <Button
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                height: '100%',
              }}
            >
              <span role='img' aria-label='search'>
                🔍
              </span>
            </Button>
          }
          size='large'
        />
      </Popover>
    </div>
  );
};

export default SearchInput;
