import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import getToken from "../../helper/token";
import getTasksData from "../../helper/getTasksData";

// ToDo 列表
export default function TasksList({
  tasksState,
  setTasksState,
  renderState,
  setRenderState,
}) {
  //------------- 未完成任務數量 ---------------
  const uncompletedTasks = tasksState.filter((item) => !item.completed_at);
  const [uncompletedLength, setUncompletedLength] = useState(
    uncompletedTasks.length
  );

  //如果 tasksState 有更新，就更新未完成任務數量
  useEffect(() => {
    setUncompletedLength(uncompletedTasks.length);
    console.log("我更新了！", uncompletedTasks.length);
  }, [tasksState]);

  //------------------------------

  const authHeader = getToken();

  //切換頁面 Tag：直接跑一次 API
  // （直接跑 API 跟用 tasksState 有什麼差別？）
  // （用 tasksState 可以不用一直 GET todos）
  async function toggleTags(e) {
    const res = await getTasksData();
    let filterData;

    if (e.target.innerText === "待完成") {
      filterData = res.todos.filter(
        (item) => typeof item.completed_at !== "string"
      );
    } else if (e.target.innerText === "已完成") {
      filterData = res.todos.filter(
        (item) => typeof item.completed_at === "string"
      );
    } else {
      filterData = res.todos;
    }

    //將篩選好的內容 render 出來
    console.log("tag", e.target.innerText, filterData);
    setRenderState(filterData);
    // 現在的問題是，我在這個 tag 中做事情，他不會動作
  }

  //改變 task 的完成狀態
  async function handleCompleted(taskId) {
    const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}/toggle`;
    const res = await fetch(apiUrl, {
      method: "PATCH",
      headers: authHeader,
    });
    const data = await res.json();
    console.log(data); //

    const index = tasksState.findIndex((item) => {
      return item.id === taskId;
    });
    const newTasks = [...tasksState];
    newTasks[index] = data;
    setTasksState(newTasks);
    return data;
  }

  //修改 task 文字
  async function handleValue(targetIndex, taskId, newValue) {
    const body = {
      todo: {
        content: newValue,
      },
    };

    const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}`;
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: authHeader,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log("l", data);
    if (await res.ok) {
      //更新本地的 tasksState
      const index = tasksState.findIndex((item) => {
        return item.id === taskId;
      });
      const newTasks = [...tasksState];
      newTasks[index].content = data.content;
      setTasksState(newTasks);
    }
    return data;
  }

  //刪除個別 task 的 API
  async function deleteTask(taskId) {
    try {
      const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}`;
      const res = await fetch(apiUrl, {
        method: "DELETE",
        headers: authHeader,
      });
      return res;
    } catch {
      console.log("ohno");
    }
  }

  //刪除個別 task
  async function handleDelete(targetIndex, taskId) {
    const res = await deleteTask(taskId);
    const data = await res.json();

    //更新畫面渲染、本地的 tasksState
    if (await res.ok) {
      const index = tasksState.findIndex((item) => {
        return item.id === taskId;
      });
      const newTasks = [...tasksState];
      newTasks.splice(index, 1);
      setTasksState(newTasks);
      setRenderState(newTasks);
    } else {
      alert(`出現異常，請重試 ${data}`);
    }
  }

  //刪除所有已完成的 task
  async function deleteDone() {
    const newTasks = [...tasksState];
    //找出已完成的 task 並個別跑刪除操作
    const completedTasks = tasksState.filter((item) => {
      return item.completed_at;
    });
    const completedTasksId = completedTasks.map((item) => item.id);
    completedTasksId.map((item) => {
      deleteTask(item);
      newTasks.splice(item, 1);
    });

    setTasksState(newTasks);
    //更新畫面
    // 看目前的 tag 是什麼，如果是 completed 就 setRenderState([])
    // if(tag 是 all or Uncompleted){
    //  setRenderState(newTasks);
    // } else {
    //  setRenderState([]);
    // }
  }

  return (
    <div className="mt-4 rounded-[10px] bg-white text-[14px] shadow-input-shadow">
      {/* tag */}
      <div className="w-full flex">
        <div
          className="py-4 w-1/3 text-center font-bold text-[14px] border-b-2 rounded-tl-[10px]"
          onClick={(e) => toggleTags(e)}
        >
          全部
        </div>
        <div
          className="py-4 w-1/3 text-center font-bold text-[14px] border-b-2"
          onClick={(e) => toggleTags(e)}
        >
          待完成
        </div>
        <div
          className="py-4 w-1/3 text-center font-bold text-[14px] border-b-2 rounded-tr-[10px]"
          onClick={(e) => toggleTags(e)}
        >
          已完成
        </div>
      </div>
      {/* tasks list */}
      <div className="p-6 flex flex-col gap-4">
        {renderState.length !== 0 //不是渲染用的不等於零，是基礎的API不等於零
          ? renderState.map((item, index) => (
              <TaskItem
                key={item.id}
                index={index}
                id={item.id}
                content={item.content}
                completed={item.completed_at ? true : false}
                tasksState={tasksState}
                setTasksState={setTasksState}
                handleCompleted={handleCompleted}
                handleValue={handleValue}
                handleDelete={handleDelete}
              />
            ))
          : `項目為空`}
        <div className="mt-6 pr-8 flex justify-between items-start">
          <span>{uncompletedLength} 個待完成項目</span>
          <button className=" text-primary-gray" onClick={deleteDone}>
            清除已完成項目
          </button>
        </div>
      </div>
    </div>
  );
}
