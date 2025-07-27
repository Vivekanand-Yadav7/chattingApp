import { createSlice } from "@reduxjs/toolkit";
const chatReducer = createSlice({
    name: 'chat',
    initialState: [],
    reducers:{
        setChat: (state, action)=>action.payload
    }
})

export const {setChat} = chatReducer.actions;
export default chatReducer.reducer;