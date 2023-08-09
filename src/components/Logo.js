import logo from "../images/logo.png";

export default function Logo({ width, height }) {
  return (
    <div className={`w-[${width}px] h-[${height}px]`}>
      <img className="w-full h-auto" src={logo} alt="logo" />
    </div>
  );
}
