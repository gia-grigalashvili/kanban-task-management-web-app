import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
import Verical from "/public/assets/icon-vertical-ellipsis.svg";
import borad from "/public/assets/icon-board.svg";
import { SetStateAction, useState } from "react";
import data from "../data.json"; // Assuming your JSON structure has a "boards" key

export default function Header() {
  const [showe, setshowe] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [boards, setBoards] = useState(data.boards); // Now boards are stored in state for dynamic updates

  const showes = () => {
    setshowe((prevState) => !prevState);
  };

  const handleBoardClick = (index: number | SetStateAction<null>) => {
    setSelectedIndex(index);
  };

  // Function to add a new board dynamically
  const addBoard = () => {
    const newBoard = { name: `Board ${boards.length + 1}` };
    setBoards([...boards, newBoard]);
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
          <div className="bg-[#635FC7] w-[40px] h-[32px] flex justify-center items-center rounded-[10px]">
            <img src={plus} alt="Add Task" onClick={addBoard} />{" "}
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

          <div className="fixed inset-0 flex justify-center max-h-[300px] mt-[100px] z-20">
            <div className="bg-[#2B2C37] w-[240px] gap-[10px] flex flex-col bg-gray-100 shadow-lg rounded-md">
              <h1 className="mt-[10px] ml-[20px]">
                ALL BOARDS ({boards.length}){" "}
              </h1>
              {Array.isArray(boards) &&
                boards.map((board, index) => (
                  <div
                    key={index}
                    onClick={() => handleBoardClick(index)}
                    className={`flex w-[200px] h-[48px] rounded-br-[20px] rounded-tr-[20px] font-bold text-[15px] gap-[10px] items-center p-[20px] cursor-pointer 
                      ${
                        selectedIndex === index
                          ? "bg-[#635FC7] text-white"
                          : "bg-[#E4EBFA] hover:bg-[#A8B4FF] text-gray-800"
                      }`}
                  >
                    <img className="" src={borad} alt="Board Icon" />
                    <h1>{board.name}</h1>
                  </div>
                ))}

              <div
                onClick={addBoard}
                className="flex w-[200px] h-[48px] rounded-br-[20px] rounded-tr-[20px] font-bold text-[15px] gap-[10px] items-center p-[20px] cursor-pointer bg-[#E4EBFA] hover:bg-[#A8B4FF] text-gray-800"
              >
                <img className="" src={borad} alt="Board Icon" />
                <h1>+ Create New Board</h1>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
