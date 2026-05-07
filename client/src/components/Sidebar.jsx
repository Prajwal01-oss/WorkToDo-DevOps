import React from 'react';
import { 
  Sun, 
  Calendar, 
  Inbox, 
  Users, 
  Hash, 
  Settings, 
  LogOut,
  ChevronRight,
  Plus
} from 'lucide-react';

const Sidebar = ({ activeFilter, setActiveFilter, user, logout }) => {
  const navItems = [
    { id: 'today', name: 'Today', icon: Sun, count: null },
    { id: 'tomorrow', name: 'Tomorrow', icon: Calendar, count: null },
    { id: 'upcoming', name: 'Next 7 Days', icon: Calendar, count: null },
    { id: 'calendar', name: 'Calendar', icon: Calendar, count: null },
    { id: 'inbox', name: 'Inbox', icon: Inbox, count: null },
  ];

  const lists = [
    { id: 'work', name: 'Work Hard', color: '#f59e0b' },
    { id: 'life', name: 'Life Memo', color: '#10b981' },
    { id: 'workout', name: 'Workout Plan', color: '#ef4444' },
    { id: 'routine', name: 'Routine', color: '#8b5cf6' },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">W</div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>WorkToDo</h3>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${activeFilter === item.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(item.id)}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
            {item.count !== null && <span className="nav-item-count">{item.count}</span>}
          </div>
        ))}

        <div className="sidebar-section-title">Lists</div>
        {lists.map((list) => (
          <div 
            key={list.id} 
            className={`nav-item ${activeFilter === list.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(list.id)}
          >
            <Hash size={18} style={{ color: list.color }} />
            <span>{list.name}</span>
          </div>
        ))}
        
        <div className="nav-item" style={{ marginTop: '4px', border: '1px dashed var(--border)' }}>
          <Plus size={18} />
          <span>Add List</span>
        </div>
      </nav>

      <div className="sidebar-footer" style={{ padding: '20px 12px', borderTop: '1px solid var(--border)' }}>
        <div className="nav-item" onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '0.8rem', fontWeight: '600' }}>
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.email}</div>
          </div>
          <Settings size={16} color="var(--text-muted)" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
