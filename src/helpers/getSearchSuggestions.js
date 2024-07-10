import axios from "axios";

const getSearchSuggestions = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://corsproxy.io/?https://search.brave.com/api/suggest?q=${query}`
      )
      .then((res) => {
        const suggestionsArray = res?.data?.[1] || [];

        resolve(suggestionsArray);
      })
      .catch(() => {
        reject("Couldn't get suggestions");
      });
  });
};

export default getSearchSuggestions;
