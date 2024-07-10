// obsolete
import axios from "axios";

export const quotesAPI1 =
  "https://8768zwfurd.execute-api.us-east-1.amazonaws.com/v1/compliments";
export const quotesAPI2 = "https://generator-online.com/api/v1/compliments";

const fetchQuote = () => {
  const request1 = (resolve) =>
    axios.get(quotesAPI1).then((res) => {
      const quote = res.data;

      resolve(quote);
    });

  const request2 = (resolve) =>
    axios
      .post(quotesAPI2, {
        language: "en",
        gender: Math.random() > 0.5 ? "male" : "female",
      })
      .then((res) => {
        const quote = res.data.data.result.value;

        resolve(quote);
      });

  return new Promise((resolve, reject) => {
    const request = Math.random() > 0.5 ? request1 : request2;

    request(resolve).catch(() => {
      reject("Couldn't get quote");
    });
  });
};

export default fetchQuote;
