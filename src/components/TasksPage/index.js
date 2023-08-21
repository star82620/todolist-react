import { useEffect, useState } from "react";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";
import Header from "./Header";
import getTasksData from "../../helper/getTasksData";
import EmptyTasks from "./EmptyTasks";

// TO-DO LIST PAGE
export default function TasksPage() {
  const [tasksState, setTasksState] = useState([]);

  //一進畫面就 render
  useEffect(() => {
    const res = getTasksData();
    res
      .then((data) => {
        // 如果 GET 成功，得到 todos 列表
        if (data.todos) {
          setTasksState(data.todos);
        } else {
          //跳轉到 login
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log("index-tasksState", tasksState);
  const isEmpty = tasksState.length === 0 ? true : false;
  const userName = "王小明";

  return (
    <div className="w-full h-screen bg-tasksPageBg flex flex-col items-center">
      <Header userName={userName} />

      <main className="w-[500px] mt-6">
        <NewTaskInput tasksState={tasksState} setTasksState={setTasksState} />
        {isEmpty ? (
          <EmptyTasks />
        ) : (
          <TasksList tasksState={tasksState} setTasksState={setTasksState} />
        )}
      </main>
    </div>
  );
}
