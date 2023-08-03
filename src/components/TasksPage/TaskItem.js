import { useState } from "react";
import deleteTaskBtn from "../../images/deleteBtn.png";

// 單個 task
export default function TaskItem({ id, content, isDone }) {
  //edit：

  // function changeState() {
  //   const [doneState, setDoneState] = useState(isDone);

  // }

  return (
    <div className="pt-4 flex group" data-id={id}>
      <label className="w-full flex items-start grow m-l-">
        <input
          className="w-[20px] h-[20px]"
          type="checkbox"
          defaultChecked={isDone}
          onChange={(e) => {
            console.log(e.target.checked);
          }}
        />
        <span className="grow ml-[-20px] pl-9 leading-[20px] min-h-[36px] border-b border-baseline-gray-500">
          {content}
        </span>
      </label>
      <button className="ml-4 flex items-start invisible group-hover:visible">
        <img className=" align-top" src={deleteTaskBtn} alt="deleteTaskBtn" />
      </button>
    </div>
  );
}
