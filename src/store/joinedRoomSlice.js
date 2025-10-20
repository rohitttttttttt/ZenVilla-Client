import { createSlice } from "@reduxjs/toolkit";

const joinedRoomSlice = createSlice({
    name:"joinedRoomSlice",
    initialState:{},
    reducers:{
        addJoinedRoom: (store , action)=>{
            return action.payload
        }
    }

})

export const {addJoinedRoom} = joinedRoomSlice.actions
export default joinedRoomSlice.reducer