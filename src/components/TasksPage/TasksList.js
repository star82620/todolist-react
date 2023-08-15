import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import EmptyTasks from "./EmptyTasks";
import getToken from "../../helper/token";
import getTasksData from "../../helper/getTasksData";

// ToDo 列表
export default function TasksList({ tasksState, setTasksState }) {
  //-------------- tasksLength ---------------
  // const uncompletedTasks = tasksState.filter((item) => !item.completed_at);
  // const [tasksLength, setTasksLeng] = useState(uncompletedTasks.length);

  // useEffect(() => {
  //   setTasksLeng(uncompletedTasks.length);
  //   console.log("leng工作");
  // }, [tasksState]);
  //--------------- 需要重新整理 ---------------

  // if (tasksLength < 1) {
  //   return <EmptyTasks />;
  // }

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
    setTasksState(filterData);
  }

  //改變 task 的完成狀態
  async function handleCompleted(taskId) {
    const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}/toggle`;
    const res = await fetch(apiUrl, {
      method: "PATCH",
      headers: authHeader,
    });
    const data = await res.json();
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
    const isSuccess = await res.ok;
    if (isSuccess) {
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

  const tags = [{ tag: "全部" }];

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
        {tasksState.map((item, index) => (
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
        ))}
        <div className="mt-6 pr-8 flex justify-between items-start">
          {/* <span>{tasksLength} 個待完成項目</span> */}
          <button className=" text-primary-gray" onClick={deleteDone}>
            清除已完成項目
          </button>
        </div>
      </div>
    </div>
  );
}
