import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import NewTaskInput from "./NewTaskInput";
import TasksList from "./TasksList";
import Header from "./Header";
import getTasksData from "../../helper/getTasksData";
import EmptyTasks from "./EmptyTasks";
import checkLogin from "../../helper/checkLogin";
import getToken from "../../helper/token";

// TO-DO LIST PAGE
export default function TasksPage() {
  //從 API 取得的資料
  const [tasksState, setTasksState] = useState([]);
  //渲染用狀態
  const [renderState, setRenderState] = useState(tasksState);
  const navigate = useNavigate();

  console.log("state", tasksState);

  //一進畫面就 render
  // 如果沒有 token 就轉到 login 頁，有 token 就檢查有沒有權限，
  // 有權限就 getTasksData ，沒權限就轉到 login
  useEffect(() => {
    checkToken();
  }, []);

  async function checkToken() {
    const auth = await getToken();
    const token = await auth.Authorization;
    const isChecked = await checkLogin();
    const data = await getTasksData();
    if (!token || !isChecked || !data.todos)
      return navigate("/todolist-react/");

    setTasksState(data.todos);
    setRenderState(data.todos); //在這裡不能直接拿 TasksState，因為他還沒有被更新
  }
  const isEmpty = tasksState.length === 0 ? true : false;
  const userName = localStorage.getItem("userName");

  return (
    <div className="w-full h-screen bg-tasksPageBg flex flex-col items-center">
      <Header userName={userName} />

      <main className="w-[500px] mt-6">
        <NewTaskInput
          renderState={renderState}
          setRenderState={setRenderState}
          tasksState={tasksState}
          setTasksState={setTasksState}
        />
        {isEmpty ? (
          <EmptyTasks />
        ) : (
          <TasksList
            renderState={renderState}
            setRenderState={setRenderState}
            tasksState={tasksState}
            setTasksState={setTasksState}
          />
        )}
      </main>
    </div>
  );
}
