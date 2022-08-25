import axios from "axios";

//TODO: change when deploying
const baseUrl = "/api/";

export const loginUser = async (username, password) => {
  return await axios.post(
    `${baseUrl}login`,
    { username, password },
    { withCredentials: true }
  );
};

export const registerUser = async (username, password) => {
  return await axios.post(
    `${baseUrl}register`,
    {
      username,
      password,
    },
    { withCredentials: true }
  );
};

export const logoutUser = async () => {
  return await axios.post(`${baseUrl}logout`, {
    withCredentials: true,
  });
};

export const getUserInfo = async () => {
  return await axios.get(`${baseUrl}user`, {
    withCredentials: true,
  });
};
