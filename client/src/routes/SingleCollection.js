import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  addTaskService,
  deleteTaskService,
  getTasksByCollection,
} from "../services/tasks";
import Task from "../components/Task";
import Loader from "../components/Loader";
import { FaPlus } from "react-icons/fa";
import Error from "../components/Error";

const SingleCollection = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [doneTaskCount, setDoneTaskCount] = useState(0);
  const [collectionName, setCollectionName] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddTaskInput, setShowAddTaskInput] = useState(false);
  const [newTaskName, setNewTaskName] = useState("");
  const { collectionId } = useParams();

  useEffect(() => {
    updateTasks();
  }, []);

  useEffect(() => {
    countTasks();
  }, [tasks]);

  const updateTasks = async () => {
    try {
      const response = await getTasksByCollection(collectionId);
      const tasks = response.data.tasks;
      setCollectionName(response.data.collectionName);
      setTasks(tasks);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const countTasks = () => {
    setTaskCount(tasks.length);
    let doneCount = 0;
    tasks.forEach((currTask) => {
      if (currTask.done) {
        doneCount++;
      }
    });
    setDoneTaskCount(doneCount);
  };

  const deleteTask = (taskId) => {
    deleteTaskService(taskId, collectionId).then(() => {
      setTasks(tasks.filter((currTask) => currTask._id != taskId));

      updateTasks();
    });
  };

  const showTaskForm = () => {
    setShowAddTaskInput(true);
  };

  const addTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    addTaskService(collectionId, newTaskName).then(() => {
      setShowAddTaskInput(false);
      updateTasks();
      setNewTaskName("");
    });
  };

  if (loading) {
    return (
      <div className="main-container">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <div className="main-container">
        <div className="tasks-center">
          <div className="collection-page-top">
            <div className="collection-title">{collectionName}</div>
            <div className="task-count">
              {doneTaskCount} / {taskCount} tasks done
            </div>
          </div>
          {tasks.map((task) => {
            return (
              <Task
                key={task._id}
                doneTaskCount={doneTaskCount}
                setDoneTaskCount={setDoneTaskCount}
                task={task}
                deleteTask={deleteTask}
              />
            );
          })}
          {showAddTaskInput ? (
            <form className="add-task-form" onSubmit={addTask}>
              <input
                type="text"
                autoFocus
                className="add-task-input"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
              />
              <button className="btn">Add</button>
            </form>
          ) : (
            <div className="add-task" onClick={showTaskForm}>
              <FaPlus />
              Add a task
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleCollection;
