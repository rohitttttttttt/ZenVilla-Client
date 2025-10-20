import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function ProfilePage() {
  // --- STYLE OBJECTS (FIXED WITH EXACT DIMENSIONS & SPACING) ---
const user = useSelector((state)=>state.user)
// --- STYLE OBJECTS (ADJUSTED FOR FIT) ---

  const pageStyles = {
    width: '100%',
    height: 'calc(100vh - 90px)', // Full available height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
    gap: '1.5rem', // Space between major sections
  };

  const profileHeaderStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  };

  const avatarStyles = {
    // Responsive size: 25% of the viewport height, but no smaller than 120px and no larger than 200px
    width: 'clamp(120px, 25vh, 200px)',
    height: 'clamp(120px, 25vh, 200px)',
    borderRadius: '50%',
    backgroundColor: '#333',
    backgroundImage: `url(${user.profile})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '4px solid #444',
  };

  const textGroupStyles = {
    textAlign: 'center',
  };

  const usernameStyles = {
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', // Responsive font size
    fontWeight: '700',
    color: '#FFFFFF',
    margin: 0,
  };
  
  const fullNameStyles = {
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    fontWeight: '400',
    color: '#aaa',
    margin: '0.25rem 0 0 0', // Small top margin
  };

  const bioSectionStyles = {
    width: '100%',
    maxWidth: '700px', // Set a max width for readability
    textAlign: 'center',
  };
  
  const bioBoxStyles = {
    width: '100%',
    minHeight: '100px', // A minimum height for the bio box
    backgroundColor: '#303030',
    borderRadius: '8px',
    padding: '1.5rem',
    boxSizing: 'border-box',
  };

  const bioTextStyles = {
    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
    lineHeight: '1.6',
    color: '#f1f1f1',
    margin: 0,
    textAlign: 'left',
  };

  // --- JSX STRUCTURE ---

  return (
    <div style={pageStyles}>
      <div style={profileHeaderStyles}>
        <div style={avatarStyles}></div>
        <div style={textGroupStyles}>
          <h2 style={usernameStyles}>{user ? user.userName : "username"}</h2>
          <h3 style={fullNameStyles}>{user ? user.fullName : "Full Name"}</h3>
        </div>
      </div>

      <div style={bioSectionStyles}>
        <div style={bioBoxStyles}>
          <p style={bioTextStyles}>
            Hey {user.fullName},

Welcome to the platform! We're thrilled to have you here.

Stay connected and keep visiting, because what you see right now isn't even the tip of the iceberg. We have lots of exciting things coming to this platform, including features to share posts, direct messaging, and streaks. All you have to do is wait—the best is yet to come!
          </p>
        </div>
      </div>
    </div>
  );
}