import axios from "axios";

//TODO: change when deploying
const baseUrl = "/api/";

export const getTasksByCollection = async (id) => {
  return await axios.get(`${baseUrl}tasks?collectionId=${id}`, {
    withCredentials: true,
  });
};

export const addTaskService = async (collectionId, name) => {
  return await axios.post(
    `${baseUrl}tasks`,
    {
      name,
      collectionId,
    },
    {
      withCredentials: true,
    }
  );
};

export const setTaskDone = async (taskId, status) => {
  return await axios.patch(
    `${baseUrl}tasks`,
    { taskId, status },
    {
      withCredentials: true,
    }
  );
};

export const deleteTaskService = async (taskId, collectionId) => {
  return await axios.delete(`${baseUrl}tasks`, {
    data: { taskId, collectionId },
    withCredentials: true,
  });
};
