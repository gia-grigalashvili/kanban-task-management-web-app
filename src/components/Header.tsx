import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
import Verical from "/public/assets/icon-vertical-ellipsis.svg";

export default function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex gap-[15px] items-center justify-between">
        <img src={Logo} alt="Logo" className="" />
        <h1 className="text-lg font-bold text-gray-800">Platform Launch</h1>
        <img src={Chevrondonw} alt="Chevron Down" className="" />
      </div>

      <div className="flex items-center gap-[15px] ">
        <div className="bg-[#635FC7] w-[40px] h-[32px] flex justify-center items-center rounded-[10px]">
          <img src={plus} alt="Add Task" className="" />
        </div>
        <img src={Verical} alt="" />
      </div>
    </div>
  );
}
