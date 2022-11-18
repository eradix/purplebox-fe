import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { allUsers: [] },
  reducers: {
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
