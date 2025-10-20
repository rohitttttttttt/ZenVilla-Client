import React , {useEffect , useState , useRef}from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { addMyroom ,removeMyRoom  } from '../store/myRoomSlice';
// Importing icons for the buttons
import { FaArrowLeft, FaVideo, FaMicrophone, FaPhoneSlash } from 'react-icons/fa';
import Navbar from '../component/Navbar';
import { socket } from '../App';
import './RoomPage.css'
import { useNavigate } from 'react-router-dom';
export default function RoomPage() {
   const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  
const localStreamRef = useRef(null);
  const pcRef = useRef(null);
  const [isCaller, setIsCaller] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const room = useSelector((state)=>state.myRoomSlice)
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const hasRunRef = useRef(false)
  let iceCandidateQueue = [];

  useEffect(() => {
    if (hasRunRef.current) return;
  hasRunRef.current = true;
  if (room.amIOwner) {
    socket.on("want_to_join_my_room", async ( userName , offer) => {
      console.log("recievded answer")
      pcRef.current = createPeerConnection(userName);
      await getLocalStream();
      await pcRef.current.setRemoteDescription(offer);
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);
      dispatch(addMyroom({ joineeuserName: userName }));
      socket.emit("joining_room", userName, answer);
    });
  } else {
    (async () => {
      console.log("sending offer ")
      pcRef.current = createPeerConnection(room.ownerUsername);
      await getLocalStream();
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      socket.emit("want_to_join", room.ownerUsername, offer);
     console.log("sent  offer ")
      socket.on("joining_my_room", async (answer) => {
        
        await pcRef.current.setRemoteDescription(answer);

        iceCandidateQueue.forEach(candidate => {
    pcRef.current.addIceCandidate(candidate);
  });

  // Clear the queue
  iceCandidateQueue = [];
      });

      socket.on("ice-candidate", async (candidate) => {
        try {
          if(pcRef.current.remoteDescription !=null){
            await pcRef.current.addIceCandidate(candidate);
          }else {
      // If not, add the candidate to our queue
      iceCandidateQueue.push(candidate);
    }
          
        } catch (e) {
          console.error("Error adding ice candidate", e);
        }
      });
    })();
  }

  socket.on("owner_leaved_room" , async () => {
    dispatch(removeMyRoom())
    await stopLocalStream()
  
  
   
    navigate("/")
  })
  socket.on("owner_Removed_joinee" , async () => {
    dispatch(removeMyRoom())
   
    
   await stopLocalStream()
   
    navigate("/")
  })

  socket.on("joinee_leaved_room" , async () => {
    
   
    
   await stopLocalStream()
   
    alert("joinee leaved the room  please wait for ne joinee")
  })


  if(pcRef.current){
    pcRef.current.onconnectionstatechange = () => {
  
  if (pcRef.current.connectionState === "failed" || pcRef.current.connectionState === "disconnected" || pcRef.current.connectionState === "closed") {
    
    stopLocalStream();
    pcRef.current.close();

    if (!room.amIOwner) {
      alert("The host connection was lost. Returning to home.");
      navigate("/");
    }
  }
};
  }

}, []);

  const createPeerConnection = (userName) => {
    const pc = new RTCPeerConnection();
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", event.candidate , userName);
      }
    };
    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };
    return pc;
  };

  const getLocalStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current.srcObject = stream;
   
    stream.getTracks().forEach(track => pcRef.current.addTrack(track, stream));
  };

  const handleEndCall = async () => {
   await stopLocalStream()
   
    if(room.amIOwner){
       socket.emit("owner_leaving_room" , room.joineeuserName)
      navigate("/")
    }else{
      socket.emit("joinee_Leaving_rooms" , room.ownerUsername)
      navigate('/')
    }
  }
  const handleRemoveCall = async () => {
   await stopLocalStream()

  
    if(room.amIOwner){
      socket.emit("owner_removing_joinee" ,room.joineeuserName )
      dispatch(addMyroom({joineeuserName:""}))
    }
  }
    const toggleMic = () => {
    const stream = localVideoRef.current?.srcObject;
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  const toggleCamera = () => {
    const stream = localVideoRef.current?.srcObject;
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };
 const stopLocalStream =async ()=>{
  const stream  = localVideoRef.current.srcObject
  await stream.getTracks().forEach(track => track.stop());
  if (localVideoRef.current) {
    localVideoRef.current.srcObject = null;
  }
  console.log("stopped it ")
  await pcRef.current.close()
  console.log("stopped the rtc too ")
   pcRef.current = null

  
 }

   return (
    <>
      <Navbar />
      <div className="room-page">
        {/* Top Bar: Back Button and Title */}
        <div className="top-bar">
          <NavLink to="/" className="back-button">
            <FaArrowLeft size={20} />
            <span>Back</span>
          </NavLink>
          <h1 className="room-title">
            {room.title || "Video Call"}
          </h1>
        </div>

        {/* Video Area */}
        <div className="video-area">
          <div className="video-participant">
            <video ref={localVideoRef} autoPlay playsInline muted className="video-box" />
            <p className="username">{user.userName || "You"}</p>
          </div>

          <div className="video-participant">
            {(!room.amIOwner || room.joineeuserName != null) ? (
              <>
                <video ref={remoteVideoRef} autoPlay playsInline className="video-box" />
                <p className="username">{room.amIOwner ? room.joineeuserName : room.ownerUsername}</p>
              </>
            ) : (
              <div className="waiting-placeholder">
                <p>Waiting for others to join...</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Controls */}
               {/* Bottom Controls */}
        <div className="controls-bar">
          <button className="control-button" onClick={toggleMic} title="Toggle Mic">
            <FaMicrophone size="50%" color={isMicOn ? "white" : "red"} />
          </button>

          <button className="control-button" onClick={toggleCamera} title="Toggle Camera">
            <FaVideo size="50%" color={isCameraOn ? "white" : "red"} />
          </button>

          {room.amIOwner && room.joineeuserName && (
            <button
              className="control-button remove-button"
              onClick={handleRemoveCall}
              title="Remove Joinee"
            >
              ❌
            </button>
          )}

          <button
            onClick={handleEndCall}
            className="control-button hangup-button"
            title="End Call"
          >
            <FaPhoneSlash size="50%" />
          </button>
        </div>

      </div>
    </>
  );
}
