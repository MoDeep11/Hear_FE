import instance from "./axios";

// 일기 조회
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
export const updateDiariesImg = async (diary_id, imageFile) => {
  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const res = await instance.patch(
      `/api/v1/diaries/${diary_id}/images`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data;
  } catch (error) {
    console.error("이미지 수정 실패:", error);
    throw error;
  }
};

// 일기 삭제
export const deleteDiaries = async (diary_id) => {
  try {
    const res = await instance.delete(`/api/v1/diaries/${diary_id}`);
    return res.data;
  } catch (error) {
    console.error("일기 삭제 실패:", error);
    throw error;
  }
};

// 일기 추천 조회
export const getDiariesRecommendation = async () => {
  try {
    const res = await instance.get(`/api/v1/diaries/recommendation`);
    return res.data;
  } catch (error) {
    console.error("일기 추천 조회 실패:", error);
    throw error;
  }
};
