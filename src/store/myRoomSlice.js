import { createSlice } from "@reduxjs/toolkit";

const myRoomSlice = createSlice({
    name:"myRoomSlice",
    initialState:{
        offer:"",
        answer:"",
        myStream:"",
        remoteStream:"",
        joineeuserName:"",
        amIOwner:false,
        ownerUsername:"",
        title:""
    },
    reducers:{
        addMyroom: (state , action)=>{
            Object.assign(state, action.payload);
        },
        removeMyRoom : (state , action)=>{
            return {}
        }
        
    }

})

export const {addMyroom , removeMyRoom} = myRoomSlice.actions
export default myRoomSlice.reducer