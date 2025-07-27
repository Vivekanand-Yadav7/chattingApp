import {createSlice} from "@reduxjs/toolkit";
const currChatReducer = createSlice({
    name: 'currChat',
    initialState: null,
    reducers:{
        setCurrChat: (state, action)=>action.payload
    }
})
export const {setCurrChat} = currChatReducer.actions;
export default currChatReducer.reducer;