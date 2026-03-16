import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import Header from "../components/Header";
import Send from "../assets/send.svg";
import Plus from "../assets/ic_round-plus.svg";
import Voice from "../assets/voice.svg";

const INITIAL_MESSAGES = [
  {
    id: 1,
    text: "안녕하세요, 사용자님. 오늘도 감정 일기를 작성하러 와주셨네요!\nHear가 당신의 이야기를 차분히 듣고 정리해 드릴게요.",
    isUser: false,
  },
  {
    id: 2,
    text: "오늘 하루는 어떻게 흘러갔나요?\n그중에서도 특히 기억에 남는 순간이나, 마음을 잠시 멈추게 했던 일이 있었나요?\n아주 사소한 일이어도 괜찮아요.\n기뻤던 일, 조금 서운했던 일, 이유 없이 마음이 복잡했던 순간까지 모두 좋습니다.\n지금 가장 먼저 떠오르는 장면을 이야기해 주세요!",
    isUser: false,
  },
];

const AiChat = () => {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, isUser: true },
    ]);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <Body>
      <Header />
      <ChatContainer>
        <ChatBox>
          {messages.map((msg) =>
            msg.isUser ? (
              <UserBubble key={msg.id}>{msg.text}</UserBubble>
            ) : (
              <AiBubble key={msg.id}>
                {msg.text.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </AiBubble>
            ),
          )}
          <div ref={bottomRef} />
        </ChatBox>
      </ChatContainer>
      <SendFormWrapper>
        <SendForm>
          <SendInputBox>
            <img src={Plus} alt="첨부" />
            <SendText
              type="text"
              placeholder="오늘 하루를 들려주세요."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <MicButton type="button">
              <img src={Voice} alt="" />
            </MicButton>
          </SendInputBox>
          <SendButton type="button" onClick={handleSend}>
            <img src={Send} alt="전송" />
          </SendButton>
        </SendForm>
      </SendFormWrapper>
    </Body>
  );
};

const Body = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 40px 253px 24px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AiBubble = styled.div`
  box-shadow: 0 0 2px #575141;
  border-radius: 0 24px 24px;
  padding: 18px 22px;
  font-size: 14px;
  line-height: 1.8;
  color: #333;
  max-width: 520px;
  width: fit-content;
`;

const UserBubble = styled.div`
  background-color: #fcd671;
  border-radius: 24px 0 24px 24px;
  padding: 14px 20px;
  font-size: 14px;
  line-height: 1.7;
  color: #333;
  max-width: 400px;
  width: fit-content;
  align-self: flex-end;
`;

const SendFormWrapper = styled.div`
  background: white;
  padding: 16px 253px 24px;
  border-top: 1px solid #f0f0f0;
`;

const SendForm = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 14px;
  align-items: center;
`;

const SendInputBox = styled.div`
  width: 100%;
  border: 1.5px solid #c8c8c8;
  border-radius: 50px;
  display: flex;
  align-items: center;
  height: 52px;
  padding: 0 16px;

  img {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
`;

const SendText = styled.input`
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  margin: 0 8px;

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    outline: none;
  }
`;

const MicButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const SendButton = styled.button`
  background-color: #fcd671;
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 20px;
    height: 20px;
  }
`;

export default AiChat;
