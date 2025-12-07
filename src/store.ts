import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorsReducer from "./slices/authorsSlice";

const store = configureStore({
    reducer: combineReducers({
        authors: authorsReducer
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
