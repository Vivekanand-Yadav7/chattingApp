import { createSlice, isAction } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
    name: 'allUsers',
    initialState: [],
    reducers: {
        setAllUsers: (state, action)=> action.payload
    }
})

export const {setAllUsers} = allUserSlice.actions;
export default allUserSlice.reducer;