import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import getToken from "../../helper/token";

export default function Header({ userName }) {
  const navigate = useNavigate();
  async function handleLogout() {
    const apiUrl = "https://todoo.5xcamp.us/users/sign_out";
    const authHeader = await getToken();
    const res = await fetch(apiUrl, {
      method: "DELETE",
      headers: authHeader,
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.removeItem("userToken");
      navigate("/todolist-react/");
    }
  }

  return (
    <header className="w-[1028px] flex justify-between items-center px-8 py-4">
      <div className="h-10">
        <img className="h-[40px]" src={logo} alt="logo" />
      </div>
      <div className="flex">
        <p className="font-bold">{userName}的待辦清單</p>
        <button className="ml-6" onClick={handleLogout}>
          登出
        </button>
      </div>
    </header>
  );
}
