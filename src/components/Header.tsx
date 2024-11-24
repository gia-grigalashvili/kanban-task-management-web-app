import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
import Verical from "/public/assets/icon-vertical-ellipsis.svg";
import boardig from "/public/assets/icon-board.svg";

export default function Header({ activeBoard, boards, setBoards }) {
  const [showtasks, setShowtasks] = useState(false);
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newColumns, setNewColumns] = useState([{ name: "", tasks: [] }]);
  const [error, setError] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [subtasks, setSubtasks] = useState([{ name: "", done: false }]);
  const [selectedColumn, setSelectedColumn] = useState("");

  const toggleAddTaskForm = () => {
    setShowAddTaskForm(!showAddTaskForm);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, { name: "", done: false }]);
  };
  const handleColumnChange = (index, value) => {
    const updatedColumns = [...newColumns];
    updatedColumns[index].name = value;
    setNewColumns(updatedColumns);
  };
  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index].name = value;
    setSubtasks(updatedSubtasks);
  };
  const handleCreateBoard = () => {
    const emptyColumns = newColumns.some((col) => !col.name.trim());
    if (!newBoardName.trim() || emptyColumns) {
      setError("Please fill in all fields before creating a new board.");
      return;
    }

    const newBoard = {
      name: newBoardName,
      columns: newColumns.filter((col) => col.name),
    };

    setBoards((prevBoards) => [...prevBoards, newBoard]);
    setShowNewBoardForm(false);
    setShowtasks(true);
    setNewBoardName("");
    setNewColumns([{ name: "", tasks: [] }]);
    setError("");
  };

  const addNewColumn = () => {
    setNewColumns([...newColumns, { name: "", tasks: [] }]);
  };
  const handleTaskSubmit = () => {
    if (
      !taskTitle.trim() ||
      !selectedColumn.trim() ||
      subtasks.some((s) => !s.name.trim())
    ) {
      setError("Please fill in all fields before submitting the task.");
      return;
    }

    const updatedBoards = boards.map((board) => {
      if (board.columns.some((col) => col.name === selectedColumn)) {
        return {
          ...board,
          columns: board.columns.map((col) =>
            col.name === selectedColumn
              ? {
                  ...col,
                  tasks: [...col.tasks, { title: taskTitle, subtasks }],
                }
              : col
          ),
        };
      }
      return board;
    });

    setBoards(updatedBoards);
    setShowAddTaskForm(false);
    setTaskTitle("");
    setSubtasks([{ name: "", done: false }]);
    setSelectedColumn("");
    setError("");
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <div
          onClick={() => setShowtasks(!showtasks)}
          className="flex gap-[15px] items-center cursor-pointer"
        >
          <img src={Logo} alt="Logo" />
          <h1 className="text-lg font-bold text-gray-800">Platform Launch</h1>
          <img src={Chevrondonw} alt="Chevron Down" />
        </div>

        <div className="flex items-center gap-[15px]">
          <div
            onClick={toggleAddTaskForm}
            className="bg-[#635FC7] cursor-pointer w-[40px] h-[32px] flex justify-center items-center rounded-[10px]"
          >
            <img src={plus} alt="Add Task" />
          </div>
          <img src={Verical} alt="Menu" />
        </div>
      </div>

      {showAddTaskForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowAddTaskForm(false)}
        >
          <div
            className="absolute left-1/2 top-20 transform -translate-x-1/2 bg-white border rounded shadow-lg w-[90%] max-h-[500px] overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="p-2 text-lg font-bold text-gray-800 border-b">
              Add New Task
            </h2>
            <div className="p-4">
              <label className="block text-gray-800 font-semibold mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />

              <label className="block text-gray-800 font-semibold mb-2">
                Subtasks
              </label>
              {subtasks.map((subtask, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={subtask.name}
                    onChange={(e) => handleSubtaskChange(index, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => {
                      setSubtasks(subtasks.filter((_, i) => i !== index));
                    }}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={addSubtask}
                className="w-full p-2 text-center bg-gray-200 text-black rounded mb-4"
              >
                + Add Subtask
              </button>

              <label className="block text-gray-800 font-semibold mb-2">
                Assign to Column
              </label>
              <select
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="">Select a Column</option>
                {activeBoard?.columns.map((column, index) => (
                  <option key={index} value={index}>
                    {column.name}
                  </option>
                ))}
              </select>

              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                onClick={handleTaskSubmit}
                className="w-full p-2 text-center bg-blue-500 text-white rounded"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {showtasks && !showNewBoardForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowtasks(false)}
        >
          <div
            className="absolute left-1/2 top-20 transform -translate-x-1/2 bg-white border rounded shadow-lg w-[90%] max-h-[400px] overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="p-2 text-lg font-bold text-gray-800 border-b">
              Data Names
            </h2>
            <ul className="flex  flex-col ">
              {boards.map((item, index) => (
                <Link
                  to={item.name}
                  key={index}
                  onClick={() => {
                    setShowtasks(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                >
                  <div className="flex  gap-[10px] items-center">
                    {" "}
                    <img src={boardig} alt="" />
                    {item.name}
                  </div>
                </Link>
              ))}
            </ul>
            <button
              onClick={() => {
                setShowtasks(false);
                setShowNewBoardForm(true);
              }}
              className="w-full p-2 text-center bg-blue-500 text-white rounded mt-2"
            >
              + Create New Board
            </button>
          </div>
        </div>
      )}

      {showNewBoardForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowNewBoardForm(false)}
        >
          <div
            className="absolute left-1/2 top-20 transform -translate-x-1/2 bg-white border rounded shadow-lg w-[90%] max-h-[500px] overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="p-2 text-lg font-bold text-gray-800 border-b">
              Add New Board
            </h2>
            <div className="p-4">
              <label className="block text-gray-800 font-semibold mb-2">
                Board Name
              </label>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
              <label className="block text-gray-800 font-semibold mb-2">
                Board Columns
              </label>
              {newColumns.map((column, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={column.name}
                    onChange={(e) => handleColumnChange(index, e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => {
                      const updatedColumns = newColumns.filter(
                        (_, colIndex) => colIndex !== index
                      );
                      setNewColumns(updatedColumns);
                    }}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                onClick={addNewColumn}
                className="w-full p-2 text-center bg-gray-200 text-black rounded mb-4"
              >
                + Add Column
              </button>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                onClick={handleCreateBoard}
                className="w-full p-2 text-center bg-blue-500 text-white rounded"
              >
                Create New Board
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
