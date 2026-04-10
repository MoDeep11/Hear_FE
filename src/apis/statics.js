import instance from "./instance";

export const getStatistics = async (year, month) => {
  const yearMonth = `${year}-${String(month).padStart(2, "0")}`;
  const response = await instance.get(`/api/v1/users/me/statistics?yearMonth=${yearMonth}`);
  return response.data;
};