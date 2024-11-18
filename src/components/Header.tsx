import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
import Verical from "/public/assets/icon-vertical-ellipsis.svg";

export default function Header({ boards, setBoards }) {
  const [showtasks, setShowtasks] = useState(false);
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newColumns, setNewColumns] = useState([{ name: "", tasks: [] }]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

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

  const toggleDropdown = () => {
    setShowtasks((prevState) => !prevState);
  };

  const addNewColumn = () => {
    setNewColumns([...newColumns, { name: "", tasks: [] }]);
  };

  const handleColumnChange = (index, value) => {
    const updatedColumns = [...newColumns];
    updatedColumns[index].name = value;
    setNewColumns(updatedColumns);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <div
          onClick={toggleDropdown}
          className="flex gap-[15px] items-center justify-between cursor-pointer"
        >
          <img src={Logo} alt="Logo" />
          <h1 className="text-lg font-bold text-gray-800">Platform Launch</h1>
          <img src={Chevrondonw} alt="Chevron Down" />
        </div>

        <div className="flex items-center gap-[15px]">
          <div className="bg-[#635FC7] cursor-pointer w-[40px] h-[32px] flex justify-center items-center rounded-[10px]">
            <img src={plus} alt="Add Task" />
          </div>
          <img src={Verical} alt="Menu" />
        </div>
      </div>

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
            <ul>
              {boards.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setShowtasks(false);
                    navigate(`/board/${item.name}`);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                >
                  {item.name}
                </li>
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
