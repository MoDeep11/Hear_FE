import instance from "./instance";

export const getMyGallery = async (yearMonth, tag = "") => {
  const response = await instance.get('/api/v1/diaries?imageType=MANUAL&hasPhoto=true', {
    params: {
      imageType: 'MANUAL',
      hasPhoto: true,
      yearMonth: yearMonth, 
      limit: 32, 
      tag: tag || null,
      sort: 'createdAt,desc'
    }
  });
  return response.data;
};