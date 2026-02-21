import React, { useState } from 'react';

interface AddTaskProps {
  onAdd: (title: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title);
      setTitle('');
      setIsAdding(false);
    }
  };

  if (!isAdding) {
    return (
      <button onClick={() => setIsAdding(true)} style={styles.addButton}>
        + Add Task
      </button>
    );
  }

  return (
    <div style={styles.form}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        onBlur={handleSubmit}
        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
        autoFocus
        style={styles.input}
      />
      <div style={styles.formActions}>
        <button onClick={handleSubmit} style={styles.saveBtn}>Add</button>
        <button onClick={() => setIsAdding(false)} style={styles.cancelBtn}>Cancel</button>
      </div>
    </div>
  );
};

const styles = {
  addButton: {
    width: '100%',
    padding: '10px 10px 10px 10px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px',
    fontWeight: '500' as const
  },
  form: {
    marginTop: '10px'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '2px solid #4CAF50',
    borderRadius: '4px',
    marginBottom: '8px'
  },
  formActions: {
    display: 'flex',
    gap: '8px'
  },
  saveBtn: {
    padding: '6px 16px',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500' as const
  },
  cancelBtn: {
    padding: '6px 16px',
    background: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500' as const
  }
};

export default AddTask;