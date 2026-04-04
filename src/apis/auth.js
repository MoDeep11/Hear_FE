import instance from "./instance";

export const sendAuthcode = async (email, type) => {
    const response = await instance.post('/api/v1/auth/email', {email, type});
    return response.data;
}

export const authCode = async (email, code, type) => {
    const response = await instance.post('/api/v1/auth/email-tickets', { email, code, type });
    return response.data;
}

export const signUp = async (userData) => {
    const response = await instance.post('/api/v1/auth/register', userData);
    return response.data;
}

export const login = async (userData) => {
  const response = await instance.post('/api/v1/auth/login', userData);
  return response.data; 
};

// apis/auth.js

export const logout = async (refreshToken) => {
  const response = await instance.post('/api/v1/auth/logout', {
    refreshToken: refreshToken
  });
  return response.data;
};