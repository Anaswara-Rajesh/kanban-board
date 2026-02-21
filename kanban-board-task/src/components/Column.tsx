import React from 'react';
import Task from './Task';
import { Task as TaskType, ColumnType } from '../types';

interface ColumnProps {
  title: string;
  type: ColumnType;
  tasks: TaskType[];
  onEditTask: (id: string, newTitle: string) => void;
  onDeleteTask: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, column: ColumnType) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  type,
  tasks,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragOver,
  onDrop
}) => {
  return (
    <div
      className="column-card"
      style={styles.column}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, type)}
    >
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <span style={styles.count}>{tasks.length}</span>
      </div>
      
      <div style={styles.taskList}>
        {tasks.map(task => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
          />
        ))}
        {tasks.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  column: {
    background: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    width: '320px',
    height: '450px',
    minHeight:'450px',
    display: 'flex',
    flexDirection: 'column' as const,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    border: '1px solid #eaeef2',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px 16px 4px',
    borderBottom: '2px solid #f0f2f5',
    marginBottom: '8px'
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#2c3e50',
    letterSpacing: '0.3px',
    textTransform: 'uppercase' as const
  },
  count: {
    background: '#eef2f6',
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#4a5568',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
  },
  taskList: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '4px',
    scrollbarWidth: 'thin' as const,
    scrollbarColor: '#cbd5e0 #f7fafc'
  },
  emptyState: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px',
    background: '#f9fafc',
    borderRadius: '8px',
    border: '2px dashed #e2e8f0',
    margin: '8px 0'
  },
  emptyText: {
    color: '#94a3b8',
    fontSize: '0.9rem',
    fontStyle: 'italic' as const
  }
};

export default Column;