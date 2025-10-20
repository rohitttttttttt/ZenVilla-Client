import React, { useState, useRef } from 'react';
import { FaImage, FaChevronDown } from 'react-icons/fa';
import { socket } from '../App';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { addMyroom } from '../store/myRoomSlice';
export default function CreatePage() {
  // --- STATE MANAGEMENT (This part was correct) ---
  const [title, setTitle] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  
  const fileInputRef = useRef(null);
  const topics = ["All"  , "Study_Sessions" , "Fun"  , "coding_Sessions" , "Geo_Politics_Debate" , "Brain_Rot" , "Career_Discussion" , "StartUp"];
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  // --- HANDLER FUNCTIONS (This part was correct) ---
  const handleUploadClick = () => { fileInputRef.current.click(); };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setIsDropdownOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !title || !selectedTopic) {
      alert('Please fill out all fields and select a picture.');
      return;
    }
    
   
     const formData = new FormData();
    formData.append('userName', user.userName);
    formData.append('type', selectedTopic);
    formData.append('title', title);
    formData.append('thumbNail', selectedFile);
    
    const res =  await axios.post("https://zenvilla-server.onrender.com/upload",formData, )
    if(res.status === 200 ){
      dispatch(addMyroom({  amIOwner:true , owownerUsername:user.userName , title:title}))
      navigate(`/room/123`)
    }else{
      alert("something went wrong please try again ")
    }
  };
  


 // --- STYLE OBJECTS (ADJUSTED FOR FIT) ---

  const pageStyles = {
    width: '95%',
    height: 'calc(100vh - 90px)', // Takes full height minus navbar
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif", // Using a more standard UI font
  };

  const formStyles = {
    width: '100%',
    maxWidth: '800px', // A reasonable max width for the form
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Distributes space between elements
    gap: '1rem', // A small gap for spacing
  };

  const uploadBoxStyles = {
    width: '100%',
    flex: 1, // This makes the upload box take up most of the available space
    minHeight: '200px', // Prevents it from becoming too small
    backgroundColor: '#303030',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
    textAlign: 'center',
    color: '#aaa',
    fontSize: '1rem',
    overflow: 'hidden', // Ensures the preview image fits
    border: '2px dashed #444',
  };

  const inputStyles = {
    width: '100%',
    height: '56px', // Standard input height
    backgroundColor: '#303030',
    border: '1px solid #444',
    borderRadius: '8px',
    outline: 'none',
    padding: '0 20px',
    boxSizing: 'border-box',
    fontFamily: "'Inter', sans-serif",
    fontSize: '1.2rem',
    color: '#FFFFFF',
  };
  
  const topicContainerStyles = {
    position: 'relative',
    width: '100%',
  };

  const selectBoxStyles = {
    ...inputStyles,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  };
  
  const dropdownStyles = {
    position: 'absolute',
    top: '105%', // Position slightly below the select box
    left: 0,
    width: '100%',
    backgroundColor: '#303030',
    listStyle: 'none',
    padding: '0.5rem 0',
    margin: 0,
    zIndex: 10,
    borderRadius: '8px',
    border: '1px solid #444',
    maxHeight: '200px',
    overflowY: 'auto',
  };

  const dropdownItemStyles = {
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    cursor: 'pointer',
    fontSize: '1.2rem',
    color: '#FFFFFF',
  };
  
  const imagePreviewStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const createButtonStyles = {
    width: '100%',
    height: '60px',
    backgroundColor: '#5BE4FF',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    fontFamily: "'Inter', sans-serif",
    fontWeight: '700',
    fontSize: '1.5rem',
    color: '#000000',
  };


  // --- JSX STRUCTURE ---

  return (
    <div style={pageStyles}>
      <form style={formStyles} onSubmit={handleSubmit}>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/*"
        />
        <div style={uploadBoxStyles} onClick={handleUploadClick}>
          {previewUrl ? (
            <img src={previewUrl} alt="Selected preview" style={imagePreviewStyles} />
          ) : (
            <>
              <FaImage size={60} />
              <span>Click to upload a thumbnail</span>
            </>
          )}
        </div>
        <input 
          type="text" 
          placeholder="Title" 
          style={inputStyles}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div style={topicContainerStyles}>
          <div style={selectBoxStyles} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span>{selectedTopic || 'Select Topic'}</span>
            <FaChevronDown />
          </div>
          {isDropdownOpen && (
            <ul style={dropdownStyles}>
              {topics.map((topic) => (
                <li 
                  key={topic} 
                  style={dropdownItemStyles} 
                  onClick={() => handleTopicSelect(topic)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#444'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" style={createButtonStyles}>
          Create
        </button>
      </form>
    </div>
  );
}