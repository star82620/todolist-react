import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";

export default function Header({ userName }) {
  const navigate = useNavigate;
  function logout() {
    localStorage.removeItem("userToken");
    navigate("/");
  }

  return (
    <header className="w-[1028px] flex justify-between items-center px-8 py-4">
      <div className="h-10">
        <Link to="/">
          <img className="h-[40px]" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex">
        <p className="font-bold">{userName}的待辦清單</p>
        <a className="ml-6" href="" onClick={logout}>
          登出
        </a>
      </div>
    </header>
  );
}
