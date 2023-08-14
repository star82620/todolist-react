import { useState } from "react";
import createTaskBtn from "../../images/addTaskBtn.png";
import { token } from "./index";

// 建立新的任務
export default function NewTaskInput({ tasksState, setTasksState, getData }) {
  const [taskText, setTaskText] = useState("");

  async function addTask() {
    if (!taskText) return alert("請輸入待辦事項");
    const task = {
      content: taskText,
    };
    const bodyValue = {
      todo: task,
    };

    const apiUrl = `https://todoo.5xcamp.us/todos/`;
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(bodyValue),
    });
    const data = await res.json();
    console.log(data);
    const isSuccess = res.ok;
    if (isSuccess) {
      console.log("成功新增");
      getData();
      setTaskText("");
    }
  }

  return (
    <div className="p-1 pl-4 rounded-[10px] bg-white flex shadow-input-shadow">
      <input
        className="grow pr-3 placeholder:text-primary-gray placeholder:my-4 focus:outline-none"
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
