import addTaskBtn from "./image/addTaskBtn.png";

function AddTask() {
  return (
    <div>
      <input type="text" />
      <button type="submit">
        <img src={addTaskBtn} alt="addTaskBtn" />
      </button>
    </div>
  );
}

export default AddTask;
