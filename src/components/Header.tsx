import Logo from "/public/assets/logo-mobile.svg";
import Chevrondonw from "/public/assets/icon-chevron-down.svg";
import plus from "/public/assets/icon-add-task-mobile.svg";
export default function Header() {
  return (
    <div>
      <img src={Logo} alt="" />
      <h1>Platform Launch</h1>
      <img src={Chevrondonw} alt="" />
      <img src={plus} alt="" />
    </div>
  );
}
