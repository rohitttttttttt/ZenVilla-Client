// src/component/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../component/Navbar';
import SideNav from '../component/SideNav';
import FooterNav from '../component/Footernav';
import './Layout.css'; // Import our responsive styles

export default function Layout() {
  

  return (
    <div>
      <Navbar />
      <div className="app-container">
        {/* The SideNav will be hidden by CSS on mobile screens */}
        <div className="sidenav">
          <SideNav />
        </div>

        <div className='mainContentStyles'>
          {/* Outlet is the placeholder for our page content */}
          <Outlet />
        </div>
      </div>
      {/* The FooterNav will be hidden by CSS on desktop screens */}
      <div className="footer-nav">
        <FooterNav />
      </div>
    </div>
  );
}