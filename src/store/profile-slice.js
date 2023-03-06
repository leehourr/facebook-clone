import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {},
  reducers: {
    userProfile(state, action) {
      return { ...action.payload };
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;

// export function userReducer(state = null, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return action.payload;

//     default:
//       return state;
//   }
// }
