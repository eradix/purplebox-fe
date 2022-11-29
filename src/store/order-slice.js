import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "order/addtoCart",
  async (payload, thunkAPI) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/orders`,
        payload
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    allOrders: [],
    form: {
      product_id: "",
      quantity: "",
      status: "On Cart",
      message: "",
    },
    showModal: false,
    edit: true,
    success: false,
  },
  reducers: {
    setForm(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    resetForm(state) {
      state.form = {
        product_id: "",
        quantity: "",
        status: "On Cart",
        message: "",
      };
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
    setSuccess(state, action) {
      state.success = action.payload;
    },
  },
  extraReducers: {
    [addToCart.pending]: (state) => {
      console.log("loading");
    },
    [addToCart.fulfilled]: (state, action) => {
      console.log("fullfilled");
      state.success = true;
      state.success = false
    },
    [addToCart.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
