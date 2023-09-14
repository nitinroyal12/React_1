import { createSlice } from "@reduxjs/toolkit";

const data = createSlice({
    name:"item",
    initialState:[],
    reducers:{
        additem:(state,action) =>{
            state.push(action.payload)
        }
    }
})

 export const {additem} = data.actions
export default data.reducer;