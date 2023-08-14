import { useEffect, useState } from "react";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";
import Header from "./Header";

// TO-DO LIST PAGE
export default function TasksPage({ token }) {
  const [tasksState, setTasksState] = useState([]);
  const apiUrl = "https://todoo.5xcamp.us/todos";
  // token = localStorage.getItem("userToken") || "";
  token =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0OTU4Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjkxOTczOTE0LCJleHAiOjE2OTMyNjk5MTQsImp0aSI6IjZhYzQ1NmQyLWQ5YTYtNDVhZC04YmFkLWJmOWQxMTEzNGUyOSJ9.psRWr2Sep7jE27qtLKX4GHKs4foL78LCI91Li1l95d0";

  async function getData() {
    try {
      let res = await fetch(apiUrl, {
        method: "GET",
        headers: { Authorization: token },
      });
      let isSuccess = await res.ok;
      let data = await res.json(); //成功時是 todos，失敗時是 message
      console.log(data);
      if (isSuccess) {
        setTasksState(data.todos);
      } else {
        //畫面跳轉回 login page
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  // const userName = "王小明";
  console.log("tasksState", tasksState);
  const [userName, setUserName] = useState("");

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
