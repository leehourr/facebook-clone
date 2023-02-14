// import { combineReducers } from "redux";
import userSlice from "./user-slice";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: { user: userSlice.reducer },
});

export default store;
