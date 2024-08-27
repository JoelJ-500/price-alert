import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {/* Add more links here for other features or pages */}
      </ul>
    </div>
  );
}

export default Sidebar;
