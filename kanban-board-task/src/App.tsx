import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import AddTask from "./components/AddTask";
import { Task, ColumnType } from "./types";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  //  Load tasks from localStorage when the app starts
  useEffect(() => {
    const saved = localStorage.getItem("kanban-tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  //  Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("kanban-tasks", JSON.stringify(tasks));
  }, [tasks]); // Runs whenever 'tasks' state changes

  const columns: { id: ColumnType; title: string }[] = [
    { id: "todo", title: "To Do" },
    { id: "inProgress", title: "In Progress" },
    { id: "done", title: "Done" },
  ];

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      title,
      column: "todo", // New tasks always start in To Do column
    };
    setTasks([...tasks, newTask]); // Add new task to existing tasks array
  };

  const editTask = (id: string, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    if (window.confirm("Delete this task?")) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetColumn: ColumnType) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain"); // Get dragged task ID
    // Update the task's column to the target column
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, column: targetColumn } : task,
      ),
    );
  };

  return (
    <div className="app">
      {/* Sticky Header*/}
      <header className="sticky-header">
        <div className="header-content">
          <h1 className="main-title">Kanban Board</h1>
          {/* Add Task button */}
          <div className="add-task-container">
            <AddTask onAdd={addTask} />
          </div>
        </div>
      </header>

      <main className="board-container">
        <div className="board">
          {columns.map((column) => (
            <Column
              key={column.id}
              title={column.title}
              type={column.id}
              tasks={tasks.filter((task) => task.column === column.id)}
              onEditTask={editTask}
              onDeleteTask={deleteTask}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
