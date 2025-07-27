import { createSlice } from "@reduxjs/toolkit"

const loaderSlice = createSlice({
    initialState: false,
    name: 'loader',
    reducers:{
        showLoad: (state)=>true,
        hideLoad: (state)=>false
    }
})

export  const {showLoad, hideLoad} = loaderSlice.actions;
export default loaderSlice.reducer ;