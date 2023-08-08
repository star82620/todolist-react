import logo from "../../images/logo.png";

export default function Header({ userName }) {
  return (
    <header className="w-[1028px] flex justify-between items-center px-8 py-4">
      <div className="h-10">
        <img src={logo} alt="logo" />
      </div>
      <div className="flex">
        <p className="font-bold">{userName}的待辦清單</p>
        <a className="ml-6" href="">
          登出
        </a>
      </div>
    </header>
  );
}
