import React, { useState } from "react";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { sendPhoneNumber } from "../services/webhookService"; // Import the webhook service

function AddEditTaskModal({
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
  type,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);  
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );

  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  const handleSubmit = async () => {
    // Attempt to send phone number via webhook
    if (description) {
      try {
        const result = await sendPhoneNumber(description); // Send the phone number
        setAlertMessage({ message: result.message, success: true });
      } catch (error) {
        // If webhook fails, prevent submission and show alert
        setAlertMessage({ message: "Failed to send message, please try again.", success: false });
        return; // Prevent further submission
      }
    }
  
    // Filter out empty subtasks
    const filteredSubtasks = subtasks.filter((subtask) => subtask.title.trim() !== "");
  
    // Proceed with task submission if webhook was successful
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          subtasks: filteredSubtasks,  // Only add non-empty subtasks
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          subtasks: filteredSubtasks,  // Only edit non-empty subtasks
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  
    setIsAddTaskModalOpen(false);
    type === "edit" && setIsTaskModalOpen(false);
  };

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const handleCloseAlert = () => {
    setAlertMessage(null); // Close the alert by setting it to null
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-75 overflow-y-auto"
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      <div className="scrollbar-hide overflow-y-scroll max-h-[90vh] my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl relative">
        <h3 className="text-lg mb-4">
          {type === "edit" ? "Edit" : "Add New"} Task
        </h3>

        {/* Alert Message */}
        {alertMessage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleCloseAlert} // Close alert when clicking outside the alert box
        >
          <div
            className={`relative p-5 rounded-lg ${
              alertMessage.success ? "bg-green-500" : "bg-red-500"
            } text-white text-center w-[90%] max-w-sm backdrop-blur-md`}
            onClick={(e) => e.stopPropagation()} // Prevent the alert box itself from triggering the close
          >
            {alertMessage.message}

            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-white font-bold"
              onClick={handleCloseAlert} // Close the alert when clicking the 'X'
            >
              ✕
            </button>
          </div>
        </div>
      )}

        {/* Task Name */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">
            Lead Name
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            placeholder="Name of the lead"
          />
        </div>

        {/* Description (Phone Number) */}
        <div className="mt-8 flex flex-col space-y-1">
          <label className="text-sm dark:text-white text-gray-500">Number</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            className="bg-transparent outline-none min-h-[100px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
            placeholder="+91 928373382"
          />
        </div>

        {/* Subtasks */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">Subtasks</label>

          {subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                onChange={(e) => {
                  onChangeSubtasks(subtask.id, e.target.value);
                }}
                type="text"
                value={subtask.title}
                className="bg-transparent outline-none focus:border-0 flex-grow px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
                placeholder=" e.g Needs a 4BHK"
              />
              <img
                src={crossIcon}
                onClick={() => {
                  onDelete(subtask.id);
                }}
                className="m-4 cursor-pointer"
              />
            </div>
          ))}

          <button
            className="w-full items-center dark:text-[#635fc7] dark:bg-white text-white bg-[#635fc7] py-2 rounded-full"
            onClick={() => {
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ]);
            }}
          >
            + Add New Subtask
          </button>
        </div>

        {/* Current Status */}
        <div className="mt-8 flex flex-col space-y-3">
          <label className="text-sm dark:text-white text-gray-500">
            Current Status
          </label>
          <select
            value={status}
            onChange={onChangeStatus}
            className="select-status flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] outline-none"
          >
            {columns.map((col, index) => (
              <option key={index}>{col.name}</option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full items-center text-white bg-[#635fc7] py-2 rounded-full mt-8"
        >
          {type === "edit" ? "Save Edit" : "Create Task"}
        </button>
      </div>
    </div>
  );
}

export default AddEditTaskModal;