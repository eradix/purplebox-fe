import { createSlice } from "@reduxjs/toolkit";

const customCakeSlice = createSlice({
  name: "custom-cake",
  initialState: {
    allCustomCakes: [],
    showModal: false,
  },
  reducers: {
    setShowModal(state, action) {
      state.showModal = action.payload;
    },
    getAll(state, action) {
      state.allCustomCakes = action.payload;
    },
    reset(state) {
      state.allCustomCakes = [];
    },
  },
});

export const customCakeAction = customCakeSlice.actions;

export default customCakeSlice;
