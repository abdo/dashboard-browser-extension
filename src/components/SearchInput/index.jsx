import "./style.css";

import { Button, Input, Popover } from "antd";
import { useEffect, useState } from "react";

// import getSearchSuggestions from "../../helpers/getSearchSuggestions";

const { Search } = Input;

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [suggestionsArray, setSuggestionsArray] = useState([]);

  const [suggestionsListInvisible, setSuggestionsListInvisible] =
    useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setSuggestionsArray([]);
      return;
    }
    // getSearchSuggestions(searchQuery).then((arr) => {
    //   setSuggestionsArray(arr);
    // });
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
    <div className="searchSuggestionsContainer">
      {suggestionsArray.map((searchSuggestion) => {
        const onClickSuggestion = () => {
          setSearchQuery(searchSuggestion);
        };
        return (
          <h4
            key={searchSuggestion}
            className="searchSuggestion"
            onMouseDown={onClickSuggestion}
          >
            {searchSuggestion}
          </h4>
        );
      })}
    </div>
  );

  return (
    <div className="searchInputContainer">
      <Popover
        placement="bottom"
        visible={suggestionsListVisible}
        content={suggestionsList}
      >
        <Search
          onSearch={onSearch}
          onChange={onType}
          placeholder="Search"
          value={searchQuery}
          onFocus={() => setSuggestionsListInvisible(false)}
          onBlur={() =>
            setTimeout(() => {
              setSuggestionsListInvisible(true);
            }, 100)
          }
          enterButton={
            <Button
              type="primary"
              style={{
                backgroundColor: "rosybrown",
                height: "39px",
                width: "75px",
              }}
            >
              <span role="img" aria-label="search">
                🔍
              </span>
            </Button>
          }
          size="large"
        />
      </Popover>
    </div>
  );
};

export default SearchInput;
