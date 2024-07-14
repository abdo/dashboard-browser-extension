import React, { useState } from "react";
import { TinyColor } from "@ctrl/tinycolor";
import { ConfigProvider, Space, Tooltip } from "antd";
import {
  Container,
  ChatContainer,
  AnimatedButton1,
  AnimatedButton2,
  AnimatedButton3,
  Button,
  TextArea,
  Star,
  CopyableText,
  Modal,
} from "./style";
import { conversateWithAI, startAIChat } from "../../helpers/askAI";
import { AITooltip } from "../../constants";
import Markdown from "react-markdown";

const colors1 = ["#6253E1", "#04BEFE"];
const colors2 = ["#437d6f", "#3ba99c"];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const AIMessaging = ({ AIMessages, setAIMessages }) => {
  const [userMessage, setUserMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onSendMessage = () => {
    if (!userMessage?.trim()) return;

    setAIMessages((messages) => [
      {
        role: "user",
        text: userMessage,
      },
      ...messages,
    ]);

    conversateWithAI(userMessage)
      .then(({ answer, finishReason }) => {
        let AIMessage = answer;

        if (!AIMessage?.trim() && finishReason) {
          AIMessage = `An error occurred due to ${finishReason}, try again.`;
          startAIChat();
        } else if (!AIMessage?.trim()) {
          return;
        }

        setAIMessages((messages) => [
          {
            role: "model",
            text: AIMessage,
          },
          ...messages,
        ]);
      })
      .catch((e) => {
        const AIMessage = "An error occurred, try again.";
        setAIMessages((messages) => [
          {
            role: "model",
            text: AIMessage,
          },
          ...messages,
        ]);
      });

    setUserMessage("");
  };

  const renderButton1 = ({ text, isModal }) => (
    <AnimatedButton1>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                colors1
              ).join(", ")})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                colors1
              ).join(", ")})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button
          type="primary"
          size="large"
          style={{
            maxWidth: isModal ? "fit-content" : "280px",
          }}
        >
          {text}
        </Button>
      </ConfigProvider>
    </AnimatedButton1>
  );

  const renderButton2 = ({ text, isCopyable, isModal }) => (
    <AnimatedButton2>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              colorPrimary: `linear-gradient(135deg, ${colors2.join(", ")})`,
              colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                colors2
              ).join(", ")})`,
              colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                colors2
              ).join(", ")})`,
              lineWidth: 0,
            },
          },
        }}
      >
        <Button
          type="primary"
          size="large"
          style={{
            maxWidth: isModal ? "fit-content" : "280px",
          }}
        >
          <CopyableText
            copyable={
              isCopyable
                ? {
                    text,
                  }
                : false
            }
          >
            <Markdown
              components={{
                a: ({ node, ...props }) => (
                  <a {...props} target="_blank" rel="noreferrer" />
                ),
              }}
            >
              {text}
            </Markdown>
          </CopyableText>
        </Button>
      </ConfigProvider>
    </AnimatedButton2>
  );

  const renderChat = ({ isModal }) => (
    <Container
      style={{
        position: isModal ? "initial" : "absolute",
        height: isModal ? "100%" : "55%",
      }}
    >
      {isModal ? null : (
        <Star>
          <Tooltip placement="bottom" title={AITooltip}>
            <span role="img" aria-label="star" style={{ fontSize: 20 }}>
              ⭐
            </span>
            <span
              role="img"
              aria-label="expand"
              style={{ fontSize: 20 }}
              onClick={() => setIsModalVisible(true)}
            >
              ⛶
            </span>
          </Tooltip>
        </Star>
      )}

      <TextArea
        onPressEnter={onSendMessage}
        onChange={(e) =>
          setUserMessage(
            e.target.value?.startsWith("\n")
              ? e.target.value.slice(1)
              : e.target.value
          )
        }
        value={userMessage}
        placeholder="Tell Filo Something"
        autoFocus
      />

      <ChatContainer>
        {AIMessages.map(({ role, text: message }, i) =>
          role === "model"
            ? renderButton2({
                text: message?.trim(),
                isCopyable: Math.abs(i - AIMessages.length) > 3,
                isModal,
              })
            : renderButton1({ text: message?.trim(), isModal })
        )}
      </ChatContainer>
    </Container>
  );

  return (
    <>
      {renderChat({})}
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {renderChat({ isModal: true })}
      </Modal>
    </>
  );
};

export default AIMessaging;
