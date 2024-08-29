import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#333', color: '#fff' }}>
      <div>
        <Link to="/dashboard" style={{ color: '#fff', textDecoration: 'none' }}>Price Tracker</Link>
      </div>
      <div>
        <input type="text" placeholder="Search tracked products..." />
      </div>
      <div>
        <Link to="/settings" style={{ color: '#fff', marginRight: '10px' }}>Settings</Link>
        <Link to="/login" style={{ color: '#fff' }}>Login</Link>
      </div>
    </div>
  );
}

export default TopBar;
