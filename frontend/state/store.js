// ✨ create your `store` in this module
import { configureStore } from "@reduxjs/toolkit";
import quotesReducer from "./quotesSlice.js";

export const store = configureStore({
    reducer: { 
        quotesState: quotesReducer,
}
}); 

