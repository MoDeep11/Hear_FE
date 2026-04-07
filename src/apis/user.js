import instance from "./instance";

// 사용자 정보 조회
export const getUserSummary = async () => {
  try {
    const res = await instance.get(`/api/v1/users/me/summary`);
    return res.data;
  } catch (error) {
    const status = error.response?.status;
    const message = error.response?.data?.message ?? error.message;
    console.error("사용자 요약 조회 실패", { status, message });
    throw error;
  }
};

// 캘린더 목록 조회
export const getCalendars = async (yearMonth) => {
  try {
    const res = await instance.get(`/api/v1/users/me/calendars`, {
      params: {
        yearMonth,
      },
    });
    return res.data;
  } catch (error) {
    console.error("상태 코드:", error.response?.status);
    console.error("에러 메시지:", error.response?.data);
    console.error("요청 헤더:", error.config?.headers);
    throw error;
  }
};
