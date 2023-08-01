import logo from "./image/logo.png";
import addTaskBtn from "./image/addTaskBtn.png";
import deleteBtn from "./image/deleteBtn.png";
import checkboxFalse from "./image/checkboxFalse.png";
import checkboxTrue from "./image/checkboxTrue.png";
import emptyListImg from "./image/emptyList.png";

// 建立新的任務
function AddTask() {
  return (
    <div className="p-1 pl-4 rounded-[10px] bg-white flex mt-6">
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
    { id: 2, content: "檸檬拿去丟", isDone: true },
  ];

  return (
    <div className="mt-4 rounded-[10px] bg-white">
      {/* tag */}
      <div className="w-100 flex">
        <div className="py-4 w-1/3 text-center font-bold text-[14px] rounded-tl-[10px]">
          全部
        </div>
        <div className="py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray">
          待完成
        </div>
        <div className="py-4 w-1/3 text-center font-bold text-[14px] text-primary-gray rounded-tr-[10px]">
          已完成
        </div>
      </div>
      {/* tasks list */}
      <div className="">
        <TaskItem id="3" content="整理電腦資料夾" isDone="false" />
        {/* {tasksData.map((item) => {
          <TaskItem id={item.id} content={item.content} isDone={item.isDone} />;
        })} */}
      </div>
    </div>
  );
}

function TaskItem({ id, content, isDone }) {
  const isChecked = isDone ? "checked" : "";
  return (
    <div className="flex p-6" data-taskId={id}>
      <input
        className="appearance-none bg-taskCheckboxFalse"
        type="checkbox"
        checked={isChecked}
      />
      <p className="grow pl-9 pb-4 border-b border-light-gray">
        {content + isDone}
      </p>
      <button>
        <img src={deleteBtn} alt="deleteBtn" />
      </button>
    </div>
  );
}

// 如果 todos 列表是空的
function EmptyTasksList() {
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
  const isDataNull = false; //看 GET /todos 有沒有內容
  const hiddenList = isDataNull ? <EmptyTasksList /> : <TasksList />;

  return (
    <div className="w-100 h-screen bg-tasksPageBg flex flex-col items-center">
      {/* header */}
      <header className="w-[1028px] flex justify-between items-center px-8 py-1 border-2 border-black">
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
        <AddTask />
        {hiddenList}
      </main>
    </div>
  );
}
