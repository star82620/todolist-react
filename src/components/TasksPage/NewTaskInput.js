import { useState } from "react";
import createTaskBtn from "../../images/addTaskBtn.png";
import getToken from "../../helper/token";
import getTasksData from "../../helper/getTasksData";

// 建立新的任務
export default function NewTaskInput({
  tasksState,
  setTasksState,
  renderState,
  setRenderState,
}) {
  const [taskText, setTaskText] = useState("");

  async function addTask() {
    if (!taskText) return alert("請輸入待辦事項");
    const body = {
      todo: {
        content: taskText,
      },
    };

    const apiUrl = `https://todoo.5xcamp.us/todos/`;
    const authHeader = await getToken();
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (await res.ok) {
      const data = await getTasksData();
      setTasksState(data.todos);
      setRenderState(data.todos);
      setTaskText("");
    } else {
      alert("發生異常，請重試一次");
    }
    return data;
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
