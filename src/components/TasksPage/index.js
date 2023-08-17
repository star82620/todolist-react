import { useEffect, useState } from "react";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";
import Header from "./Header";
import getTasksData from "../../helper/getTasksData";

// TO-DO LIST PAGE
export default function TasksPage() {
  const [tasksState, setTasksState] = useState([]);

  useEffect(() => {
    const res = getTasksData();
    res
      .then((data) => {
        if (data.todos) {
          console.log(data);
          setTasksState(data.todos);
        } else {
          //跳轉到 login
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("index-tasksState", tasksState);

  const userName = "王小明";

  return (
    <div className="w-full h-screen bg-tasksPageBg flex flex-col items-center">
      <Header userName={userName} />

      <main className="w-[500px] mt-6">
        <NewTaskInput />
        <TasksList tasksState={tasksState} setTasksState={setTasksState} />
      </main>
    </div>
  );
}
