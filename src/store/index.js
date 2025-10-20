

import { configureStore } from '@reduxjs/toolkit';
import roomReducer from './roomSlice'; 
import joinedRoomReducer from './joinedRoomSlice'; 
import myRoomSliceReducer from './myRoomSlice';
import userSliceReducer from './userSlice'

export const store = configureStore({
  reducer: {
    // This is where you combine your reducers.
    // The key name here ('rooms', 'joinedRoom') will be the name of the state slice.
    // e.g., you'll access the rooms list with `state.rooms`
    room: roomReducer,
    joinedRoomSlice: joinedRoomReducer,
    myRoomSlice:myRoomSliceReducer,
    user:userSliceReducer

  },
});