import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    allOrders: [],
    form: {
      custName: "",
      prodImage: "",
      prodName: "",
      qty: "",
      totalPrice: "",
      status: "",
    },
    showModal: false,
    edit: true,
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

export const orderActions = orderSlice.actions;

export default orderSlice;
