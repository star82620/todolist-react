import { useState } from "react";
import createTaskBtn from "../../images/addTaskBtn.png";

// 建立新的任務
export default function NewTaskInput({ tasksState, setTasksState }) {
  //Create： 按了新增 btn 就把資料放進 tasksData
  //之後優化：在 input 中按鍵盤 enter 等於點擊 button 效果

  const [taskText, setTaskText] = useState("");
  function addTask() {
    if (!taskText) return alert("請輸入待辦事項");
    const task = {
      content: taskText,
    };
    // {
    //   "todo": {
    //     "content": "qdqdwstring"
    //   }
    // }

    // setTasksState([...tasksState, task]);
    //將新增的內容放在原本的陣列後面，等於是 push 效果
    setTaskText("");
  }

  return (
    <div className="p-1 pl-4 rounded-[10px] bg-white flex shadow-input-shadow">
      <input
        className="grow placeholder:text-primary-gray placeholder:my-4"
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="新增待辦事項"
      />
      <button className="w-[40px]" type="button" onClick={addTask}>
        <img
          className="align-baseline"
          src={createTaskBtn}
          alt="createTaskBtn"
        />
      </button>
    </div>
  );
}
