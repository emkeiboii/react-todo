import { useState } from "react";

export default function App() {
  return (
    <>
      <ToDoList />
    </>
  );
}

/* -----—-----—-----—-----—-----—-----—-----—-----—-----— */

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(task) {
    setTasks([...tasks, task]);
  }

  function handleDeleteTask(id) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function handleToggleTask(id) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleClearTasks() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your tasks?"
    );

    if (confirmed) setTasks([]);
  }

  return (
    <div className="border-2 border-gray-300 rounded-sm mx-auto my-7 w-96 flex justify-center items-center flex-col max-w-max pt-5 pb-3 px-3">
      <h1 className="text-4xl uppercase">to do list</h1>
      <Form onAddTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
      />
      <Filter tasks={tasks} />
      {tasks.length === 0 || <ClearAll onClearTasks={handleClearTasks} />}
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

function TasksList({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <div className="p-1 w-full">
      {tasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />
      ))}
    </div>
  );
}

function Task({ task, onDeleteTask, onToggleTask }) {
  return (
    <div className="flex border-b border-gray-200 p-1 my-1 justify-between gap-3">
      <input
        type="checkbox"
        value={task.completed}
        onChange={() => onToggleTask(task.id)}
      />
      <p className="flex-1 first-letter:uppercase">{task.description}</p>
      <button onClick={() => onDeleteTask(task.id)}>❌</button>
    </div>
  );
}

function Filter({ tasks }) {
  const taskNum = tasks.length;
  const taskCompleted = tasks.filter((task) => task.completed).length;
  const taskPercentage = Math.round((taskCompleted * 100) / taskNum);

  return (
    <div className="flex justify-between w-full relative bg-slate-100 p-1">
      <p>
        {taskNum === 0
          ? "Add a new task"
          : `${taskNum} items (%${taskPercentage} completed)`}
      </p>
      <label className="flex-1 text-right pr-1">filter:</label>
      <select name="" id="" className="bg-transparent">
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
    </div>
  );
}

function ClearAll({ onClearTasks }) {
  return (
    <button className="mt-2 text-sm underline" onClick={() => onClearTasks()}>
      Clear all
    </button>
  );
}
