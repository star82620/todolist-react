import { useState } from "react";
import logo from "../../images/logo.png";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";

// PAGE
export default function TasksPage() {
  const userName = "王小明";
  const tasksData = [
    { id: 1, content: "吃AAA", isDone: false },
    { id: 2, content: "萄", isDone: false },
    { id: 3, content: "去丟", isDone: true },
    { id: 4, content: "檸檬拿去丟", isDone: true },
  ];

  //動態 taskData
  const [tasksState, setTasksState] = useState(tasksData);
  console.log("tasksState", tasksState);

  return (
    <div className="w-full h-screen bg-tasksPageBg flex flex-col items-center">
      {/* header */}
      <header className="w-[1028px] flex justify-between items-center px-8 py-4">
        <div className="h-10">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex">
          <p className="font-bold">{userName}的待辦清單</p>
          <a className="ml-6" href="">
            登出
          </a>
        </div>
      </header>
      {/* main */}
      <main className="w-[500px] mt-6">
        <NewTaskInput tasksState={tasksState} setTasksState={setTasksState} />
        <TasksList tasksState={tasksState} setTasksState={setTasksState} />
      </main>
    </div>
  );
}
