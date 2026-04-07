import instance from "./instance";

// 일기 목록 조회
export const getDiariesList = async (params) => {
  try {
    const res = await instance.get(`/api/v1/diaries`, { params });
    return res.data;
  } catch (error) {
    console.error("일기 목록 조회 실패:", error);
    throw error;
  }
};

// 일기 단건 조회
export const getDiaries = async (id) => {
  try {
    const res = await instance.get(`/api/v1/diaries/${id}`);
    return res.data;
  } catch (error) {
    console.error("일기 조회 실패:", error);
    throw error;
  }
};

// 일기 내용 수정
export const updateDiaries = async (id, updateData) => {
  try {
    const res = await instance.patch(
      `/api/v1/diaries/${id}/content`,
      updateData,
    );
    return res.data;
  } catch (error) {
    console.error("일기 수정 실패:", error);
    throw error;
  }
};

// 일기 이미지 수정
export const updateDiariesImg = async (diaryId, imageList) => {
  try {
    const res = await instance.patch(
      `/api/v1/diaries/${diaryId}/images`,
      imageList,
    );
    return res.data;
  } catch (error) {
    console.error("이미지 수정 실패:", error);
    throw error;
  }
};

// 일기 삭제
export const deleteDiaries = async (diaryId) => {
  try {
    const res = await instance.delete(`/api/v1/diaries/${diaryId}`);
    return res.data;
  } catch (error) {
    console.error("일기 삭제 실패:", error);
    throw error;
  }
};

// 다이어리 추천 조회
export const getDiaryRecommendation = async () => {
  try {
    const res = await instance.get(`/api/v1/diaries/recommendation`);
    return res.data;
  } catch (error) {
    console.error("상태 코드:", error.response?.status);
    console.error("에러 메시지:", error.response?.data);
    console.error("요청 헤더:", error.config?.headers);
    throw error;
  }
};
