import { useState, useEffect } from "react";

export default function Planner() {
  const [tasks, setTasks] = useState<{ id: number; text: string; done: boolean }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask = { id: Date.now(), text: input, done: false };
    setTasks([...tasks, newTask]);
    setInput("");
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const completed = tasks.filter((t) => t.done).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <div className="planner-container">
      <h2 className="planner-title">📅 Your daily plan</h2>

      <div className="planner-input">
        <input
          type="text"
          className="planner-textfield"
          placeholder="Add task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button onClick={addTask} className="planner-button">
          Add
        </button>
      </div>

      <ul className="planner-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`planner-task ${task.done ? "done" : ""}`}
          >
            {task.text}
          </li>
        ))}
      </ul>

      <div className="planner-progress">
        <p>
          Progress: {completed}/{tasks.length} 
        </p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}