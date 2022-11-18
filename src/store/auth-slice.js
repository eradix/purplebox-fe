import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: true,
    registerForm: {
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      email: "",
      password: "",
    },
    loginForm: {
      email: "",
      password: "",
    },
  },
  reducers: {
    setRegForm(state, action) {
      state.registerForm[action.payload.name] = action.payload.value;
    },
    setLoginForm(state, action) {
      state.loginForm[action.payload.name] = action.payload.value;
    },
    resetLoginForm(state, action) {
      state.loginForm = {
        email: "",
        password: "",
      };
    },
    resetRegForm(state, action) {
      state.registerForm = {
        firstName: "",
        middleName: "",
        lastName: "",
        address: "",
        email: "",
        password: "",
      };
    },
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
