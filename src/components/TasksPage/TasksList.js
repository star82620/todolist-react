import { useState } from "react";
import TaskItem from "./TaskItem";
import emptyListImg from "../../images/emptyList.png";

// ToDo 列表
export default function TasksList({ tasksState, setTasksState }) {
  const tasksLength = tasksState.length;

  if (tasksLength < 1) {
    return (
      <div className="mt-[60px] flex flex-col items-center">
        <p>目前尚無待辦事項</p>
        <div className="w-[240px] mt-4">
          <img src={emptyListImg} alt="emptyListImg" />
        </div>
      </div>
    );
  }

  function filterAll() {
    console.log("ALL");
  }

  function filterDoing() {
    console.log("Doing");
  }

  function filterDone() {
    console.log("Done");
  }

  return (
    <div className="mt-4 rounded-[10px] bg-white text-[14px] shadow-input-shadow">
      {/* tag */}
      <div className="w-full flex">
        <div
          className="py-4 w-1/3 text-center font-bold text-[14px] border-b-2 border-baseline-gray-700 rounded-tl-[10px]"
          onClick={filterAll}
        >
          全部
        </div>
        <div
          className={`py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray border-b-2 border-baseline-gray-400`}
          onClick={filterDoing}
        >
          待完成
        </div>
        <div
          className="py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray border-b-2 border-baseline-gray-400 rounded-tr-[10px]"
          onClick={filterDone}
        >
          已完成
        </div>
      </div>
      {/* tasks list */}
      <div className="p-6 flex flex-col gap-4">
        {tasksState.map((item) => (
          <TaskItem
            key={item.id}
            {...item}
            tasksState={tasksState}
            setTasksState={setTasksState}
          />
        ))}
        <div className="mt-6 pr-8 flex justify-between items-start">
          <span>{tasksLength} 個待完成項目</span>
          <span className=" text-primary-gray">清除已完成項目</span>
        </div>
      </div>
    </div>
  );
}
