import emptyListImg from "../../images/emptyList.png";

export default function EmptyTasks() {
  return (
    <div className="mt-[60px] flex flex-col items-center">
      <p>目前尚無待辦事項</p>
      <div className="w-[240px] mt-4">
        <img src={emptyListImg} alt="emptyListImg" />
      </div>
    </div>
  );
}
