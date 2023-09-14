import { configureStore } from "@reduxjs/toolkit";
import data from "./slices"
export const store = configureStore({
    reducer:{
        data:data
    }
})