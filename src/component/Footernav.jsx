// src/component/FooterNav.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaPlusSquare, FaUser } from 'react-icons/fa'; // Importing icons

export default function FooterNav() {
  const navStyles = {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 0',
  };

  const linkStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#AAA',
    textDecoration: 'none',
    fontSize: '12px',
  };
  
  const activeLinkStyle = {
    color: '#FFFFFF', // Active link is white
  };

  return (
    <nav style={navStyles}>
      <NavLink to="/" style={({ isActive }) => isActive ? { ...linkStyles, ...activeLinkStyle } : linkStyles}>
        <FaHome size={24} />
        <span>Home</span>
      </NavLink>
      <NavLink to="/create" style={({ isActive }) => isActive ? { ...linkStyles, ...activeLinkStyle } : linkStyles}>
        <FaPlusSquare size={24} />
        <span>Create</span>
      </NavLink>
      <NavLink to="/profile" style={({ isActive }) => isActive ? { ...linkStyles, ...activeLinkStyle } : linkStyles}>
        <FaUser size={24} />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}