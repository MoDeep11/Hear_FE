import instance from "./instance";

const logApiError = (label, error) => {
  const status = error?.response?.status;
  const message = error?.response?.data?.message ?? error?.message;
  console.error(label, { status, message });
};

// 채팅 생성
export const createChat = async () => {
  try {
    const res = await instance.post(`/api/v1/chats`);
    return res.data.data;
  } catch (error) {
    logApiError("채팅 생성 실패", error);
    throw error;
  }
};

// 채팅 음성 생성
export const createChatVoice = async (chatId, voiceBlob) => {
  try {
    const formData = new FormData();
    formData.append("voice", voiceBlob, "voice.webm");

    const res = await instance.post(`/api/v1/chats/${chatId}/voice`, formData, {
      headers: {
        "Content-Type": undefined,
      },
    });
    return res.data.data || res.data;
  } catch (error) {
    logApiError("음성 생성 실패:", error);
    throw error;
  }
};

// 채팅 메시지 전송
export const createChatMessage = async (chatId, messageData) => {
  try {
    const res = await instance.post(
      `/api/v1/chats/${chatId}/messages`,
      messageData,
    );
    return res.data.data;
  } catch (error) {
    logApiError("메시지 전송 실패", error);
    throw error;
  }
};

// 대화 중 사진 추가
export const createChatImage = async (chatId, imageFormData) => {
  try {
    const res = await instance.post(
      `/api/v1/chats/${chatId}/images`,
      imageFormData,
      {
        headers: {
          "Content-Type": undefined,
        },
      },
    );
    return res.data.data || res.data;
  } catch (error) {
    logApiError("이미지 생성 실패:", error);
    throw error;
  }
};

// AI 이미지 생성 요청
export const createChatImageGeneration = async (chatId, generationData) => {
  try {
    const res = await instance.post(
      `/api/v1/chats/${chatId}/images/generations`,
      generationData,
    );
    return res.data.data || res.data;
  } catch (error) {
    logApiError("이미지 생성 실패:", error);
    throw error;
  }
};

// 채팅 수정
export const updateChat = async (chatId) => {
  try {
    const res = await instance.patch(`/api/v1/chats/${chatId}`);
    return res.data;
  } catch (error) {
    logApiError("채팅 수정 실패:", error);
    throw error;
  }
};

export default {
  createChat,
  createChatVoice,
  createChatMessage,
  createChatImage,
  createChatImageGeneration,
  updateChat,
};
