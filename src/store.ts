import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorsReducer from "./slices/authorsSlice";
import userReducer from "./slices/userSlice";
import predictionsReducer from "./slices/predictionsSlice";

const store = configureStore({
    reducer: combineReducers({
        authors: authorsReducer,
        user: userReducer,
        predictions: predictionsReducer
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
