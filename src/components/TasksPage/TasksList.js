import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import getToken from "../../helper/token";

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
  }, [tasksState]);

  //------------------------------

  const authHeader = getToken();

  //改變 task 的完成狀態
  async function handleCompleted(taskId) {
    const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}/toggle`;
    const res = await fetch(apiUrl, {
      method: "PATCH",
      headers: authHeader,
    });
    const data = await res.json();
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
    if (await res.ok) {
      //更新本地的 tasksState
      const index = tasksState.findIndex((item) => {
        return item.id === taskId;
      });
      const newTasks = [...tasksState];
      newTasks[index].content = data.content;
      setTasksState(newTasks);
    } else {
      alert("oh");
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
    } catch (err) {
      console.log(err);
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
    //找出已完成的 task 並個別跑刪除操作
    const completedTasks = tasksState.filter((item) => {
      return item.completed_at;
    });
    const completedTasksId = completedTasks.map((item) => item.id);

    completedTasksId.map((taskId) => {
      deleteTask(taskId);
      // const newTasks = [...tasksState];
      // const a = newTasks.filter((task) => task.id !== taskId);
      // console.log("A", a);
    });

    // setTasksState(a);
    //刪一次就跑一次
  }

  //---- tag ----
  const tagStyle =
    "py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray border-b-2 border-baseline-gray-400";
  const activeTagStyle =
    "py-4 w-1/3 text-center font-bold text-[14px] border-b-2 border-baseline-gray-700 text-black";

  const [activeTag, setActiveTag] = useState("all");

  const tags = [
    { key: "all", title: "全部" },
    { key: "uncompleted", title: "待完成" },
    { key: "completed", title: "已完成" },
  ];

  function toggleTags(e) {
    setActiveTag(e.target.dataset.key);
  }

  const all = (() =>
    tasksState.map((item, index) => (
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
    )))();

  const uncompleted = (() =>
    tasksState.map((item, index) => {
      if (item.completed_at !== null) return null;
      return (
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
      );
    }))();

  const completed = (() =>
    tasksState.map((item, index) => {
      if (item.completed_at === null) return null;
      return (
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
      );
    }))();

  const isListEmpty = renderState.length === 0; //不是渲染用的不等於零，是基礎的API不等於零

  const isAll = activeTag === "all";
  const isUncompleted = activeTag === "uncompleted";
  const isCompleted = activeTag === "completed";

  return (
    <div className="mt-4 rounded-[10px] bg-white text-[14px] shadow-input-shadow">
      {/* tag */}
      <div className="w-full flex first-of-type:rounded-tl-[10px] last-of-type:rounded-tr-[10px]">
        {tags.map((item) => {
          return (
            <div
              key={item.key}
              data-key={item.key}
              className={item.key === activeTag ? activeTagStyle : tagStyle}
              onClick={(e) => toggleTags(e)}
            >
              {item.title}
            </div>
          );
        })}
      </div>
      {/* tasks list */}
      <div className="p-6 flex flex-col gap-4">
        {/* {isListEmpty ? (
          all
        ) : (
          <div className="w-full pb-4  border-b text-center text-gray-400">
            項目為空
          </div>
        )} */}

        {isAll && all}
        {isUncompleted && uncompleted}
        {isCompleted && completed}
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
