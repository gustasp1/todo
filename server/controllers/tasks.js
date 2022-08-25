const connection = require("../config/db");
const CustomError = require("../error/CustomError");

const Collection = connection.models.Collection;
const Task = connection.models.Task;

const getTasks = async (req, res, next) => {
  const collectionId = req.query.collectionId;

  try {
    const response = await Collection.findOne({ _id: collectionId }).populate(
      "tasks"
    );
    const tasks = response.tasks;

    res.json({ tasks, collectionName: response.name });
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

const updateTaskStatus = async (req, res, next) => {
  const { taskId, status } = req.body;
  try {
    await Task.findOneAndUpdate(
      { _id: taskId },
      { done: status },
      { new: true }
    );
    res.sendStatus(200);
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

const addTask = async (req, res, next) => {
  try {
    const { name, collectionId } = req.body;

    const newTask = new Task({
      name,
      done: false,
    });

    const savedTask = await newTask.save();
    const savedTaskId = savedTask._id;

    await Collection.findOneAndUpdate(
      { _id: collectionId },
      {
        $push: {
          tasks: savedTaskId,
        },
      },
      {
        new: true,
      }
    );
    res.sendStatus(200);
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.body.taskId;
    const collectionId = req.body.collectionId;

    await Task.findOneAndDelete(
      { _id: taskId },
      {
        new: true,
      }
    );

    await Collection.findOneAndUpdate(
      { _id: collectionId },
      {
        $pull: {
          tasks: {
            _id: taskId,
          },
        },
      },
      {
        new: true,
      }
    );
    res.sendStatus(200);
  } catch {
    next(CustomError.internal("Something went wrong"));
  }
};

module.exports = {
  getTasks,
  updateTaskStatus,
  addTask,
  deleteTask,
};
