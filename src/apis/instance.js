import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = []; 
};

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return instance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/auth/reissue`,
          { refreshToken: refreshToken }
        );

        if (res.data.status === "success") {
          const { accessToken, refreshToken: newRefreshToken } = res.data.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          processQueue(null, accessToken);
          
          return instance(originalRequest);
        } else {
          const failError = new Error("토큰 리프레시가 실패했어요");
          processQueue(failError, null);
          return Promise.reject(failError);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        
        const status = refreshError.response?.status;
        if (status === 401 || status === 403) {
          console.warn("세션이 만료되었습니다. 다시 로그인해주세요.");
          localStorage.clear();
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);

export default instance;