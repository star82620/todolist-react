import TaskItem from "./TaskItem";
import emptyListImg from "../../images/emptyList.png";
import { useState } from "react";

// ToDo 列表
export default function TasksList({ tasksState }) {
  const tasksQtu = tasksState.length || 0;
  let renderData = tasksState;
  const renderHTML = renderData.map((item) => (
    <TaskItem key={item.id} {...item} />
  ));
  const [tasksHTML, setTasksHTML] = useState(renderHTML);

  if (tasksQtu < 1)
    return (
      <div className="mt-[60px] flex flex-col items-center">
        <p>目前尚無待辦事項</p>
        <div className="w-[240px] mt-4">
          <img src={emptyListImg} alt="emptyListImg" />
        </div>
      </div>
    );

  function filterTagAll() {
    console.log("A;;");
    // renderData = tasksState;
    // setTasksHTML(renderHTML);
  }
  function filterTagDoing() {
    console.log("Doing");
    // renderData = tasksState.filter((item) => {
    //   return item.isDone === false;
    // });
    // setTasksHTML(renderHTML);
  }
  function filterTagDone() {
    console.log("Done");
    // renderData = tasksState.filter((item) => {
    //   return item.isDone === true;
    // });
    // setTasksHTML(renderHTML);
  }

  return (
    <div className="mt-4 rounded-[10px] bg-white text-[14px] shadow-input-shadow">
      {/* tag */}
      <div className="w-full flex">
        <div
          className="py-4 w-1/3 text-center font-bold text-[14px] border-b-2 border-baseline-gray-700 rounded-tl-[10px]"
          onClick={filterTagAll}
        >
          全部
        </div>
        <div
          className="py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray border-b-2 border-baseline-gray-400"
          onClick={filterTagDoing}
        >
          待完成
        </div>
        <div
          className="py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray border-b-2 border-baseline-gray-400 rounded-tr-[10px]"
          onClick={filterTagDone}
        >
          已完成
        </div>
      </div>
      {/* tasks list */}
      <div className="p-6">
        {tasksHTML}
        <div className="mt-6 pr-8 flex justify-between items-start">
          <span>{tasksQtu} 個待完成項目</span>
          <span className=" text-primary-gray">清除已完成項目</span>
        </div>
      </div>
    </div>
  );
}
