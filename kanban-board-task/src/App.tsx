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

  const addTask = (title: string, description: string = '') => {
    const newTask: Task = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      title,
      description,
      column: "todo", // New tasks always start in To Do column
    };
    setTasks([...tasks, newTask]); // Add new task to existing tasks array
  };

  const editTask = (id: string, newTitle: string, newDescription: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle, description: newDescription } : task,
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
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Kanban Board</h1>
          <div style={styles.addTaskContainer}>
            <AddTask onAdd={addTask} />
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.board}>
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

const styles = {
  header: {
    background: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '16px 0',
    position: 'sticky' as const,
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '24px',
    fontWeight: '600',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  addTaskContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '24px',
  },
  board: {
    display: 'flex',
    gap: '24px',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
  },
};

export default App;
