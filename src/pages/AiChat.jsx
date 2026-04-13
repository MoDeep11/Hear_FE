import { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import {
  createChat,
  createChatMessage,
  createChatVoice,
  createChatImage,
} from "../apis/chat";
import Header from "../components/Header";
import Send from "../assets/send.svg";
import Plus from "../assets/ic_round-plus.svg";
import Voice from "../assets/voice.svg";
import Close from "../assets/CloseButton.svg";
import AiVoice from "../assets/AiVoice.svg";
import StartVoice from "../assets/StartVoice.svg";
import StopVoice from "../assets/StopVoice.svg";

const AiChat = () => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(StartVoice);
  const [isClicked, setIsClicked] = useState(false);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      console.log("🎙️ [startRecording] 음성 녹음 시작...");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
        console.log("오디오 청크 수신:", event.data.size, "bytes");
      };

      mediaRecorder.start();
      console.log("음성 녹음 시작됨");
    } catch (error) {
      console.error("음성 녹음 시작 실패:", error);
      alert("마이크 접근 권한이 필요합니다.");
    }
  };

  const stopRecording = () => {
    return new Promise((resolve, reject) => {
      console.log("음성 녹음 종료...");

      if (!mediaRecorderRef.current) {
        const error = new Error("녹음이 시작되지 않았습니다.");
        console.error("[stopRecording]", error);
        reject(error);
        return;
      }

      const mediaRecorder = mediaRecorderRef.current;
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        audioChunksRef.current = [];

        console.log("오디오 Blob 생성:", {
          size: audioBlob.size,
          type: audioBlob.type,
        });

        resolve(audioBlob);
      };

      mediaRecorder.stop();

      mediaRecorder.stream.getTracks().forEach((track) => {
        track.stop();
        console.log("스트림 트랙 종료");
      });
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("이미지 업로드 시작:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });

    const formData = new FormData();
    formData.append("file", file);

    try {
      await createChatImage(chatId, formData);
      console.log("이미지 업로드 성공");
      alert("이미지가 업로드되었습니다.");
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  useEffect(() => {
    const initChat = async () => {
      console.log("채팅 초기화 시작...");
      setIsLoading(true);
      try {
        const chatData = await createChat();

        console.log("채팅 생성 응답:", chatData);

        const newChatId = chatData.chatId;
        const initialMessage =
          chatData.initialMessage || "안녕하세요! 오늘 하루는 어떠셨나요?";

        if (!newChatId) {
          throw new Error("서버에서 chatId를 받지 못했습니다.");
        }

        console.log("🆔 [initChat] chatId 설정:", newChatId);
        setChatId(newChatId);

        const aiGreeting = {
          id: `ai-greeting-${Date.now()}`,
          text: initialMessage,
          isUser: false,
        };

        setMessages([aiGreeting]);
        console.log("초기 메시지 설정 완료");
      } catch (error) {
        console.error("채팅 초기화 실패:", {
          message: error?.message,
          status: error?.response?.status,
          data: error?.response?.data,
        });

        setMessages([
          {
            id: "error",
            text: "서비스를 초기화하는 데 실패했습니다. 잠시 후 다시 시도해주세요.",
            isUser: false,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !chatId) {
      console.warn("전송 불가:", {
        input_empty: !input.trim(),
        isLoading,
        chatId_exists: !!chatId,
      });
      return;
    }

    const userMessage = {
      id: `msg-${Date.now()}`,
      text: input,
      isUser: true,
    };

    console.log(
      "메시지 전송:",
      userMessage.text.substring(0, 50),
    );

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await createChatMessage(chatId, { message: input });

      console.log("AI 응답 수신:", response);

      const aiResponse = {
        id: `msg-${Date.now() + 1}`,
        text:
          response.data?.aiContent ||
          response.aiContent ||
          "답변을 가져오지 못했습니다.",
        isUser: false,
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("메시지 전송 실패:", error);
      alert("메시지 전송에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClick = async () => {
    if (!isClicked) {
      console.log("녹음 시작");
      setIsStart(StopVoice);
      setIsClicked(true);
      await startRecording();
    } else {
      console.log("녹음 종료 및 업로드");
      setIsStart(StartVoice);
      setIsClicked(false);

      try {
        const voiceBlob = await stopRecording();

        const url = URL.createObjectURL(voiceBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "test-audio.webm";
        a.click();

        if (!voiceBlob || voiceBlob.size === 0) {
          throw new Error("음성 데이터가 없습니다.");
        }

        console.log("오디오 Blob 생성 완료:", {
          size: voiceBlob.size,
          type: voiceBlob.type,
        });

        setIsLoading(true);

        console.log("음성 업로드 시작...");
        await createChatVoice(chatId, voiceBlob);

        setIsOpen(false);
        console.log("음성 업로드 성공");
        alert("음성이 전송되었습니다.");
      } catch (error) {
        console.error("음성 업로드 실패:", {
          message: error?.message,
          status: error?.response?.status,
          data: error?.response?.data,
        });
        alert("음성 전송에 실패했습니다: " + error.message);
      } finally {
        setIsLoading(false);
      }
    }
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
          {isLoading && (
            <AiBubble>
              답변을 생각 중이에요<LoadingDots>...</LoadingDots>
            </AiBubble>
          )}
          <div ref={bottomRef} />
        </ChatBox>
      </ChatContainer>

      <SendFormWrapper>
        <SendForm>
          <SendInputBox>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
            <img
              src={Plus}
              alt="첨부"
              style={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current?.click()}
            />
            <SendText
              type="text"
              placeholder={
                chatId ? "오늘 하루를 들려주세요." : "연결 중입니다..."
              }
              value={input}
              disabled={!chatId || isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <MicButton onClick={() => setIsOpen(true)} type="button">
              <img src={Voice} alt="음성입력" />
            </MicButton>
          </SendInputBox>
          <SendButton
            type="button"
            onClick={handleSend}
            disabled={isLoading || !input.trim() || !chatId}
            style={{ opacity: isLoading || !chatId ? 0.5 : 1 }}
          >
            <img src={Send} alt="전송" />
          </SendButton>
        </SendForm>
      </SendFormWrapper>

      {isOpen && (
        <ModalOverlay onClick={() => setIsOpen(false)}>
          <AiVoiceBody onClick={(e) => e.stopPropagation()}>
            <CloseIcon
              src={Close}
              alt="닫기"
              onClick={() => setIsOpen(false)}
            />
            <AiVoiceContainer>
              <AiCharacterImg src={AiVoice} alt="Ai 음성" />
              <StartVoiceImg
                src={isStart}
                alt="음성 시작"
                onClick={handleClick}
              />
            </AiVoiceContainer>
          </AiVoiceBody>
        </ModalOverlay>
      )}
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
  @media (max-width: 1024px) {
    padding: 30px 50px 20px;
  }
  @media (max-width: 768px) {
    padding: 20px 20px 15px;
  }
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
  word-break: break-all;
`;

const loadingAnimation = keyframes`
  0% { content: '.'; }
  33% { content: '..'; }
  66% { content: '...'; }
`;

const LoadingDots = styled.span`
  &::after {
    content: "";
    animation: ${loadingAnimation} 1.5s infinite;
  }
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
  word-break: break-all;
`;

const SendFormWrapper = styled.div`
  background: white;
  padding: 16px 253px 24px;
  border-top: 1px solid #f0f0f0;
  @media (max-width: 1024px) {
    padding: 16px 50px 24px;
  }
  @media (max-width: 768px) {
    padding: 10px 10px 15px;
  }
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
  &:disabled {
    cursor: not-allowed;
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
  transition: background-color 0.2s;
  &:hover {
    background-color: #f7c948;
  }
  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
  }
  img {
    width: 20px;
    height: 20px;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const AiVoiceBody = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  width: 800px;
  height: 500px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 90%;
    height: 80%;
  }
`;

const CloseIcon = styled.img`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const AiVoiceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 60px 0;
  box-sizing: border-box;
`;

const AiCharacterImg = styled.img`
  margin-top: auto;
  height: auto;
  max-width: 100%;
`;

const StartVoiceImg = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
  margin-top: auto;
`;

export default AiChat;
