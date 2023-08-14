import { useEffect, useState } from "react";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";
import Header from "./Header";

export const token = localStorage.getItem("userToken") || "";
const headerValue = {
  Authorization: token,
  "Content-Type": "application/json",
};

// TO-DO LIST PAGE
export default function TasksPage() {
  const [tasksState, setTasksState] = useState([]);
  async function getData() {
    const apiUrl = "https://todoo.5xcamp.us/todos";
    try {
      let res = await fetch(apiUrl, {
        method: "GET",
        headers: headerValue,
      });
      let isSuccess = await res.ok;
      let data = await res.json(); //成功時是 todos，失敗時是 message
      console.log("getData", data);
      if (isSuccess) {
        setTasksState(data.todos);
        // 拿 API 撈到的資料去更新 tasksState
      } else {
        //畫面跳轉回 login page
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
    console.log("我有工作");
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
