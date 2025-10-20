import React, { use } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SideNav() {
  const navigate = useNavigate()
  const sidebarStyles = {
    width: '200px',
    height: 'calc(100vh - 85px)', // Full screen height minus the navbar height
    backgroundColor: '#181818',
    borderRight: '1px solid #FFFFFF',
    boxSizing: 'border-box',
    display:"flex" , 
    flexDirection:"column",
    alignItems:"center"
  };

  const baseLinkStyles = {
    fontFamily: "'Cormorant Garamond', serif",
    fontWeight: '300',
    fontSize: '35px',
    color: '#FFFFFF',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
    paddingLeft: '10px',
    margin:"30px 0"
  };
  
  const homeLinkStyles = {
    ...baseLinkStyles,
    height: '40px',
    backgroundColor: '#303030',
  };

  const otherLinkStyles = {
    ...baseLinkStyles,
    height: '40px',
    
  };

  return (
    <nav style={sidebarStyles}>
      <h3 onClick={(e)=>navigate("/")} style={otherLinkStyles}>home</h3>
      <h3 onClick={(e)=>navigate("/create") }style={otherLinkStyles}>create</h3>
      <h3 onClick={(e)=>navigate("/profile")} style={otherLinkStyles}>profile</h3>
    </nav>
  );
}