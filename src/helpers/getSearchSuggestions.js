const getSearchSuggestions = (query) => {
  return new Promise((resolve, reject) => {
    fetch(
      `http://suggestqueries.google.com/complete/search?output=toolbar&q=${query}`,
    ).then((res) => console.log(res));
  });
};

export default getSearchSuggestions;
