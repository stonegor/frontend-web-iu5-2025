import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorsReducer from "./slices/authorsSlice";

export default configureStore({
    reducer: combineReducers({
        authors: authorsReducer
    })
});
