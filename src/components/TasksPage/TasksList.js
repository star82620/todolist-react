import TaskItem from "./TaskItem";
import EmptyTasks from "./EmptyTasks";

// ToDo 列表
export default function TasksList({ tasksState, setTasksState, token }) {
  const uncompletedTasks = tasksState.filter((item) => !item.completed_at);
  const tasksLength = uncompletedTasks.length;
  // console.log(tasksLength);
  if (tasksLength < 1) {
    return <EmptyTasks />;
  }
  const headerValue = {
    Authorization: token,
    "Content-Type": "application/json",
  };
  // let token = localStorage.getItem("userToken") || "";
  // console.log("TasksList", token);

  function filterAll() {
    console.log("ALL");
  }

  function filterDoing() {
    console.log("Doing");
  }

  function filterDone() {
    console.log("Done");
  }

  function handleDone(targetIndex, taskId, token) {
    //點擊目標的 index 如果和 tasksState 資料的 index 一樣，就把 isDone 翻轉並回傳 item
    //將改好的資料賦值給 newTasks，並執行 setTasksState 把資料修正
    editTaskCompleted();

    async function editTaskCompleted() {
      const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}/toggle`;
      const res = await fetch(apiUrl, {
        method: "PATCH",
        headers: headerValue,
      });
      const data = await res.json();
      console.log(data);
      const isSuccess = res.ok;
      if (isSuccess) {
        // const newTasks = tasksState.map((item, index) => {
        //   if (index === targetIndex) {
        //     item.completed_at = !item.isDone;
        //     return item;
        //   }
        //   return item;
        // });
        // setTasksState(newTasks);
      }
    }
  }

  function handleValue(targetIndex, taskId, newValue, token) {
    const bodyValue = {
      todo: {
        content: newValue,
      },
    };

    async function editTaskText() {
      const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}`;
      const res = await fetch(apiUrl, {
        method: "PUT",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify(bodyValue),
      });
      const data = await res.json();
      console.log(data);
      const isSuccess = res.ok;
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
    }

    editTaskText();
  }

  function handleDelete(targetIndex, taskId, token) {
    async function deleteTask() {
      const apiUrl = `https://todoo.5xcamp.us/todos/${taskId}`;
      const res = await fetch(apiUrl, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      const data = await res.json();
      console.log(data);
      const isSuccess = res.ok;
      if (isSuccess) {
        console.log("刪除了");
        const newTasks = tasksState.filter((item, index) => {
          return index !== targetIndex;
        });
        setTasksState(newTasks);
      }
    }

    deleteTask();
    // 成功刪除，但是畫面不會自動 re-render，所以還是要手動移除
  }

  //刪除所有已完成的 task
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
            completed={item.completed_at ? true : false}
            tasksState={tasksState}
            setTasksState={setTasksState}
            handleDone={handleDone}
            handleValue={handleValue}
            handleDelete={handleDelete}
            token={token}
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
