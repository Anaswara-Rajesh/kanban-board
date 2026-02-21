import React, { useState } from 'react';

interface TaskProps {
  id: string;
  title: string;
  onEdit: (id: string, newTitle: string) => void;
  onDelete: (id: string) => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, onEdit, onDelete, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);

  const handleSave = () => {
    if (editValue.trim()) {
      onEdit(id, editValue);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div style={styles.task}>
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          autoFocus
          style={styles.editInput}
        />
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      style={styles.task}
    >
      <div style={styles.taskContent}>{title}</div>
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
    wordBreak: 'break-word' as const
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
    fontSize: '14px'
  }
};

export default Task;