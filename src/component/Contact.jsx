import React from "react";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const styles = {
    container: {
      width: "100%",
      height: "100%", // takes only parent's height
      backgroundColor: "#0a0a0a",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "40px 20px",
      fontFamily: "'Poppins', sans-serif",
      boxSizing: "border-box",
    },
    heading: {
      fontSize: "2.3rem",
      marginBottom: "10px",
      background: "linear-gradient(90deg, #00ffff, #8a2be2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 0 8px #00ffff",
    },
    subheading: {
      fontSize: "1rem",
      color: "#aaa",
      maxWidth: "600px",
      marginBottom: "30px",
      lineHeight: "1.6",
    },
    iconContainer: {
      display: "flex",
      gap: "25px",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      fontSize: "2.2rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    linkedin: { color: "#0e76a8" },
    github: { color: "#fff" },
    instagram: { color: "#E1306C" },
    glowEffect: {
      filter: "drop-shadow(0 0 8px rgba(0,255,255,0.6))",
    },
    footer: {
      marginTop: "40px",
      fontSize: "0.9rem",
      color: "#666",
    },
  };

  // hover effect for icons (inline workaround)
  const handleMouseEnter = (e) => {
    e.target.style.transform = "scale(1.15)";
    e.target.style.filter = "drop-shadow(0 0 10px rgba(0,255,255,0.9))";
  };

  const handleMouseLeave = (e) => {
    e.target.style.transform = "scale(1)";
    e.target.style.filter = "drop-shadow(0 0 8px rgba(0,255,255,0.6))";
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Get in Touch</h1>
      <p style={styles.subheading}>
        I'm always open to collaborations, new ideas, or just a friendly chat!
        You can connect with me on the platforms below.
      </p>

      <div style={styles.iconContainer}>
        <a
          href="https://www.linkedin.com/in/rohit-mishra-9678292a6/"
          target="_blank"
          rel="noreferrer"
          style={{ ...styles.icon, ...styles.linkedin, ...styles.glowEffect }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FaLinkedin />
        </a>

        <a
          href="https://github.com/rohitttttttttt"
          target="_blank"
          rel="noreferrer"
          style={{ ...styles.icon, ...styles.github, ...styles.glowEffect }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FaGithub />
        </a>

        <a
          href="https://www.instagram.com/rohitmishra3153/"
          target="_blank"
          rel="noreferrer"
          style={{ ...styles.icon, ...styles.instagram, ...styles.glowEffect }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FaInstagram />
        </a>
      </div>

      <p style={styles.footer}>© 2025 Zen Villa | Designed by Rohit Mishra</p>
    </div>
  );
}
