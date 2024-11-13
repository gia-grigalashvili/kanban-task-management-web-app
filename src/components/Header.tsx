import React, { useState } from "react";
import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
import Verical from "/public/assets/icon-vertical-ellipsis.svg";
import borad from "/public/assets/icon-board.svg";
import cross from "/public/assets/icon-cross.svg";
import data from "../data.json";

export default function Header({ onSelectBoard, boards, setBoards }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [showBoardForm, setShowBoardForm] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([""]);
  const [errors, setErrors] = useState({ boardName: "", columns: [] });

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleBoardClick = (index) => {
    setSelectedIndex(index);
    onSelectBoard(boards[index]);
    setShowDropdown(false);
  };

  const addBoard = () => {
    setShowBoardForm(true);
    setShowDropdown(false);
  };

  const handleAddColumn = () => {
    setColumns([...columns, ""]);
    setErrors((prevErrors) => ({
      ...prevErrors,
      columns: [...prevErrors.columns, ""],
    }));
  };

  const handleRemoveColumn = (index) => {
    setColumns(columns.filter((_, i) => i !== index));
    setErrors((prevErrors) => ({
      ...prevErrors,
      columns: prevErrors.columns.filter((_, i) => i !== index),
    }));
  };

  const handleColumnChange = (index, value) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);

    // Clear error if column input is filled
    if (value.trim() !== "") {
      const newErrors = [...errors.columns];
      newErrors[index] = "";
      setErrors((prevErrors) => ({ ...prevErrors, columns: newErrors }));
    }
  };

  const handleCreateBoard = () => {
    const columnErrors = columns.map((col) =>
      col.trim() === "" ? "Column name is required" : ""
    );
    const boardNameError =
      boardName.trim() === "" ? "Board name is required" : "";

    setErrors({ boardName: boardNameError, columns: columnErrors });

    if (boardNameError || columnErrors.some((err) => err)) return;

    const newBoard = {
      name: boardName,
      columns: columns.map((name) => ({ name, tasks: [] })),
    };
    setBoards([...boards, newBoard]);
    setShowBoardForm(false);
    setBoardName("");
    setColumns([""]);
    setErrors({ boardName: "", columns: [] });
    setShowDropdown(true);
  };

  const closeBoardForm = () => {
    setShowBoardForm(false);
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
          <div
            onClick={() => setShowAddTaskForm((prevState) => !prevState)}
            className="bg-[#635FC7] cursor-pointer w-[40px] h-[32px] flex justify-center items-center rounded-[10px]"
          >
            <img src={plus} alt="Add Task" />
          </div>
          <img src={Verical} alt="Menu" />
        </div>
      </div>

      {showDropdown && (
        <>
          <div
            onClick={toggleDropdown}
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
          ></div>
          <div className="fixed inset-0 flex justify-center mt-[100px] z-20">
            <div className="bg-[#2B2C37] w-[270px] gap-[15px] flex flex-col bg-gray-100 shadow-lg rounded-md max-h-[340px] overflow-y-auto">
              <h1 className="mt-[10px] ml-[20px]">
                ALL BOARDS ({boards.length})
              </h1>
              {boards.map((board, index) => (
                <div
                  key={index}
                  onClick={() => handleBoardClick(index)}
                  className={`flex w-[220px] h-[48px] hover:bg-[#635FC7] rounded-br-[20px] rounded-tr-[20px] font-bold text-[15px] gap-[10px] items-center p-[20px] cursor-pointer ${
                    selectedIndex === index
                      ? "bg-[#635FC7] text-white"
                      : "bg-[#ffffff] text-gray-800"
                  }`}
                >
                  <img src={borad} alt="Board Icon" />
                  <h1>{board.name}</h1>
                </div>
              ))}
              <div
                onClick={addBoard}
                className="flex w-[220px] h-[48px] rounded-br-[20px] rounded-tr-[20px] font-bold text-[15px] gap-[10px] items-center p-[20px] cursor-pointer text-gray-800 hover:bg-[#635FC7] hover:text-white"
              >
                <img src={borad} alt="Board Icon" />
                <h1 className="hover:text-[#ffffff] text-[#635FC7]">
                  + Create New Board
                </h1>
              </div>
            </div>
          </div>
        </>
      )}

      {showBoardForm && (
        <div
          className="fixed inset-0 flex justify-center items-center z-30 bg-black bg-opacity-50"
          onClick={closeBoardForm}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing the modal
          >
            <h2 className="text-lg font-bold mb-4">Create New Board</h2>
            <input
              type="text"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              placeholder="Board Name"
              className="w-full p-2 border rounded mb-2"
            />
            {errors.boardName && (
              <p className="text-red-500 text-sm">{errors.boardName}</p>
            )}
            <h3 className="mt-4 mb-2 font-semibold">Board Columns</h3>
            {columns.map((column, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={column}
                  onChange={(e) => handleColumnChange(index, e.target.value)}
                  placeholder="Column Name"
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => handleRemoveColumn(index)}
                  className="text-red-500"
                >
                  X
                </button>
                {errors.columns[index] && (
                  <p className="text-red-500 text-sm">
                    {errors.columns[index]}
                  </p>
                )}
              </div>
            ))}
            <button
              onClick={handleAddColumn}
              className="bg-gray-200 text-sm px-2 py-1 rounded mt-2"
            >
              + Add New Column
            </button>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCreateBoard}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
