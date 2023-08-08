import { useState } from "react";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";
import Header from "./Header";

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
      <Header userName={userName} />

      <main className="w-[500px] mt-6">
        <NewTaskInput tasksState={tasksState} setTasksState={setTasksState} />
        <TasksList tasksState={tasksState} setTasksState={setTasksState} />
      </main>
    </div>
  );
}
