import React, { useState, useRef } from 'react';
import { NavLink , useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';

export default function SignupPage() {
  const [userName, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate()
  const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()

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
    const res =  await axios.post("https://zenvilla-server.onrender.com/user/register",formData, )
    if(res.status === 200){
      
        dispatch(addUser(res.data.user))

     
      navigate("/")
    }
    console.log('Signing up with:', { username, fullName, password, profilePic });
    // TODO: Integrate your signup API call here
    alert('Signup button clicked! (Check console for data)');
  };

  // --- STYLE OBJECTS (same structure as login, but with profile pic styles) ---
  const pageContainerStyles = { display: 'flex', minHeight: 'calc(100vh - 90px)', backgroundColor: '#121212' };
  const introPanelStyles = { flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundImage: `linear-gradient(rgba(18, 18, 18, 0.7), rgba(18, 18, 18, 0.9)), url(https://images.unsplash.com/photo-1529333166437-77501bd391a8?q=80&w=1887)`, backgroundSize: 'cover', backgroundPosition: 'center' };
  const formPanelStyles = { flex: 1, padding: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center' };
  const introTitleStyles = { fontFamily: "'Alfa Slab One', cursive", fontSize: '80px', color: '#FFFFFF', marginBottom: '20px', lineHeight: '1.2' };
  const introMessageStyles = { fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', color: '#E0E0E0', lineHeight: '1.6', maxWidth: '600px' };
  const formTitleStyles = { fontFamily: "'Alfa Slab One', cursive", fontSize: '60px', color: '#FFFFFF', textAlign: 'center', marginBottom: '40px' };
  const formStyles = { display: 'flex', flexDirection: 'column', gap: '30px' };
  const inputStyles = { backgroundColor: '#303030', border: '1px solid #555', borderRadius: '8px', color: '#FFFFFF', fontSize: '24px', padding: '20px', fontFamily: "'Cormorant Garamond', serif" };
  const buttonStyles = { backgroundColor: '#5BE4FF', border: 'none', borderRadius: '8px', color: '#000000', fontSize: '28px', padding: '20px', fontFamily: "'Alfa Slab One', cursive", cursor: 'pointer' };
  const switchLinkStyles = { color: '#AAA', textAlign: 'center', marginTop: '20px', fontSize: '18px' };
  const profilePicContainer = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', cursor: 'pointer' };
  const profilePicPreview = { width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#303030', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' };
  const profilePicText = { color: '#AAA', fontSize: '18px' };
  
  // --- JSX STRUCTURE ---
  return (
    <>
      <Navbar />
      <div style={pageContainerStyles}>
        {/* Left Side Panel */}
        <div style={introPanelStyles}>
          <h1 style={introTitleStyles}>Join the Community!</h1>
          <p style={introMessageStyles}>Create an account to start sharing, streaming, and discovering content. Your next great experience is just a click away.</p>
        </div>

        {/* Right Side Panel (Form) */}
        <div style={formPanelStyles}>
          <h2 style={formTitleStyles}>Sign Up</h2>
          <form style={formStyles} onSubmit={handleSubmit}>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
            <div style={profilePicContainer} onClick={() => fileInputRef.current.click()}>
              <div style={profilePicPreview}>
                {previewUrl ? <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FaUserCircle size={80} color="#555" />}
              </div>
              <span style={profilePicText}>Choose Profile Picture</span>
            </div>
            <input type="text" placeholder="Username" style={inputStyles} value={userName} onChange={(e) => setUsername(e.target.value)} />
            <input type="text" placeholder="Full Name" style={inputStyles} value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="password" placeholder="Password" style={inputStyles} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" style={buttonStyles}>Create Account</button>
          </form>
          <p style={switchLinkStyles}>
            Already have an account? <NavLink to="/login" style={{ color: '#5BE4FF' }}>Log In</NavLink>
          </p>
        </div>
      </div>
    </>
  );
}