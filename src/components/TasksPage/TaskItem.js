import deleteTaskBtn from "../../images/deleteBtn.png";
import { token } from "./index";

// 單個 task
export default function TaskItem({
  id,
  content,
  completed,
  index,
  tasksState,
  setTasksState,
  handleDone,
  handleValue,
  handleDelete,
}) {
  return (
    <div className="flex group" key={id}>
      <label className="w-full flex items-start grow pb-4  border-b">
        <input
          className="appearance-none checkedStyle"
          type="checkbox"
          defaultChecked={completed}
          onChange={() => handleDone(index, id)}
        />
        <input
          className="grow ml-4 min-h-[14px] border-baseline-gray-500 focus:outline-none  focus:text-primary-gray focus:font-bold"
          type="text"
          defaultValue={content}
          onChange={(e) => handleValue(index, id, e.target.value)}
        />
      </label>
      <button
        className="ml-4 flex items-start invisible group-hover:visible"
        type="button"
        onClick={() => handleDelete(index, id)}
      >
        <img className="" src={deleteTaskBtn} alt="deleteTaskBtn" />
      </button>
    </div>
  );
}
