import axios from "axios";
import { geminiApiKey } from "../keys.ignore";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { defaultUserName, localStorageObjectName } from "../constants";
import getTime, { greetingPerTime } from "./getTime";

const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chat;

const askAI = (text) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          contents: [
            {
              parts: [{ text }],
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const answer =
          res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

        resolve(answer);
      })
      .catch(() => {
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

  chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: firstUserMessage,
          },
        ],
      },
      {
        role: "model",
        parts: [{ text: firstAIMessage }],
      },
    ],
  });

  return firstAIMessage;
};

const conversateWithAI = (msg) => {
  return new Promise((resolve, reject) => {
    chat
      .sendMessage(msg)
      .then((res) => {
        const answer =
          res?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const finishReason = res?.response?.candidates?.[0]?.finishReason || "";
        resolve({ answer, finishReason });
      })
      .catch(() => {
        reject("Couldn't get response from AI");
      });
  });
};

export { askAI, startAIChat, conversateWithAI, getAICompliment };
