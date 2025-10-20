import React, { useRef, useState , useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {socket} from '../App'

import { replaceRooms } from '../store/roomSlice';


// A simple SVG arrow component for our buttons
const ArrowIcon = ({ direction = 'right' }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
  >
    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function TopicScroller() {
  const topics = ["All"  , "Study_Sessions" , "Fun"  , "coding_Sessions" , "Geo_Politics_Debate" , "Brain_Rot" , "Career_Discussion" , "StartUp"];
  const dispatch = useDispatch()

  useEffect(()=>{
    if(socket){
socket.on("all_rooms_oftype" , async (rooms) => {
      dispatch(replaceRooms(rooms))
    })
    }
    
  },[])
  // State to keep track of the currently selected topic
  const [activeTopic, setActiveTopic] = useState(topics[0]);

  // A ref to get direct access to the scrollable div
  const scrollContainerRef = useRef(null);

  // Function to scroll the container to the left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  // Function to scroll the container to the right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handleTopicCLick =async (topic)=>{
    setActiveTopic(topic)
    socket.emit("get_rooms_with_type" , topic)

    

  }

  // Main container style, positioned to hold the arrow buttons
  const wrapperStyles = {
    position: 'relative',
    width: '100%',
    // This padding creates the space on the left and right for the arrows
    padding: '0 50px',
    boxSizing: 'border-box',
  };
  
  // Styles for the scrollable bar itself
  const topicBarStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px', // Reduced gap for a tighter look
    padding: '10px 0 20px 0',
    overflowX: 'auto', // Enables horizontal scrolling
    scrollBehavior: 'smooth',
    // --- CSS magic to hide the scrollbar ---
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none',  // For Internet Explorer and Edge
  };

  // Styles for the topic buttons
  const baseButtonStyles = {
    height: '40px', // Adjusted for a more standard size
    padding: '0 14px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#303030',
    color: '#F0F0F0',
    border: '2px solid transparent',
    borderRadius: '30px', // Rounded corners for a modern feel
    cursor: 'pointer',
    fontFamily: "'Inter', sans-serif", // A clean, modern font
    fontWeight: '600',
    fontSize: '18px',
    whiteSpace: 'nowrap', // Prevents text from wrapping
    transition: 'all 0.2s ease-in-out',
  };

  // Extra styles for the currently active topic button
  const activeButtonStyles = {
    borderColor: '#5BE4FF',
    backgroundColor: '#1a3a4a',
    color: '#5BE4FF',
  };

  // Base styles for the arrow buttons
  const arrowButtonBaseStyles = {
    position: 'absolute',
    top: '50%',
    // This transform vertically centers the button regardless of its height
    transform: 'translateY(-50%)', 
    zIndex: 2,
    height: '38px',
    width: '38px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    border: '1px solid #555',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={wrapperStyles}>
      {/* Left Scroll Button */}
      <button 
        // By setting 'left' to a positive value, we place it *inside* the padded area
        style={{ ...arrowButtonBaseStyles, left: '10px' }} 
        onClick={scrollLeft}
      >
        <ArrowIcon direction="left" />
      </button>
      
      {/* This is the div that will actually scroll */}
      <div 
        ref={scrollContainerRef} 
        style={topicBarStyles}
        // This is the CSS-in-JS way to hide the scrollbar for Webkit browsers (Chrome, Safari)
        css={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {topics.map((topic, index) => {
          const isActive = topic === activeTopic;
          const currentStyle = isActive
            ? { ...baseButtonStyles, ...activeButtonStyles } 
            : baseButtonStyles;
          return (
            <button 
              key={index} 
              style={currentStyle}
              onClick={() =>{ handleTopicCLick(topic)}}
            >
              {topic}
            </button>
          );
        })}
      </div>
      
      {/* Right Scroll Button */}
      <button 
        // By setting 'right' to a positive value, we place it *inside* the padded area
        style={{ ...arrowButtonBaseStyles, right: '10px' }} 
        onClick={scrollRight}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

