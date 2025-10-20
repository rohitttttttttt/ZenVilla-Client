import React from 'react';


import { useDispatch } from 'react-redux';
 import { addMyroom } from '../store/myRoomSlice';
 import { useNavigate } from 'react-router-dom';
 import { replaceRooms } from '../store/roomSlice';

export default function VideoCard({ thumbnailUrl, title, username }) {
   const navigate = useNavigate();
   const dispatch = useDispatch();

  const handleSubmit = () => {
   
     dispatch(addMyroom({ ownerUsername: username  , title:title}));
     navigate("/room/123"); 
    console.log(`Card clicked for user: ${username}`);
  };

  // --- STYLES UPDATED TO MATCH YOUTUBE ---

  const cardStyles = {
    width: '360px', // Standard YouTube desktop card width
    cursor: 'pointer',
    fontFamily: "'Roboto', sans-serif", // Set base font for the component
  };

  const thumbnailStyles = {
    width: '100%',
    height: '202px', // This creates the 16:9 aspect ratio (360 * 9 / 16)
    backgroundColor: '#333',
    backgroundImage: `url(${thumbnailUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '12px', // YouTube uses rounded thumbnails
  };

  const infoContainerStyles = {
    display: 'flex',
    alignItems: 'flex-start',
    marginTop: '12px', // Tighter margin like YouTube
  };

  const avatarStyles = {
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    marginRight: '12px',
    backgroundColor: '#444',
  };

  const textContainerStyles = {
    flex: 1,
    // This container helps in case the title/username needs to be constrained
    minWidth: 0, // Prevents flexbox overflow issues
  };

  const titleStyles = {
    fontSize: '26px', // YouTube title font size (1.6rem)
    fontWeight: '500', // Medium weight
    lineHeight: '22px', // (2.2rem)
    color: '#f1f1f1', // YouTube's primary text color
    margin: '0 0 4px 0',
    // --- This is the magic for two-line truncation ---
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const usernameStyles = {
    fontSize: '18px', // YouTube channel name font size (1.4rem)
    fontWeight: '400', // Regular weight
    color: '#aaa', // YouTube's secondary text color
    margin: 0,
  };

  return (
    <div style={cardStyles} onClick={handleSubmit}>
      <div style={thumbnailStyles}></div>
      <div style={infoContainerStyles}>
        {/* Using a placeholder for the avatar */}
        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png" alt="User avatar" style={avatarStyles} />
        <div style={textContainerStyles}>
          <h3 style={titleStyles}>{title}</h3>
          <p style={usernameStyles}>{username}</p>
        </div>
      </div>
    </div>
  );
}

