import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    form: {
      firstName: "",
      middleName: "",
      lastName: "",
      address: "",
      email: "",
      password: "",
    },
    showModal: false,
    edit: false,
  },
  reducers: {
    setForm(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    getAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    resetAllUser(state) {
      state.allUsers = [];
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
