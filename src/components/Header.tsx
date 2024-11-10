import React, { SetStateAction, useState } from "react";
import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
import Verical from "/public/assets/icon-vertical-ellipsis.svg";
import borad from "/public/assets/icon-board.svg";
import cross from "/public/assets/icon-cross.svg";
import data from "../data.json";

export default function Header({ onSelectBoard }) {
  const [showe, setshowe] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false); // New state for add task form
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [boards, setBoards] = useState(data.boards);

  const showes = () => {
    setshowe(!showe);
  };

  const handleBoardClick = (index: number | SetStateAction<null>) => {
    setSelectedIndex(index);
    onSelectBoard(boards[index]);
  };

  const addBoard = () => {
    const newBoard = { name: `Board ${boards.length + 1}` };
    setBoards((prevBoards) => [...prevBoards, newBoard]);
  };

  const click = () => {
    setShowAddTaskForm((prevState) => !prevState);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <div
          onClick={showes}
          className="flex gap-[15px] items-center justify-between cursor-pointer"
        >
          <img src={Logo} alt="Logo" />
          <h1 className="text-lg font-bold text-gray-800">Platform Launch</h1>
          <img src={Chevrondonw} alt="Chevron Down" />
        </div>

        <div className="flex items-center gap-[15px]">
          <div
            onClick={click}
            className="bg-[#635FC7] cursor-pointer w-[40px] h-[32px] flex justify-center items-center rounded-[10px]"
          >
            <img src={plus} alt="Add Task" />
          </div>
          <img src={Verical} alt="" />
        </div>
      </div>

      {showe && (
        <>
          <div
            onClick={showes}
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
          ></div>

          <div className="fixed inset-0 flex justify-center mt-[100px] z-20">
            <div className="bg-[#2B2C37] w-[240px] gap-[10px] flex flex-col bg-gray-100 shadow-lg rounded-md max-h-[300px] overflow-y-auto">
              <h1 className="mt-[10px] ml-[20px]">
                ALL BOARDS ({boards.length})
              </h1>

              {boards.map((board, index) => (
                <div
                  key={index}
                  onClick={() => handleBoardClick(index)}
                  className={`flex w-[220px] h-[48px]  hover:bg-[#635FC7]  rounded-br-[20px] rounded-tr-[20px] font-bold text-[15px] gap-[10px] items-center p-[20px] cursor-pointer
              ${
                selectedIndex === index
                  ? "bg-[#635FC7] text-white"
                  : "bg-[#ffffff]  text-gray-800"
              }`}
                >
                  <img src={borad} alt="Board Icon" />
                  <h1>{board.name}</h1>
                </div>
              ))}

              <div
                onClick={addBoard}
                className={
                  "flex w-[220px] h-[48px] rounded-br-[20px] rounded-tr-[20px] font-bold text-[15px] gap-[10px] items-center p-[20px] cursor-pointer text-gray-800 hover:bg-[#635FC7] hover:text-white"
                }
              >
                <img src={borad} alt="Board Icon" />
                <h1 className=" hover:text-[#ffffff] text-[#635FC7]">
                  + Create New Board
                </h1>
              </div>
            </div>
          </div>
        </>
      )}

      {showAddTaskForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#2B2C37] flex flex-col mt-[200px] gap-[30px] text-white p-[30px] w-[343px] h-[660px] rounded shadow-lg relative overflow-y-auto">
            {" "}
            {/* Add overflow-y-auto here */}
            <div className="flex items-center justify-between">
              <h1 className="text-[20px]">Add New Task</h1>
              <img
                className="cursor-pointer"
                onClick={click}
                src={cross}
                alt="Close"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <h1 className="text-[15px]">Title</h1>
              <input
                className="w-[295px] h-[40px] p-[10px] border bg-transparent border-[#828FA340]"
                type="text"
                placeholder="e.g. Take coffee break"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <h1>Description</h1>
              <textarea
                className="bg-transparent w-[295px] h-[100px] p-[10px] border border-[#828FA340] placeholder-top"
                placeholder="e.g. It’s always good to take a break. This 15-minute break will recharge the batteries a little."
                style={{ resize: "none", verticalAlign: "top" }} // Prevents resizing and aligns text at the top
              ></textarea>
            </div>
            <div className="flex flex-col gap-[10px]">
              <h1>Subtasks</h1>
              <div className="flex  gap-[16px] items-center">
                <input
                  className="border-[#828FA340]  w-[250px] p-[5px] border bg-transparent"
                  type="text"
                />
                <img className="cursor-pointer" src={cross} alt="Remove" />
              </div>

              <div className="flex items-center gap-[16px]">
                <input
                  className="bg-transparent w-[250px] border p-[5px] border-[#828FA340]"
                  type="text"
                />
                <img className="cursor-pointer" src={cross} alt="Remove" />
              </div>
            </div>
            <button className="bg-[#ffff] cursor-pointer p-[10px] rounded-[30px]">
              <h1 className="text-[#635FC7]">+ Add New Subtask</h1>
            </button>
            <button className="bg-[#1829db] cursor-pointer p-[10px] rounded-[30px]">
              Create Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
