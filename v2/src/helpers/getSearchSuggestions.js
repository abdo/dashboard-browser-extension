import axios from 'axios';

const getSearchSuggestions = (query) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/http://suggestqueries.google.com/complete/search?output=toolbar&q=${query}`,
      )
      .then((res) => {
        const xml = res.data;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, 'text/xml');

        const suggestionsArray = [];

        Array.prototype.slice
          .call(xmlDoc.getElementsByTagName('CompleteSuggestion'))
          .forEach((t) =>
            suggestionsArray.push(t.childNodes[0].getAttribute('data')),
          );
        resolve(suggestionsArray);
      })
      .catch(() => {
        reject("Couldn't get suggestions");
      });
  });
};

export default getSearchSuggestions;
