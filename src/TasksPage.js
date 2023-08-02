import logo from "./image/logo.png";
import addTaskBtn from "./image/addTaskBtn.png";
import deleteBtn from "./image/deleteBtn.png";
// import checkboxFalse from "./image/checkboxFalse.png";
// import checkboxTrue from "./image/checkboxTrue.png";
import emptyListImg from "./image/emptyList.png";

// 建立新的任務
function NewTaskInput() {
  return (
    <div className="p-1 pl-4 rounded-[10px] bg-white flex mt-6 shadow-input-shadow">
      <input
        className="grow placeholder:text-primary-gray placeholder:my-4 "
        type="text"
        placeholder="新增待辦事項"
      />
      <button className="w-[40px]" type="submit">
        <img className="align-baseline" src={addTaskBtn} alt="addTaskBtn" />
      </button>
    </div>
  );
}

// ToDo 列表
function TasksList() {
  const tasksData = [
    { id: 1, content: "吃葡萄", isDone: false },
    { id: 1, content: "吃葡萄", isDone: false },
    { id: 2, content: "檸檬拿去丟", isDone: true },
    { id: 2, content: "檸檬拿去丟", isDone: true },
  ];
  const tasksQtu = tasksData.length;

  return (
    <div className="mt-4 rounded-[10px] bg-white text-[14px] shadow-input-shadow">
      {/* tag */}
      <div className="w-full flex">
        <div className="py-4 w-1/3 text-center font-bold text-[14px] border-b-2 border-baseline-gray-700 rounded-tl-[10px]">
          全部
        </div>
        <div className="py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray border-b-2 border-baseline-gray-400">
          待完成
        </div>
        <div className="py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray border-b-2 border-baseline-gray-400 rounded-tr-[10px]">
          已完成
        </div>
      </div>
      {/* tasks list */}
      <div className="p-6">
        {tasksData.map((item) => {
          return (
            <TaskItem
              id={item.id}
              content={item.content}
              isDone={item.isDone}
            />
          );
        })}
        <div className="mt-6 pr-8 flex justify-between items-start">
          <span>{tasksQtu} 個待完成項目</span>
          <span className=" text-primary-gray">清除已完成項目</span>
        </div>
      </div>
    </div>
  );
}

// 單個 task
function TaskItem({ id, content, isDone }) {
  // const isChecked = isDone ? "checked" : "";

  return (
    <div className="pt-4 flex group" data-taskId={id}>
      <label className="w-full flex items-start grow m-l-">
        <input className="w-[20px] h-[20px]" type="checkbox" />
        <span className="grow ml-[-20px] pl-9 leading-[20px] min-h-[36px] border-b border-baseline-gray-500">
          {content}
        </span>
      </label>
      <button className="ml-4 flex items-start invisible group-hover:visible">
        <img className=" align-top" src={deleteBtn} alt="deleteBtn" />
      </button>
    </div>
  );
}

// 如果 todos 列表是空的
function EmptyList() {
  return (
    <div className="mt-[60px] flex flex-col items-center">
      <p>目前尚無待辦事項</p>
      <div className="w-[240px] mt-4">
        <img src={emptyListImg} alt="emptyListImg" />
      </div>
    </div>
  );
}

// PAGE
export default function TasksPage() {
  const userName = "王小明";
  const isEmpty = false; //看 GET /todos 有沒有內容
  const tasks = isEmpty ? <EmptyList /> : <TasksList />;

  return (
    <div className="w-full h-screen bg-tasksPageBg flex flex-col items-center">
      {/* header */}
      <header className="w-[1028px] flex justify-between items-center px-8 py-1">
        <div className="h-10">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex">
          <p className="font-bold">{userName}的待辦清單</p>
          <a className="ml-6" href="">
            登出
          </a>
        </div>
      </header>
      {/* main */}
      <main className="w-[500px]">
        <NewTaskInput />
        {tasks}
      </main>
    </div>
  );
}
