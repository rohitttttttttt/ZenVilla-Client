import React from 'react';
import Topic from '../component/Topic';
import VideoGrid from '../component/VideoGrid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const room = useSelector((state) => state.room);
  const navigate = useNavigate()

  // Corrected 'length' here
  return (
    <>
      <Topic />
    {room.length > 0 ? (
  <VideoGrid />
) : (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      margin: "60px auto",
      maxWidth: "500px",
      padding: "40px",
      borderRadius: "16px",
      background:
        "linear-gradient(135deg, rgba(40,40,40,0.9), rgba(25,25,25,0.9))",
      border: "1px solid rgba(120,120,120,0.2)",
      boxShadow: "0 0 25px rgba(99,102,241,0.15)",
      color: "#fff",
      backdropFilter: "blur(10px)",
      animation: "fadeIn 0.8s ease-in-out",
    }}
  >
    {/* Floating SVG Icon */}
    <div
      style={{
        marginBottom: "20px",
        animation: "float 3s ease-in-out infinite",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="120"
        height="120"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{
          color: "#8b5cf6",
          filter: "drop-shadow(0 0 10px rgba(99,102,241,0.5))",
        }}
      >
        <circle cx="100" cy="100" r="40" strokeDasharray="4 4" opacity="0.6" />
        <circle cx="100" cy="100" r="60" strokeDasharray="6 6" opacity="0.3" />
        <path
          d="M85 90h30v20H85z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M115 100l15 10v-20z" fill="currentColor" opacity="0.4" />
      </svg>
    </div>

    {/* Title */}
    <h2
      style={{
        fontSize: "1.8rem",
        fontWeight: "700",
        marginBottom: "10px",
      }}
    >
      No Active Rooms
    </h2>

    {/* Description */}
    <p
      style={{
        fontSize: "1rem",
        color: "#bbb",
        lineHeight: "1.6",
        marginBottom: "25px",
      }}
    >
      It’s a little quiet here 👀 <br />
      Why not{" "}
      <span style={{ color: "#8b5cf6", fontWeight: "600" }}>
        create a new room
      </span>{" "}
      and start something awesome?
    </p>

    {/* Button */}
    <button
    onClick={()=>navigate("/create")}
      style={{
        backgroundColor: "#6d28d9",
        color: "white",
        border: "none",
        padding: "10px 24px",
        fontSize: "1rem",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: "0 0 12px rgba(109, 40, 217, 0.4)",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#7c3aed";
        e.target.style.transform = "translateY(-2px)";
        e.target.style.boxShadow = "0 0 20px rgba(124, 58, 237, 0.5)";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#6d28d9";
        e.target.style.transform = "translateY(0)";
        e.target.style.boxShadow = "0 0 12px rgba(109, 40, 217, 0.4)";
      }}
    >
      + Create Room
    </button>
  </div>
)}


    </>
  );
}