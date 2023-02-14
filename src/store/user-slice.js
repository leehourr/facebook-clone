import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;

// export function userReducer(state = null, action) {
//   switch (action.type) {
//     case "LOGIN":
//       return action.payload;

//     default:
//       return state;
//   }
// }
