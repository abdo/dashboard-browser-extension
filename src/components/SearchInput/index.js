import { Input, Button } from 'antd';
import React from 'react';

import './style.css';

const { Search } = Input;

const SearchInput = () => {
  const onSearch = (query) => {
    window.location.assign(`https://www.google.com/search?q=${query}`);
  };

  return (
    <div className='searchInputContainer'>
      <Search
        onSearch={onSearch}
        placeholder='Search the web'
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
    </div>
  );
};

export default SearchInput;
