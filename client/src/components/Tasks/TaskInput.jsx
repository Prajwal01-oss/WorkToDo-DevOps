import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

const TaskInput = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title, dueDate: dueDate || null });
    setTitle('');
    setDueDate('');
    setShowDatePicker(false);
  };

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit} className="add-task-input-wrapper">
        <Plus size={20} color="var(--primary)" />
        <input
          type="text"
          className="add-task-input"
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {showDatePicker ? (
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input"
              style={{ 
                border: '1px solid var(--border)', 
                borderRadius: '6px', 
                padding: '4px 8px',
                fontSize: '0.8rem',
                color: 'var(--text-main)'
              }}
              onBlur={() => !dueDate && setShowDatePicker(false)}
              autoFocus
            />
          ) : (
            <button 
              type="button"
              className="action-btn"
              onClick={() => setShowDatePicker(true)}
              style={{ color: dueDate ? 'var(--primary)' : 'var(--text-muted)' }}
            >
              <Calendar size={18} />
              {dueDate && <span style={{ fontSize: '0.7rem', marginLeft: '4px' }}>{new Date(dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>}
            </button>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!title.trim()}
            style={{ padding: '6px 12px', fontSize: '0.85rem' }}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
