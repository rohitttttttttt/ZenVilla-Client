import { createSlice } from "@reduxjs/toolkit";
import { use } from "react";

const userSlice = createSlice({
    name : "user" ,
    initialState : {} ,
    reducers : {
        addUser : (state , action )=>{
            return action.payload
        },
        removeUser : (state , action ) => {
            return  {}
        }
        
    }

}) 

export const {addUser , removeUser} = userSlice.actions
export default userSlice.reducer