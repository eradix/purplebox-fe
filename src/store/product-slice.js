import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "user/getProducts",
  async (thunkAPI) => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products`
      );
      return resp.data;
    } catch (err) {
      return err;
    }
  }
);

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
  extraReducers: {
    [fetchProducts.pending]: (state) => {
      console.log("loading");
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.allProducts = action.payload.data;
    },
    [fetchProducts.rejected]: (state) => {
      console.log("rejected");
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice;
