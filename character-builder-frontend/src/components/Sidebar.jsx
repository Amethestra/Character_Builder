import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="burger" onClick={() => setOpen(!open)}>&#9776;</div>

      <nav className={`sidebar ${open ? 'open' : ''}`}>
        <ul className="menu">
          <li className="menu-item">
            <span>Dashboard</span>
            <ul className="submenu">
              <li>Overview</li>
              <li>Stats</li>
              <li>Reports</li>
            </ul>
          </li>
          <li className="menu-item">
            <span>Characters</span>
            <ul className="submenu">
              <li><a href="/characters">All Characters</a></li>
              <li><a href="/">Today's Farmables</a></li>
            </ul>
          </li>
          <li className="menu-item">
            <span>Settings</span>
            <ul className="submenu">
              <li>Profile</li>
              <li>Security</li>
              <li>System</li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
