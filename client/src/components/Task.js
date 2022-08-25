import React, { useState } from "react";
import { GrCheckbox, GrCheckboxSelected } from "react-icons/gr";
import { MdDelete, MdEdit } from "react-icons/md";
import { setTaskDone } from "../services/tasks";

const Task = ({ task, doneTaskCount, setDoneTaskCount, deleteTask }) => {
  const [done, setDone] = useState(task.done);
  const [hover, setHover] = useState(false);

  const checkBox = () => {
    const newStatus = !done;
    setDone(newStatus);
    if (newStatus) {
      setDoneTaskCount(doneTaskCount + 1);
    } else {
      setDoneTaskCount(doneTaskCount - 1);
    }

    setTaskDone(task._id, newStatus);
  };

  const mouseEnter = () => {
    setHover(true);
  };

  const mouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className={`task-container ${hover ? "task-container-hover" : null}`}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
    >
      {hover && (
        <div className="task-container-left">
          <div
            className="delete-btn-container"
            onClick={() => deleteTask(task._id)}
          >
            <MdDelete />
          </div>
        </div>
      )}
      <div className="task-container-right">
        <div className="checkbox-container" onClick={checkBox}>
          {done ? (
            <GrCheckboxSelected className="check-box" />
          ) : (
            <GrCheckbox className="check-box" />
          )}
        </div>

        <div className={`task noSelect ${done ? `done-task` : null}`}>
          {task.name}
        </div>
      </div>
    </div>
  );
};

export default Task;
