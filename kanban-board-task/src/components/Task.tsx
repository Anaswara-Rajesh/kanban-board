import React, { useState } from 'react';

interface TaskProps {
  id: string;
  title: string;
  description: string;
  onEdit: (id: string, newTitle: string, newDescription: string) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

const Task: React.FC<TaskProps> = ({ 
  id, 
  title, 
  description, 
  onEdit, 
  onDelete, 
  onDragStart 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);

  const handleSave = () => {
    if (editTitle.trim()) {
      onEdit(id, editTitle, editDescription);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div style={styles.task}>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          placeholder="Task title"
          style={styles.editInput}
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          placeholder="Task description"
          style={styles.editTextarea}
          rows={3}
        />
        <div style={styles.editActions}>
          <button onClick={handleSave} style={styles.saveButton}>Save</button>
          <button onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      style={styles.task}
    >
      <div style={styles.taskContent}>
        <div style={styles.taskTitle}>{title}</div>
        {description && <div style={styles.taskDescription}>{description}</div>}
      </div>
      <div style={styles.actions}>
        <button 
          onClick={() => setIsEditing(true)} 
          style={styles.editButton}
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(id)} 
          style={styles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const styles = {
  task: {
    background: 'white',
    padding: '12px',
    margin: '8px 0',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
    cursor: 'grab',
    border: '1px solid #e0e0e0'
  },
  taskContent: {
    marginBottom: '8px',
  },
  taskTitle: {
    fontWeight: '600',
    marginBottom: '4px',
    wordBreak: 'break-word' as const
  },
  taskDescription: {
    fontSize: '0.9rem',
    color: '#666',
    wordBreak: 'break-word' as const,
    whiteSpace: 'pre-wrap' as const
  },
  actions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end'
  },
  editButton: {
    padding: '4px 12px',
    background: '#2196f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500' as const
  },
  deleteButton: {
    padding: '4px 12px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500' as const
  },
  editInput: {
    width: '100%',
    padding: '8px',
    border: '2px solid #2196f3',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '8px'
  },
  editTextarea: {
    width: '100%',
    padding: '8px',
    border: '2px solid #2196f3',
    borderRadius: '4px',
    fontSize: '14px',
    marginBottom: '8px',
    fontFamily: 'inherit',
    resize: 'vertical' as const
  },
  editActions: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'flex-end'
  },
  saveButton: {
    padding: '4px 12px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500' as const
  },
  cancelButton: {
    padding: '4px 12px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500' as const
  }
};

export default Task;