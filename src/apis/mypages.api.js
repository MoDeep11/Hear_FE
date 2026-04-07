import instance from "./instance";

export const getMyInfo = async () => {
  const response = await instance.get("/api/v1/users/me");
  return response.data;
};

export const withdrawAccount = async () => {
  const response = await instance.delete("/api/v1/auth/me");
  return response.data;
};

export const updateProfile = async (formData) => {
  const response = await instance.patch('/api/v1/users/me/profile', formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  });
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await instance.patch('/api/v1/users/me/password', passwordData);
  console.log(passwordData)
  return response.data;
};

export const deleteUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await instance.delete('/api/v1/users/me', {
    data: {
      refreshToken: refreshToken
    }
  });
  return response.data;
};