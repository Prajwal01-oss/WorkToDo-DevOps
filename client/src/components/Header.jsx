import React from 'react';
import { LogOut, Bell, Search, User } from 'lucide-react';

const Header = ({ user, logout }) => {
  return (
    <header className="main-header">
      <div className="header-search">
        <Search size={18} />
        <input type="text" placeholder="Search tasks..." />
      </div>
      
      <div className="header-actions">
        <button className="icon-btn"><Bell size={20} /></button>
        <div className="user-profile">
          <div className="user-info">
            <span className="username">{user?.name}</span>
            <span className="useremail">{user?.email}</span>
          </div>
          <div className="user-avatar">
            {user?.name?.charAt(0) || 'U'}
          </div>
        </div>
        <button onClick={logout} className="logout-btn" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
