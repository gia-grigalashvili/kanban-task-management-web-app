import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
import Verical from "/public/assets/icon-vertical-ellipsis.svg";
import borad from "/public/assets/icon-board.svg";
import { useState } from "react";
import data from "../data.json"; // assuming your JSON structure has a "boards" key

export default function Header() {
  const [showe, setshowe] = useState(false);
  const boards = data.boards; // Make sure we're accessing the correct key

  const showes = () => {
    setshowe((prevState) => !prevState);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex gap-[15px] items-center justify-between">
        <img
          src={Logo}
          onClick={showes}
          alt="Logo"
          className="cursor-pointer"
        />
        <h1 className="text-lg font-bold text-gray-800">Platform Launch</h1>
        <img src={Chevrondonw} alt="Chevron Down" className="" />
      </div>

      <div className="flex items-center gap-[15px]">
        <div className="bg-[#635FC7] w-[40px] h-[32px] flex justify-center items-center rounded-[10px]">
          <img src={plus} alt="Add Task" className="" />
        </div>
        <img src={Verical} alt="" />
      </div>

      {showe && (
        <div className="absolute top-16 bg-[#2B2C37] left-4 w-[240px] gap-[10px] flex flex-col bg-gray-100 shadow-lg rounded-md">
          <h1 className="mt-[10px] ml-[20px]">ALL BOARDS ({boards.length})</h1>
          {Array.isArray(boards) &&
            boards.map((board) => (
              <div
                key={board.id}
                className="flex w-[200px] h-[48px] rounded-br-[20px] rounded-tr-[20px] font-bold text-[15px] gap-[10px] items-center justify-center bg-[#635FC7]"
              >
                <img className="" src={borad} alt="Board Icon" />
                <h1>{board.name}</h1>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
