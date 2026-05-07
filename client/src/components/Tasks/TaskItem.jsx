import React from 'react';
import { Check, Trash2, Calendar, Edit3 } from 'lucide-react';

const TaskItem = ({ task, onToggle, onDelete, onEdit, isSelected, onSelect }) => {
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date().setHours(0,0,0,0) && !task.completed;
  
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div 
      className={`task-item ${task.completed ? 'task-completed' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(task)}
    >
      <div 
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggle(task._id, task.completed);
        }}
      >
        {task.completed && <Check size={14} />}
      </div>

      <div className="task-title-area">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          {task.dueDate && (
            <div className={`task-date ${isOverdue ? 'overdue' : ''}`}>
              <Calendar size={12} />
              {formatDate(task.dueDate)}
            </div>
          )}
          {task.description && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Edit3 size={12} />
              <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {task.description}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="actions" onClick={(e) => e.stopPropagation()}>
        <button className="action-btn delete-btn" onClick={() => onDelete(task._id)}>
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
