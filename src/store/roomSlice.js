import { createSlice ,nanoid } from '@reduxjs/toolkit'


const roomSlice = createSlice({
    name:"room" ,
    initialState:[],
    reducers:{
        addRoom : (state , action )=>{
            const rooms  =  action.payload
            if(Array.isArray(rooms)){
                state.push(...rooms)
            }else{
                state.push(rooms)
            }
        },
        replaceRooms:(state,action)=>{
            return  action.payload
        },
        deleteRoom : (state , action )=>{
            const username = action.payload
            

            return state.filter(room => room.username !== username)
            
        }


    }
})

export const  {addRoom , deleteRoom , replaceRooms } = roomSlice.actions
export default roomSlice.reducer