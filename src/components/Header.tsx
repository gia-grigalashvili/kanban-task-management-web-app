import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
import Verical from "/public/assets/icon-vertical-ellipsis.svg";
import borad from "/public/assets/icon-board.svg";
import { useState } from "react";

export default function Header() {
  const [showe, setshowe] = useState(false);

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
        <div className="absolute top-16 left-4 p-4 bg-gray-100 shadow-lg rounded-md">
          <h1>ALL BOARDS (3)</h1>
          <div>
            <img src={borad} alt="" />
            <h1>Platform Launch</h1>
          </div>
        </div>
      )}
    </div>
  );
}
