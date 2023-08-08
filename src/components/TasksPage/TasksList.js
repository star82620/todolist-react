import TaskItem from "./TaskItem";
import EmptyTasks from "./EmptyTasks";

// ToDo 列表
export default function TasksList({ tasksState, setTasksState }) {
  const tasksLength = tasksState.length;

  if (tasksLength < 1) {
    return <EmptyTasks />;
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

  function handleDone(targetIndex) {
    //點擊目標的 index 如果和 tasksState 資料的 index 一樣，就把 isDone 翻轉並回傳 item
    //將改好的資料賦值給 newTasks，並執行 setTasksState 把資料修正
    const newTasks = tasksState.map((item, index) => {
      if (index === targetIndex) {
        item.isDone = !item.isDone;
        return item;
      }
      return item;
    });
    setTasksState(newTasks);
  }

  function handleValue(targetIndex, newValue) {
    const newTasks = tasksState.map((item, index) => {
      if (index === targetIndex) {
        item.content = newValue;
        return item;
      }
      return item;
    });
    setTasksState(newTasks);
  }

  function handleDelete(targetIndex) {
    const newTasks = tasksState.filter((item, index) => {
      return index !== targetIndex;
    });
    setTasksState(newTasks);
  }

  function deleteDone() {
    const newTasks = tasksState.filter((item) => {
      return item.isDone === false;
    });
    setTasksState(newTasks);
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
          className="py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray border-b-2 border-baseline-gray-400"
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
        {tasksState.map((item, index) => (
          <TaskItem
            key={item.id}
            index={index}
            id={item.id}
            content={item.content}
            isDone={item.isDone}
            tasksState={tasksState}
            setTasksState={setTasksState}
            handleDone={handleDone}
            handleValue={handleValue}
            handleDelete={handleDelete}
          />
        ))}
        <div className="mt-6 pr-8 flex justify-between items-start">
          <span>{tasksLength} 個待完成項目</span>
          <button className=" text-primary-gray" onClick={deleteDone}>
            清除已完成項目
          </button>
        </div>
      </div>
    </div>
  );
}
