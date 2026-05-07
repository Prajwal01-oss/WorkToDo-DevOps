import React, { useState, useEffect } from 'react';
import { X, Calendar, AlignLeft, Trash2, CheckCircle } from 'lucide-react';

const TaskDetail = ({ task, onClose, onUpdate, onDelete }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
    }
  }, [task]);

  if (!task) return null;

  const handleUpdate = () => {
    onUpdate(task._id, { title, description, dueDate: dueDate || null });
  };

  return (
    <aside className="detail-panel animate-slide-in">
      <div className="detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="action-btn" 
            onClick={() => onUpdate(task._id, { completed: !task.completed })}
            style={{ color: task.completed ? 'var(--primary)' : 'var(--text-muted)' }}
          >
            <CheckCircle size={20} />
          </button>
        </div>
        <button className="action-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="detail-section">
        <input 
          className="detail-title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          placeholder="Task Title"
        />
      </div>

      <div className="detail-section">
        <div className="detail-label">
          <Calendar size={14} style={{ marginRight: '8px' }} />
          Due Date
        </div>
        <input 
          type="date" 
          className="add-task-input" 
          value={dueDate} 
          onChange={(e) => {
            setDueDate(e.target.value);
            onUpdate(task._id, { dueDate: e.target.value || null });
          }}
          style={{ background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '8px 12px' }}
        />
      </div>

      <div className="detail-section" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="detail-label">
          <AlignLeft size={14} style={{ marginRight: '8px' }} />
          Description
        </div>
        <textarea 
          className="detail-textarea" 
          placeholder="Add a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={handleUpdate}
        />
      </div>

      <div className="detail-footer" style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Created {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <button 
          className="action-btn delete-btn" 
          onClick={() => {
            onDelete(task._id);
            onClose();
          }}
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </aside>
  );
};

export default TaskDetail;
