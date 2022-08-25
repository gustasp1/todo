import axios from "axios";

//TODO: change when deploying
const baseUrl = "/api/";

export const getUserCollections = async () => {
  return await axios.get(`${baseUrl}collections`, {
    withCredentials: true,
  });
};

export const addCollection = async (name) => {
  return await axios.post(
    `${baseUrl}collections`,
    {
      name,
    },
    {
      withCredentials: true,
    }
  );
};

export const deleteCollection = async (collectionId) => {
  return await axios.delete(`${baseUrl}collections`, {
    data: { collectionId },
    withCredentials: true,
  });
};

export const changeCollectionName = async (collectionId, newName) => {
  return await axios.patch(
    `${baseUrl}collections`,
    { collectionId, newName },
    {
      withCredentials: true,
    }
  );
};
