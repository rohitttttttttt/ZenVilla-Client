import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Navbar from '../component/Navbar';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../store/userSlice';
import './AuthPages.css';

export default function LoginPage() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userName || !password) {
      alert('Please enter both username and password.');
      return;
    }
    const res = await axios.post("http://localhost:5000/user/login", { userName, password });
    if (res.status === 200) {
      dispatch(addUser(res.data.user));
      navigate("/");
    }
  };

  useEffect(() => {
    if (user && user._id) navigate("/");
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-intro login-bg">
          <h1>Welcome Back!</h1>
          <p>Log in to continue sharing your moments and connect with the community. We're glad to see you again.</p>
        </div>

        <div className="auth-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Log In</button>
          </form>
          <p>Don't have an account? <NavLink to="/signup">Sign Up</NavLink></p>
        </div>
      </div>
    </>
  );
}
