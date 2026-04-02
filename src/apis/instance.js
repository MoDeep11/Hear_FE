import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response, // 성공 시 그대로 반환
  async (error) => {
    const originalRequest = error.config;

    // 401 에러(만료)가 발생했고, 재시도한 적이 없을 때
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        // 서버의 재발급 엔드포인트 호출 (보통 /auth/refresh)
        // 주의: 재발급 요청은 무한 루프 방지를 위해 instance 대신 axios 생짜로 쓰거나 별도 설정 필요
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
          refreshToken: refreshToken
        });

        if (res.status === 200) {
          const newAccessToken = res.data.accessToken;
          const newRefreshToken = res.data.refreshToken;

          // 새로운 토큰들 저장
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // 실패했던 원래 요청의 헤더를 새 토큰으로 교체 후 재요청
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        }
      } catch (refreshError) {
        // 리프레시 토큰도 만료되었다면 로그아웃 처리
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;