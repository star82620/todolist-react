import { useEffect, useState } from "react";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";
import Header from "./Header";
import getToken from "../../helper/token";
import getTasksData from "../../helper/getTasksData";

// TO-DO LIST PAGE
export default function TasksPage() {
  const [tasksState, setTasksState] = useState([]);
  async function getData() {
    const authHeader = getToken();
    const apiUrl = "https://todoo.5xcamp.us/todos";
    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        headers: authHeader,
      });
      const isSuccess = await res.ok;
      const data = await res.json(); //成功時是 todos，失敗時是 message
      if (isSuccess) {
        setTasksState(data.todos);
        // 拿 API 撈到的資料去更新 tasksState
      } else {
        //畫面跳轉回 login page
      }
    } catch (err) {
      return err;
    }
    return data;
  }

  useEffect(() => {
    getTasksData();
  }, []);

  console.log("index-tasksState", tasksState);

  const userName = "王小明";

  return (
    <div className="w-full h-screen bg-tasksPageBg flex flex-col items-center">
      <Header userName={userName} />

      <main className="w-[500px] mt-6">
        <NewTaskInput
          tasksState={tasksState}
          setTasksState={setTasksState}
          getData={getData}
        />
        <TasksList
          tasksState={tasksState}
          setTasksState={setTasksState}
          getData={getData}
        />
      </main>
    </div>
  );
}
