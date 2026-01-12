import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authorsReducer from "./slices/authorsSlice";
import userReducer from "./slices/userSlice";
import authorPredictionsReducer from "./slices/authorPredictionsSlice";

const store = configureStore({
    reducer: combineReducers({
        authors: authorsReducer,
        user: userReducer,
        authorPredictions: authorPredictionsReducer
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
