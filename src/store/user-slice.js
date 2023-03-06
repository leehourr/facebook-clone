import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  visitProfile: false,
  reducers: {
    // resetPass(state, action) {
    //   return action.payload;
    // },
    viewPf(state) {
      let visit = state.visitProfile;
      return (visit = true);
    },
    login(state, action) {
      return action.payload;
    },
    logout(state, action) {
      return {};
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
