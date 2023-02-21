// import { combineReducers } from "redux";
import userSlice from "./user-slice";
import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal-slice";
// import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: { user: userSlice.reducer, modal: modalSlice.reducer },
});

export default store;
