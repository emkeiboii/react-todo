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
    <div className="border-2 border-gray-300 rounded-sm flex flex-col items-center justify-center  ">
      <h1 className="text-4xl uppercase p-1 mt-2">to do list</h1>
      <Form onAddTask={handleAddTask} />
      <TasksList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onToggleTask={handleToggleTask}
      />
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
    <form className="mx-10 my-3" onSubmit={handleSumbit}>
      <input
        type="text"
        placeholder="Add new task"
        className="p-1 border rounded-l-md"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-blue-400 border-blue-400 border rounded-r-md text-white p-1">
        add
      </button>
    </form>
  );
}

function TasksList({ tasks, onDeleteTask, onToggleTask }) {
  const [sortBy, setSortBy] = useState("all");

  const taskNum = tasks.length;
  const taskCompleted = tasks.filter((task) => task.completed).length;
  const taskPercentage = Math.round((taskCompleted * 100) / taskNum);

  let sortedTasks;

  if (sortBy === "all") sortedTasks = tasks;

  if (sortBy === "active")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => Number(!b.completed) - Number(!a.completed));

  if (sortBy === "completed")
    sortedTasks = tasks
      .slice()
      .sort((a, b) => Number(b.completed) - Number(a.completed));

  return (
    <div className="bg-gray200 mx-3 mb-3">
      {sortedTasks.map((task) => (
        <Task
          task={task}
          key={task.id}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />
      ))}
      <div className="border flex items-center w-full bg-gray-200 px-3 py-1 mt-2">
        <p className="mr-5 ">
          {taskNum === 0
            ? "Add a new task"
            : `${taskNum} items (${taskPercentage}% completed)`}
        </p>
        <label className="flex-1 text-right pr-1">filter:</label>
        <select
          className=" bg-transparent"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
      </div>
    </div>
  );
}

function Task({ task, onDeleteTask, onToggleTask }) {
  return (
    <div className="flex gap-3 border-b  border-gray-100 p-1 ">
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

function ClearAll({ onClearTasks }) {
  return (
    <button className="my-2 text-sm underline" onClick={() => onClearTasks()}>
      Clear all
    </button>
  );
}
