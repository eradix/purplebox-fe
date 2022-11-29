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
      thunkAPI.dispatch(getUserCart());
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const deleteOnCart = createAsyncThunk(
  "order/deleteOnCart",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/orders/${id}`
      );
      thunkAPI.dispatch(getUserCart());
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

export const getUserCart = createAsyncThunk(
  "order/getUserCart",
  async (thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/orders/cart`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  allOrders: [],
  usersCart: [],
  form: {
    product_id: "",
    quantity: "",
    status: "On Cart",
    message: "",
  },
  showModal: false,
  edit: true,
  success: false,
  totalPrice: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
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
      state.success = true;
      state.success = false;
    },
    [addToCart.rejected]: (state) => {
      console.log("rejected");
    },

    [getUserCart.pending]: (state) => {
      console.log("loading");
    },
    [getUserCart.fulfilled]: (state, action) => {
      state.usersCart = action.payload.user.orders;
      state.totalPrice = action.payload.total
    },
    [getUserCart.rejected]: (state) => {
      console.log("rejected");
    },

    [deleteOnCart.pending]: (state) => {
      console.log("loading");
    },
    [deleteOnCart.fulfilled]: (state, action) => {
      console.log("fullfilled");
    },
    [deleteOnCart.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice;
