import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    allProducts: [],
    form: {
      image: "",
      name: "",
      description: "",
      price: "",
      address: "",
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
    getAll(state, action) {
      state.allUsers = action.payload;
    },
    reset(state) {
      state.allUsers = [];
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
