import { useState } from "react";

export default function App() {
  return (
    <>
      <ToDoList />
    </>
  );
}

/* -----—-----—-----—-----—-----—-----—-----—-----—-----— */

const initialTasks = [
  { id: 124356, description: "Make the bed", completed: false },
  { id: 7465736, description: "Wake up", completed: true },
  { id: 4252023, description: "Eat breakfast", completed: false },
];

function ToDoList() {
  const [tasks, setTasks] = useState(initialTasks);

  function handleAddTask(task) {
    setTasks([...tasks, task]);
  }

  return (
    <div className="border-2 border-gray-300 rounded-sm mx-auto my-7 w-96 flex justify-center items-center flex-col max-w-max pt-5 pb-3 px-3">
      <h1 className="text-4xl uppercase">to do list</h1>
      <Form onAddTask={handleAddTask} />
      <TasksList tasks={tasks} />
      <Filter />
    </div>
  );
}

function Form({ onAddTask }) {
  const [description, setDescription] = useState("");

  function handleSumbit(e) {
    e.preventDefault();

    if (!description) return;

    const newTask = { id: Date.now(), description, completed: false };
    console.log(newTask);

    onAddTask(newTask);
    setDescription("");
  }

  return (
    <form
      className="w-96 flex justify-center items-center mt-3"
      onSubmit={handleSumbit}
    >
      <input
        type="text"
        placeholder="Add new task"
        className="border border-gray-200 px-3 py-1"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-blue-400 border-blue-400 border rounded-r-md text-white p-1 ">
        add
      </button>
    </form>
  );
}

function TasksList({ tasks }) {
  return (
    <div className="p-1 w-full">
      {tasks.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
}

function Task({ task }) {
  return (
    <div className="flex border-b border-gray-200 p-1 my-1 justify-between gap-3">
      <input type="checkbox"></input>
      <p className="flex-1 first-letter:uppercase">{task.description}</p>
      <button className="text-red-600">X</button>
    </div>
  );
}

function Filter() {
  return (
    <div className="flex justify-between w-full relative bg-slate-100 p-1">
      <p>3 items left</p>
      <label className="flex-1 text-right pr-1">filter:</label>
      <select name="" id="" className="bg-transparent">
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
    </div>
  );
}
