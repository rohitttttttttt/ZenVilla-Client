import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/Zen-Villa.png';
import './Navbar.css'; // 1. Import the new CSS file

export default function Navbar() {
  return (
    // 2. Use className to apply the styles from your CSS file
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <h1 className="navbar-title">Zen Villa</h1>
      </div>
      <NavLink to="/contact" className="navbar-contact">
        Contact
      </NavLink>
    </nav>
  );
}