import axios from "axios";
import { groqApiKey } from "../keys.ignore";
import { defaultUserName, localStorageObjectName } from "../constants";
import getTime, { greetingPerTime } from "./getTime";

let chat = null;
let chatHistory = [];

const askAI = (text) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "gemma2-9b-it",
          messages: [{ role: "user", content: text }],
          temperature: 0.7,
          top_p: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
        }
      )
      .then((res) => {
        const answer = res.data?.choices?.[0]?.message?.content || "";
        resolve(answer);
      })
      .catch((error) => {
        console.error("Error calling Groq API:", error);
        reject("Couldn't ask AI");
      });
  });
};

const getAICompliment = () => {
  return new Promise((resolve, reject) => {
    askAI(
      "Create a random compliment for a person and send it to me, it could be about the soul, or the body, or the person's behavior.. etc. With a maximum of 10 words, make it gender-neutral, and do not mention the words 'kindness' or 'spirit' or 'laughter' or 'presence' or 'energy'"
    )
      .then((res) => {
        resolve(res);
      })
      .catch(() => {
        reject("Couldn't get ai compliment");
      });
  });
};

const startAIChat = () => {
  const savedData = JSON.parse(localStorage.getItem(localStorageObjectName));

  const userName = savedData?.userName || defaultUserName;
  const userTime = getTime("24");

  const firstUserMessage = `Hello (this is the user's first message to you,${
    userName !== defaultUserName ? ` his name is ${userName}` : ""
  } his time is ${userTime}, your nickname should be Filo throughout this conversation, instructions for your answers for the rest of this chat: make sure your answer is kind, caring, interesting, and most importantly brief and concise. Include an emoji when suitable)`;

  const greeting = greetingPerTime(savedData?.userName);
  let firstAIMessage = greeting;

  if (!firstAIMessage?.includes("?")) {
    firstAIMessage = `${greeting}, how are you today?`;
  }

  // Initialize chatHistory with the first messages
  chatHistory = [
    { role: "user", content: firstUserMessage },
    { role: "assistant", content: firstAIMessage },
  ];

  return firstAIMessage;
};

const conversateWithAI = (msg) => {
  return new Promise((resolve, reject) => {
    // Add user message to history
    chatHistory.push({ role: "user", content: msg });

    axios
      .post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.1-8b-instant",
          messages: chatHistory,
          temperature: 0.7,
          top_p: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${groqApiKey}`,
          },
        }
      )
      .then((res) => {
        const answer = res.data?.choices?.[0]?.message?.content || "";
        const finishReason = res.data?.choices?.[0]?.finish_reason || "";

        // Add assistant response to history
        chatHistory.push({ role: "assistant", content: answer });

        resolve({ answer, finishReason });
      })
      .catch((error) => {
        console.error("Error calling Groq API:", error);
        reject("Couldn't get response from AI");
      });
  });
};

export { askAI, startAIChat, conversateWithAI, getAICompliment };
