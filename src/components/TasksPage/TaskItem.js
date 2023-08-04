import { useState } from "react";
import deleteTaskBtn from "../../images/deleteBtn.png";

// Update: edit
// 修改 input 內容時，要這個內容同時傳回 data
//

// 單個 task
export default function TaskItem({
  id,
  content,
  isDone,
  tasksState,
  setTasksState,
}) {
  function foo() {}

  return (
    <div className="flex group" data-id={id}>
      <label className="w-full flex items-start grow pb-4  border-b">
        <input
          className="appearance-none checkedStyle"
          type="checkbox"
          defaultChecked={isDone}
          onChange={(e) => {
            console.log(e.target.checked);
          }}
        />
        <input
          className="grow ml-4 min-h-[14px] border-baseline-gray-500 focus:outline-none  focus:text-primary-gray focus:font-bold"
          readOnly
          value={content}
          // // 這個地方也要改 setFunction
          // onChange={(e) => {
          //   console.log(e.target.value);
          // }}
          // onDoubleClick={foo}
        />
      </label>
      <button className="ml-4 flex items-start invisible group-hover:visible">
        <img className="" src={deleteTaskBtn} alt="deleteTaskBtn" />
      </button>
    </div>
  );
}
