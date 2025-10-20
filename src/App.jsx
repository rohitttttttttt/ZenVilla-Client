import {io, Socket} from 'socket.io-client';
import { Routes, Route  , useNavigate , Navigate} from 'react-router-dom';
import Layout from './Layout/Layout';
import HomePage from './page/HomePage';
import CreatePage from './page/CreatePage';
import ProfilePage from './page/ProfilePage';
import RoomPage from './page/RoomPage';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignupPage';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addRoom , deleteRoom , replaceRooms }  from './store/roomSlice'
import Contact from './component/Contact';
export const socket = io("https://zenvilla-server.onrender.com")
export default function App() {
  const user = useSelector((state)=>state.user)
  const room = useSelector((state)=>state.room)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(()=>{
    
    

    if(user.userName !=  null){
      socket.emit("All_Unjoined_rooms")
   
       socket.emit("register" ,user.userName )
    }
  },[user])

  useEffect(()=>{
    
    socket.on("update_room_list" , async(data)=>{
      dispatch(replaceRooms(data))
    })
  },[])

 const ProtectedRoutes = () => {
    const isAuthenticated = user.userName 
    return isAuthenticated ? <Layout /> : <Navigate to="/login" replace />;
  };
  return (
     <Routes>
      {/* 🔓 Public Routes */}
      <Route path="/login" element={<LoginPage />} />     
      <Route path="/signup" element={<SignupPage />} />

      {/* 🔒 Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path='/contact' element={<Contact/>}/>
      </Route>

      {/* Other Routes */}
      <Route path="/room/:id" element={<RoomPage />} />
    </Routes>
  );
}


/* import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const pcRef = useRef(null);
  const [isCaller, setIsCaller] = useState(false);

  useEffect(() => {
    socket.on("offer", async (offer) => {
      pcRef.current = createPeerConnection();
      await getLocalStream();
      await pcRef.current.setRemoteDescription(offer);
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      socket.emit("answer", answer);
    });

    socket.on("answer", async (answer) => {
      await pcRef.current.setRemoteDescription(answer);
    });

    socket.on("ice-candidate", async (candidate) => {
      try {
        await pcRef.current.addIceCandidate(candidate);
      } catch (e) {
        console.error("Error adding ice candidate", e);
      }
    });
  }, []);

  const getLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
    stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate);
      }
    };
    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };
    return pc;
  };

  const startCall = async () => {
    setIsCaller(true);
    pcRef.current = createPeerConnection();
    await getLocalStream();
    const offer = await pcRef.current.createOffer();
    await pcRef.current.setLocalDescription(offer);
    socket.emit("offer", offer);
  };

  return (
    <div>
      <h1>PeerCam Mini</h1>
      <video ref={localVideoRef} autoPlay playsInline muted style={{ width: "300px" }} />
      <video ref={remoteVideoRef} autoPlay playsInline style={{ width: "300px" }} />
      <div>
        {!isCaller && <button onClick={startCall}>Start Call</button>}
      </div>
    </div>
  );
}

export default App;
*/