import Logo from "./Logo";
import cover from "../images/cover-sm.png";

export default function Cover() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Logo width="313" height="48" />
      <div className="w-[386px] mt-4">
        <img src={cover} alt="cover" />
      </div>
    </div>
  );
}
