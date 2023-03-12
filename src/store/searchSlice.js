import { createSlice } from "@reduxjs/toolkit";

const initialState = { acc: [], history: [] };
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search(state, action) {
      state.acc = action.payload;
    },
    removeAcc(state, action) {
      state.acc = state.acc.filter((e) => {
        return e._id !== action.payload;
      });
    },
    emptySearch(state) {
      state.acc = [];
    },
    saveSearchHistory(state, action) {
      state.history = action.payload.reverse().map((i) => {
        return { i, ...i.user };
      });
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
