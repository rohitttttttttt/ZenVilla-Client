import React, { useState, useRef } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import './AuthPages.css';

export default function SignupPage() {
  const [userName, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userName || !fullName || !password || !profilePic) {
      alert('Please fill out all fields and choose a profile picture.');
      return;
    }
    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('fullName', fullName);
    formData.append('password', password);
    formData.append('profilePic', profilePic);
    const res = await axios.post("https://zenvilla-server.onrender.com/user/register", formData);
    if (res.status === 200) {
      dispatch(addUser(res.data.user));
      navigate("/");
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-intro signup-bg">
          <h1>Join the Community!</h1>
          <p>Create an account to start sharing, streaming, and discovering content. Your next great experience is just a click away.</p>
        </div>

        <div className="auth-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            <div className="profile-pic" onClick={() => fileInputRef.current.click()}>
              <div className="pic-preview">
                {previewUrl ? <img src={previewUrl} alt="Preview" /> : <FaUserCircle size={80} color="#666" />}
              </div>
              <span>Choose Profile Picture</span>
            </div>
            <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Create Account</button>
          </form>
          <p>Already have an account? <NavLink to="/login">Log In</NavLink></p>
        </div>
      </div>
    </>
  );
}
