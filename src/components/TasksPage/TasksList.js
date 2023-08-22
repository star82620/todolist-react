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

  //切換頁面 Tag
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
  }

  //改變 task 的完成狀態
  async function handleCompleted(taskId) {
    const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}/toggle`;
    const res = await fetch(apiUrl, {
      method: "PATCH",
      headers: authHeader,
    });
    const data = await res.json();
    console.log(data);
    return data;
  }

  //修改 task 文字
  async function handleValue(targetIndex, taskId, newValue) {
    const bodyValue = {
      todo: {
        content: newValue,
      },
    };

    const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}`;
    const res = await fetch(apiUrl, {
      method: "PUT",
      headers: authHeader,
      body: JSON.stringify(bodyValue),
    });
    const data = await res.json();
    if (await res.ok) {
      const newTasks = tasksState.map((item, index) => {
        if (index === targetIndex) {
          item.content = newValue;
          return item;
        }
        return item;
      });
      setTasksState(newTasks);
    }
    return data;
  }

  //刪除個別 task 的 API
  async function deleteTask(taskId) {
    const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}`;
    const res = await fetch(apiUrl, {
      method: "DELETE",
      headers: authHeader,
    });
    const data = await res.json();
    return data;
  }

  //刪除個別 task
  function handleDelete(targetIndex, taskId) {
    deleteTask(taskId);

    const newTasks = tasksState.filter((item, index) => {
      return index !== targetIndex;
    });
    setTasksState(newTasks);
  }

  //刪除所有已完成的 task
  async function deleteDone() {
    //找出已完成的 task 並個別跑刪除操作
    const completedTasks = tasksState.filter((item) => {
      return item.completed_at;
    });
    const completedTasksId = completedTasks.map((item) => item.id);
    completedTasksId.map((item) => {
      deleteTask(item);
    });

    //更新畫面
    const newTasks = tasksState.filter((item) => {
      return !item.completed_at;
    });
    setTasksState(newTasks);
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
