// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenSignUp: false,
    isOpenLogin: false,
  },
  reducers: {
    openSignUpModal: (state) => {
      state.isOpenSignUp = true;
    },
    openLoginModal: (state) => {
      state.isOpenLogin = true;
    },
    closeSignUpModal: (state) => {
      state.isOpenSignUp = false;
    },
    closeSigninModal: (state) => {
      state.isOpenLogin = false;
    },
  },
});

export const {
  openSignUpModal,
  openLoginModal,
  closeSignUpModal,
  closeSigninModal,
} = modalSlice.actions;

export default modalSlice.reducer;
