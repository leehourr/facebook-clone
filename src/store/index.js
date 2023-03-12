// import { combineReducers } from "redux";
import userSlice from "./user-slice";
import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal-slice";
import profileSlice from "./profile-slice";
import searchSlice from "./searchSlice";
// import { composeWithDevTools } from "redux-devtools-extension";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    profile: profileSlice.reducer,
    search: searchSlice.reducer,
  },
});

export default store;
