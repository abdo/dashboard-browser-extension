import { Button as AntdButton, Input, Typography } from "antd";
import styled, { keyframes } from "styled-components";

const { TextArea: AntdTextArea } = Input;

const { Paragraph: AntdParagraph } = Typography;

const chatPopAnimation1 = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(5px, 0); }
  50% { transform: translate(5px, -5px); }
  75% { transform: translate(0, -5px); }
  100% { transform: translate(0, 0); }
`;

const chatPopAnimation2 = keyframes`
  0% { transform: translate(0, 0); }
  25% { transform: translate(0, 5px); }
  50% { transform: translate(-5px, 5px); }
  75% { transform: translate(-5px, 0); }
  100% { transform: translate(0, 0); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
  justify-content: end;
  position: absolute;
  right: 25px;
  bottom: 30%;
  height: 55%;
  padding: 20px 20px 0;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 20px;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  height: 80%;
  padding: 5px;
`;

const AnimatedButton1 = styled.div`
  animation: ${chatPopAnimation1} 2s linear infinite;
`;

const AnimatedButton2 = styled.div`
  animation: ${chatPopAnimation2} 2s linear infinite;
`;

const Button = styled(AntdButton)`
  max-width: 280px;
  white-space: pre-wrap;
  height: fit-content;
  text-align: start;
  user-select: text;
  position: relative;

  div[role="button"] {
    position: absolute;
    top: 2.5px;
    right: 2.5px;
    font-size: 12px;
    margin: 0;
    color: black;
  }

  > p {
    margin: 0;
  }

  a {
    color: #1717b9;
  }
`;

const TextArea = styled(AntdTextArea)`
  height: 60px !important;
  min-height: 60px !important;
  resize: none;
`;

const Star = styled.span`
  animation: ${chatPopAnimation1} 1.5s linear infinite;
  cursor: pointer;
  text-align: end;
`;

const CopyableText = styled(AntdParagraph)`
  margin: 0 !important;
  color: inherit;
  word-break: inherit;
  line-height: inherit;
  font-family: inherit;
  font-size: inherit;
  white-space: inherit;
  user-select: inherit;
  font-weight: inherit;

  > p {
    margin: 0;
  }
`;

export {
  Container,
  ChatContainer,
  AnimatedButton1,
  AnimatedButton2,
  Button,
  TextArea,
  Star,
  CopyableText,
};
