import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: { currentModal: false, nectModal: false },
  reducers: {
    openModal(state, action) {
      state.currentModal = true;
      state.nextModal = false;
    },
    closeModal(state, action) {
      state.currentModal = false;
      state.nextModal = true;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
