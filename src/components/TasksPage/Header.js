import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

export default function Header({ userName }) {
  function handleLogout() {
    localStorage.removeItem("userToken");
  }

  return (
    <header className="w-[1028px] flex justify-between items-center px-8 py-4">
      <div className="h-10">
        <img className="h-[40px]" src={logo} alt="logo" />
      </div>
      <div className="flex">
        <p className="font-bold">{userName}的待辦清單</p>
        <Link to="/" className="ml-6" onClick={handleLogout}>
          登出
        </Link>
      </div>
    </header>
  );
}
