import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskInput from './TaskInput';
import TaskDetail from './TaskDetail';
import API_BASE_URL from '../../config';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskList = ({ user, activeFilter }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }), [user.token]);

  useEffect(() => {
    fetchTasks();
  }, [config]);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/tasks`, config);
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      // Auto-assign category if a category filter is active
      const categoryLists = ['work', 'life', 'workout', 'routine'];
      const payload = {
        ...taskData,
        category: taskData.category || (categoryLists.includes(activeFilter) ? activeFilter : 'inbox')
      };
      const { data } = await axios.post(`${API_BASE_URL}/tasks`, payload, config);
      setTasks([data, ...tasks]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const { data } = await axios.put(`${API_BASE_URL}/tasks/${id}`, updates, config);
      setTasks(tasks.map(t => t._id === id ? data : t));
      if (selectedTask && selectedTask._id === id) {
        setSelectedTask(data);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`, config);
      setTasks(tasks.filter(t => t._id !== id));
      if (selectedTask && selectedTask._id === id) {
        setSelectedTask(null);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Filtering logic
  const filteredTasks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextWeek = new Date(today);
    nextWeek.setDate(nextWeek.getDate() + 7);

    return tasks.filter(task => {
      // Category filtering
      const categoryLists = ['work', 'life', 'workout', 'routine'];
      if (categoryLists.includes(activeFilter)) {
        return task.category === activeFilter;
      }

      if (activeFilter === 'calendar') return true;
      if (!task.dueDate) return activeFilter === 'inbox' || activeFilter === 'all';
      
      const taskDate = new Date(task.dueDate);
      taskDate.setHours(0, 0, 0, 0);

      switch (activeFilter) {
        case 'today':
          return taskDate.getTime() === today.getTime();
        case 'tomorrow':
          return taskDate.getTime() === tomorrow.getTime();
        case 'upcoming':
          return taskDate >= today && taskDate <= nextWeek;
        case 'inbox':
          return !task.dueDate;
        default:
          return true;
      }
    });
  }, [tasks, activeFilter]);

  const groupedTasks = useMemo(() => {
    const groups = {
      overdue: [],
      today: [],
      tomorrow: [],
      upcoming: [],
      noDate: []
    };

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    filteredTasks.forEach(task => {
      if (!task.dueDate) {
        groups.noDate.push(task);
      } else {
        const d = new Date(task.dueDate);
        d.setHours(0, 0, 0, 0);
        if (d < now && !task.completed) groups.overdue.push(task);
        else if (d.getTime() === now.getTime()) groups.today.push(task);
        else if (d.getTime() === tomorrow.getTime()) groups.tomorrow.push(task);
        else groups.upcoming.push(task);
      }
    });

    return groups;
  }, [filteredTasks]);

  const renderGroup = (title, taskList) => {
    if (taskList.length === 0) return null;
    return (
      <div className="task-group">
        <div className="task-group-title">{title} <span style={{ opacity: 0.5 }}>{taskList.length}</span></div>
        {taskList.map(task => (
          <TaskItem 
            key={task._id}
            task={task}
            onToggle={(id, completed) => updateTask(id, { completed: !completed })}
            onDelete={deleteTask}
            isSelected={selectedTask?._id === task._id}
            onSelect={setSelectedTask}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', height: '100%', width: '100%' }}>
      <div className="scroll-area" style={{ flex: 1 }}>
        <div className="task-list-container">
          <header className="content-header" style={{ padding: '24px 0' }}>
            <h2 style={{ fontSize: '1.5rem' }}>{activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} Tasks</h2>
          </header>
          
          <TaskInput onAdd={addTask} />

            {loading ? (
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '40px' }}>Loading tasks...</p>
            ) : activeFilter === 'calendar' ? (
              <div className="calendar-container animate-fade-in">
                <Calendar 
                  tileContent={({ date }) => {
                    const hasTask = tasks.some(t => {
                      if (!t.dueDate) return false;
                      const d = new Date(t.dueDate);
                      return d.toDateString() === date.toDateString();
                    });
                    return hasTask ? <div className="calendar-dot"></div> : null;
                  }}
                  onClickDay={(date) => {
                    const tasksOnDate = tasks.filter(t => {
                      if (!t.dueDate) return false;
                      const d = new Date(t.dueDate);
                      return d.toDateString() === date.toDateString();
                    });
                    if (tasksOnDate.length > 0) {
                      setSelectedTask(tasksOnDate[0]);
                    }
                  }}
                />
              </div>
            ) : filteredTasks.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '80px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>No tasks found for this view.</p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Try adding a new task above!</p>
              </div>
            ) : (
              <>
                {renderGroup('Overdue', groupedTasks.overdue)}
                {renderGroup('Today', groupedTasks.today)}
                {renderGroup('Tomorrow', groupedTasks.tomorrow)}
                {renderGroup('Upcoming', groupedTasks.upcoming)}
                {renderGroup('Inbox', groupedTasks.noDate)}
              </>
            )}
          </div>
      </div>

      {selectedTask && (
        <TaskDetail 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
};

export default TaskList;
