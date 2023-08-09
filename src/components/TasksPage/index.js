import { useState } from "react";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";
import Header from "./Header";

// PAGE
export default function TasksPage() {
  const [tasksState, setTasksState] = useState([]);
  const apiUrl = "https://todoo.5xcamp.us/todos";
  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0ODU4Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjkxNDgwNzAwLCJleHAiOjE2OTI3NzY3MDAsImp0aSI6IjAxN2I5ZTRhLTg5OGEtNDZhMC1hODJkLTc3MDM4YTg4Y2YzNiJ9.f_WWqWhsZwUQjeTzUGXDcNoYKTlzVpJ1aSYZGPg3HEc",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const tasksData = data.todos;

      setTasksState(tasksData);
    })
    .catch((err) => {
      console.log(err);
      return alert("ERR");
    });

  const userName = "王小明";

  // const tasksData = [
  //   { id: 1, content: "吃AAA", isDone: false },
  //   { id: 2, content: "萄", isDone: false },
  //   { id: 3, content: "去丟", isDone: true },
  //   { id: 4, content: "檸檬拿去丟", isDone: true },
  // ];

  //動態 taskData
  // const [tasksState, setTasksState] = useState(tasksData);
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
