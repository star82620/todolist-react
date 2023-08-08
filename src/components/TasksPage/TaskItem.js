import deleteTaskBtn from "../../images/deleteBtn.png";

// Update: edit
// 修改 input 內容時，要這個內容同時傳回 data
//

// 單個 task
export default function TaskItem({
  id,
  content,
  isDone,
  index,
  tasksState,
  setTasksState,
  handleDone,
  handleValue,
  handleDelete,
}) {
  return (
    <div className="flex group" data-id={id}>
      <label className="w-full flex items-start grow pb-4  border-b">
        <input
          className="appearance-none checkedStyle"
          type="checkbox"
          defaultChecked={isDone}
          onChange={() => handleDone(index)}
        />
        <input
          className="grow ml-4 min-h-[14px] border-baseline-gray-500 focus:outline-none  focus:text-primary-gray focus:font-bold"
          type="text"
          defaultValue={content}
          onChange={(e) => handleValue(index, e.target.value)}
        />
      </label>
      <button
        className="ml-4 flex items-start invisible group-hover:visible"
        type="button"
        onClick={() => handleDelete(index)}
      >
        <img className="" src={deleteTaskBtn} alt="deleteTaskBtn" />
      </button>
    </div>
  );
}
