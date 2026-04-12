import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
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
  (error) => Promise.reject(error),
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
        const accessToken = localStorage.getItem("accessToken");
        if (!refreshToken) {
          throw Object.assign(new Error("Missing refresh token"), {
            response: { status: 401 },
          });
        }

        const refreshHeaders = accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {};

        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/v1/auth/reissue`,
          { refreshToken },
          {
            headers: refreshHeaders,
            timeout: instance.defaults.timeout,
          },
        );

        if (res.data.status === "success") {
          const tokenPayload = res.data.data ?? res.data;
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            tokenPayload ?? {};
          if (!newAccessToken) {
            throw new Error("Token refresh response missing access token");
          }

          localStorage.setItem("accessToken", newAccessToken);
          if (newRefreshToken) {
            localStorage.setItem("refreshToken", newRefreshToken);
          }
          localStorage.setItem("tokenExpiry", Date.now() + 60 * 60 * 1000);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          return instance(originalRequest);
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);

        const status = refreshError.response?.status;
        if (status === 401 || status === 403) {
          console.warn("세션이 만료되어 로그아웃됩니다.");
          localStorage.clear();
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
