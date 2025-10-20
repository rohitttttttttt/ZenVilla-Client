import React from 'react';
import VideoCard from './VideoCard';
import { useSelector } from 'react-redux';

export default function VideoGrid() {
  const videoData = useSelector((state )=>state.room)
  const user = useSelector((state)=>state.user)
  // 2. ADD THE INLINE STYLE OBJECT BACK
  const gridStyles = {
    display: 'grid',
    // This tells the grid to create as many 716px columns as can fit.
    gridTemplateColumns: 'repeat(auto-fill, 346px)',
    gap: '60px 80px',
    justifyContent: 'center', // Helps center the grid when there's extra space
  };

  return (
    // 3. APPLY THE INLINE STYLE
    <div style={gridStyles}>
      {videoData.map((video, index) => (
        <VideoCard 
          key={index}
          thumbnailUrl={video.url}
        //  avatarUrl={video.avatarUrl}
          title={video.title}
          username={video.userName}
        />
      ))}
    </div>
  );
}