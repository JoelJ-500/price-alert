import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        {/* Add every product user is tracking */}
      </ul>
    </div>
  );
}

export default Sidebar;
